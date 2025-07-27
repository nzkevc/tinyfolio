import { useEffect, useState } from "react";
import Cookies from "js-cookie";
import { useNavigate } from "react-router";

import Arrow from "@/assets/svg/Arrow";
import Plus from "@/assets/svg/Plus";
import CentredLayout from "@/components/CentredLayout";
import PageHeader from "@/components/PageHeader";
import PageSubHeader from "@/components/PageSubHeader";
import { Button } from "@/components/ui/button";
import { getJwtSubject } from "@/lib/utils";
import type { Project } from "@/models/Project";
import { getProjectsByOwner } from "@/services/projects";

export default function DashboardPage() {
  const [projects, setProjects] = useState<Project[]>([]);
  const [error, setError] = useState("");

  const navigate = useNavigate();

  const cookies = Cookies.get();
  if (!cookies.ACCESS_TOKEN) {
    navigate("/login");
  }

  const ownerId = getJwtSubject(cookies.ACCESS_TOKEN) ?? "";

  useEffect(() => {
    async function fetchProjects() {
      try {
        const data = await getProjectsByOwner(ownerId);
        setProjects(data);
      } catch {
        setError("Failed to load projects.");
      }
    }
    fetchProjects();
  }, []);

  return (
    <CentredLayout>
      <PageHeader title="Dashboard" />
      <div className="flex flex-col items-center gap-4 lg:items-start">
        <PageSubHeader title="Manage your tinyfolio" />
        <Button className="font-semibold">
          Go to your tinyfolio <Arrow />
        </Button>
      </div>

      <div className="flex w-full flex-col items-center gap-4 lg:items-start">
        <PageSubHeader title="Your Projects" />
        <Button className="font-semibold" onClick={() => navigate("/create-project")}>
          Create a new project <Plus />
        </Button>
        {error && <p className="text-red-500">{error}</p>}
        <ul className="mt-4 w-full max-w-2xl">
          {projects.map((project) => (
            <li key={project.id} className="mb-4 border-b pb-2">
              <h3 className="text-lg font-bold">{project.name}</h3>
              <p>{project.description}</p>
              <p className="text-sm text-gray-500">
                Created: {new Date(project.createdAt).toLocaleDateString()}
              </p>
            </li>
          ))}
        </ul>
      </div>
    </CentredLayout>
  );
}
