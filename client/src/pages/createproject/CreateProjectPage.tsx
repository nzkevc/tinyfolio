import { useState } from "react";
import Cookies from "js-cookie";

import CentredLayout from "@/components/CentredLayout";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { getJwtSubject } from "@/lib/utils";
import { createProject } from "@/services/projects";

export default function CreateProjectPage() {
  const [formData, setFormData] = useState({
    name: "",
    description: "",
  });
  const [success, setSuccess] = useState("");
  const [error, setError] = useState("");

  const cookies = Cookies.get();
  const ownerId = getJwtSubject(cookies.ACCESS_TOKEN) ?? "";

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    try {
      await createProject({ ...formData }, ownerId);
      setSuccess("Creation successful! Navigate back to your dashboard to see the project.");
    } catch {
      setError("Failed to create project or add to folio. Please try again.");
    }
  };

  return (
    <CentredLayout>
      <h1 className="mb-6 text-2xl font-bold">Create Project</h1>
      <form onSubmit={handleSubmit} className="flex w-full max-w-md flex-col gap-4">
        <Input
          type="text"
          name="name"
          placeholder="Project Name"
          value={formData.name}
          onChange={handleChange}
          className="w-full"
          required
        />
        <textarea
          name="description"
          placeholder="Project Description"
          value={formData.description}
          onChange={handleChange}
          className="w-full rounded-md border px-3 py-2"
          rows={4}
          required
        />
        <Button type="submit" className="px-6 py-2 font-semibold">
          Create Project
        </Button>
        {error && <p className="text-center text-red-500">{error}</p>}
        {success && <p className="text-center text-green-500">{success}</p>}
      </form>
    </CentredLayout>
  );
}
