import { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "../ui/card";
import { Input } from "../ui/input";
import { Label } from "../ui/label";
import { Button } from "../ui/button";
import { Lock, User } from "lucide-react";
import { toast } from "sonner";
import api from "@/api"; // Import your custom 'api' module
import { Logo } from "../Logo";

interface AdminLoginProps {
  onLogin: () => void;
}

export function AdminLogin({ onLogin }: AdminLoginProps) {
  const [credentials, setCredentials] = useState({
    username: "",
    password: "",
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    try {
      // This path is correct because your backend server.js file uses '/api/auth'
      const response = await api.post("/api/auth/login", {
        username: credentials.username,
        password: credentials.password,
      });

      if (response.data && response.data.token) {
        // Save the token to localStorage
        localStorage.setItem("adminToken", response.data.token);
        toast.success("Login successful!");
        onLogin(); // This updates the App.tsx state
      } else {
        toast.error("Login failed. Please try again.");
      }
    } catch (error) {
      console.error(error);
      toast.error("Invalid credentials!");
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-600 to-blue-800 flex items-center justify-center p-4">
      <Card className="w-full max-w-md shadow-2xl border-white/10 backdrop-blur-md">
        <CardHeader className="text-center pb-2">
          <div className="flex justify-center mb-4">
            <Logo size="lg" variant="full" />
          </div>
          <CardTitle className="text-xl font-bold text-gray-800">Admin Portal</CardTitle>
          <CardDescription>Secure Management System</CardDescription>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <Label htmlFor="username">Username</Label>
              <div className="relative mt-1">
                <User className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
                <Input
                  id="username"
                  type="text"
                  value={credentials.username}
                  onChange={(e) => setCredentials({ ...credentials, username: e.target.value })}
                  className="pl-10"
                  placeholder="Enter username"
                  required
                />
              </div>
            </div>

            <div>
              <Label htmlFor="password">Password</Label>
              <div className="relative mt-1">
                <Lock className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
                <Input
                  id="password"
                  type="password"
                  value={credentials.password}
                  onChange={(e) => setCredentials({ ...credentials, password: e.target.value })}
                  className="pl-10"
                  placeholder="Enter password"
                  required
                />
              </div>
            </div>

            <Button type="submit" className="w-full bg-blue-600 hover:bg-blue-700">
              Login
            </Button>
          </form>
        </CardContent>
      </Card>
    </div>
  );
}
