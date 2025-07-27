import { useState } from "react";
import { useNavigate } from "react-router";

import CentredLayout from "@/components/CentredLayout";
import PageHeader from "@/components/PageHeader";
import PageSubHeader from "@/components/PageSubHeader";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { login } from "@/services/account";

export default function LoginPage() {
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });

  const [error, setError] = useState("");
  const navigate = useNavigate();

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");

    try {
      await login(formData);
      navigate("/dashboard"); // Redirect to dashboard after successful login
    } catch {
      setError("Failed to log in. Please check your credentials and try again.");
    }
  };

  return (
    <CentredLayout>
      <PageHeader title="Log In" className="text-center" />
      <PageSubHeader
        title="Please enter your details below to log in."
        className="text-center text-lg"
      />
      <div className="flex w-full flex-col items-center justify-center">
        <form onSubmit={handleSubmit} className="flex w-full max-w-md flex-col gap-4">
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
            Log In
          </Button>
          {error && <p className="text-center text-red-500">{error}</p>}
        </form>
      </div>
      <div className="flex flex-col items-center gap-4">
        <span className="text-gray-300">Haven&apos;t registered yet?</span>
        <Button onClick={() => navigate("/register")} className="px-6 py-2 font-semibold">
          Register
        </Button>
      </div>

      {/* <Button onClick={() => refreshToken()} className="mt-4">
        Refresh token test
      </Button> */}
    </CentredLayout>
  );
}
