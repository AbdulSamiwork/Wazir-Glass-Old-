// wazir-glass-backend/controllers/billController.js
const Bill = require("../models/billModel");
const Quotation = require("../models/quotationModel"); // *** IMPORT QUOTATION MODEL ***

// @desc    Create a new bill
// @route   POST /api/bills
// @access  Private (Admin)
const createBill = async (req, res) => {
  try {
    // Manually calculate remaining amount and status for new bills
    const { total, amountReceived = 0, quotationId } = req.body; // Get quotationId
    const remainingAmount = total - amountReceived;
    let status = "pending";

    if (amountReceived > 0 && amountReceived < total) {
      status = "advanced";
    } else if (amountReceived >= total) {
      status = "paid";
    }

    const bill = new Bill({
      ...req.body,
      amountReceived,
      remainingAmount,
      status,
      convertedFromQuotation: quotationId || undefined, // *** ADD THIS ***
    });

    const createdBill = await bill.save();

    // *** ADD THIS LOGIC ***
    // If a quotationId was provided, update the quotation's status
    if (quotationId) {
      const quotation = await Quotation.findById(quotationId);
      if (quotation) {
        quotation.status = "converted";
        await quotation.save();
      }
    }

    res.status(201).json(createdBill);
  } catch (error) {
    res
      .status(400)
      .json({ message: "Error creating bill", error: error.message });
  }
};

// @desc    Get all bills (WITH SEARCH & FILTER)
// @route   GET /api/bills
// @access  Private (Admin)
// @desc    Get all bills (WITH SEARCH & FILTER)
// @route   GET /api/bills
// @access  Private (Admin)
const getBills = async (req, res) => {
  try {
    const { search, status } = req.query;
    let query = {};

    if (search) {
      query.$or = [
        { customerName: { $regex: search, $options: "i" } },
        { customerPhone: { $regex: search, $options: "i" } },
        { billNumber: { $regex: search, $options: "i" } },
      ];
    }

    if (status && status !== "all") {
      query.status = status;
    }

    // High performance lean query sorted by newest first
    const bills = await Bill.find(query).sort({ createdAt: -1 }).lean();

    res.json(bills);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Error fetching bills" });
  }
};

// @desc    Get a single bill by ID
// @route   GET /api/bills/:id
// @access  Private (Admin)
const getBillById = async (req, res) => {
  try {
    const bill = await Bill.findById(req.params.id).lean();
    if (bill) {
      res.json(bill);
    } else {
      res.status(404).json({ message: "Bill not found" });
    }
  } catch (error) {
    res.status(500).json({ message: "Error fetching bill" });
  }
};

// @desc    Update a bill (e.g., status, payment)
// @route   PUT /api/bills/:id
// @access  Private (Admin)
const updateBill = async (req, res) => {
  try {
    const bill = await Bill.findById(req.params.id);

    if (bill) {
      const updatableFields = [
        "billNumber",
        "date",
        "customerName",
        "customerPhone",
        "customerAddress",
        "items",
        "subtotal",
        "discount",
        "discountAmount",
        "taxRate",
        "taxAmount",
        "total",
        "notes",
        "status",
        "amountReceived",
      ];

      let hasChanges = false;

      updatableFields.forEach((field) => {
        if (req.body[field] !== undefined) {
          bill[field] = req.body[field];
          hasChanges = true;
        }
      });

      if (hasChanges) {
        const updatedBill = await bill.save();
        res.json(updatedBill);
      } else {
        res.json(bill);
      }
    } else {
      res.status(404).json({ message: "Bill not found" });
    }
  } catch (error) {
    res
      .status(400)
      .json({ message: "Error updating bill", error: error.message });
  }
};

// @desc    Delete a bill
// @route   DELETE /api/bills/:id
// @access  Private (Admin)
const deleteBill = async (req, res) => {
  try {
    const bill = await Bill.findById(req.params.id);
    if (bill) {
      await bill.deleteOne();
      res.json({ message: "Bill removed" });
    } else {
      res.status(404).json({ message: "Bill not found" });
    }
  } catch (error) {
    res.status(500).json({ message: "Error deleting bill" });
  }
};

module.exports = {
  createBill,
  getBills,
  getBillById,
  updateBill,
  deleteBill,
};
