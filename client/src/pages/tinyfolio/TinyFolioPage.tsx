import { useEffect, useState } from "react";
import { useParams } from "react-router";

import CentredLayout from "@/components/CentredLayout";
import type { Folio } from "@/models/Folio";
import { getFolioByOwnerId } from "@/services/folio";

export default function TinyFolioPage() {
  const [folio, setFolio] = useState<Folio | null>(null);
  const [error, setError] = useState("");

  const { id } = useParams();

  useEffect(() => {
    async function fetchFolio() {
      try {
        const fetchedFolio = await getFolioByOwnerId(id ?? "");
        setFolio(fetchedFolio);
      } catch {
        setError("Failed to load folio.");
      }
    }

    fetchFolio();
  }, [id]);

  if (error) {
    return (
      <CentredLayout>
        <p className="text-red-500">{error}</p>
      </CentredLayout>
    );
  }

  if (!folio) {
    return (
      <CentredLayout>
        <p>Loading...</p>
      </CentredLayout>
    );
  }

  return (
    <CentredLayout>
      <div className="flex flex-col items-center justify-center gap-8">
        <h1 className="text-3xl font-bold">Folio Details</h1>
        <p className="text-lg">Description: {folio.description}</p>

        <h2 className="text-2xl font-semibold">Projects</h2>
        <ul className="list-disc pl-5">
          {folio.projects.map((project) => (
            <li key={project.id} className="mb-4">
              <h3 className="text-xl font-bold">{project.name}</h3>
              <p>{project.description}</p>
              {project.collaborators && project.collaborators.length > 0 && (
                <div>
                  <h4 className="mt-2 font-semibold">Collaborators:</h4>
                  <ul className="list-disc pl-5">
                    {project.collaborators.map((collaborator) => (
                      <li key={collaborator.id}>{collaborator.name}</li>
                    ))}
                  </ul>
                </div>
              )}
            </li>
          ))}
        </ul>
      </div>
    </CentredLayout>
  );
}
