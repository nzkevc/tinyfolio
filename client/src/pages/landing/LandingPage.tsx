import { useNavigate } from "react-router";

import Arrow from "@/assets/svg/Arrow";
import CentredLayout from "@/components/CentredLayout";
import TextImageDuo from "@/components/TextImageDuo";
import { Button } from "@/components/ui/button";

export default function LandingPage() {
  const navigate = useNavigate();

  return (
    <CentredLayout>
      <h1 className="text-2xl font-bold">Landing Page</h1>
      <TextImageDuo>
        <p>
          TinyFolio is a tool for creating simple, shareable developer portfolios and allows you to
          showcase your work easily.
        </p>
        <Button variant="default" className="w-fit" onClick={() => navigate("/dashboard")}>
          Get Started <Arrow className="font-light" />
        </Button>
      </TextImageDuo>
    </CentredLayout>
  );
}
