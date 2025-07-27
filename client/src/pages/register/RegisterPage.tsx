import { useState } from "react";
import { useNavigate } from "react-router";

import CentredLayout from "@/components/CentredLayout";
import PageHeader from "@/components/PageHeader";
import PageSubHeader from "@/components/PageSubHeader";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { register } from "@/services/account";

export default function RegisterPage() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
  });

  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  const navigate = useNavigate();

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    setSuccess("");

    try {
      await register(formData);
      setSuccess("Registration successful! You can now log in.");
    } catch {
      setError("Failed to register. Please try again.");
    }
  };

  return (
    <CentredLayout>
      <PageHeader title="Register" className="text-center" />
      <PageSubHeader title="Create your account" className="text-center text-lg" />
      <div className="flex w-full flex-col items-center justify-center">
        <form onSubmit={handleSubmit} className="flex w-full max-w-md flex-col gap-4">
          <Input
            type="text"
            name="name"
            placeholder="Name"
            value={formData.name}
            onChange={handleChange}
            className="w-full"
            required
          />
          <Input
            type="email"
            name="email"
            placeholder="Email"
            value={formData.email}
            onChange={handleChange}
            className="w-full"
            required
          />
          <Input
            type="password"
            name="password"
            placeholder="Password"
            value={formData.password}
            onChange={handleChange}
            className="w-full"
            required
          />
          <Button type="submit" className="px-6 py-2 font-semibold">
            Register
          </Button>
          {error && <p className="text-center text-red-500">{error}</p>}
          {success && <p className="text-center text-green-500">{success}</p>}
        </form>
      </div>
      <div className="mt-8 flex flex-col items-center">
        <span className="mb-2 text-gray-300">Already have an account?</span>
        <Button onClick={() => navigate("/login")} className="rounded-md px-6 py-2 font-semibold">
          Log In
        </Button>
      </div>
    </CentredLayout>
  );
}
