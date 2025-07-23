import { useNavigate } from "react-router";

import Arrow from "@/assets/svg/Arrow";
import CentredLayout from "@/components/CentredLayout";
import PageHeader from "@/components/PageHeader";
import TextImageDuo from "@/components/TextImageDuo";
import { Button } from "@/components/ui/button";

export default function LandingPage() {
  const navigate = useNavigate();

  return (
    <CentredLayout>
      <PageHeader title="Welcome to tinyfolio!" />
      <TextImageDuo
        image={{ src: "https://placehold.co/600x100", alt: "Placeholder image" }}
        imgFirst
      >
        <p>
          tinyfolio is a tool for creating simple, shareable developer portfolios and allows you to
          showcase your work easily while networking.
        </p>
        <Button variant="default" className="w-fit" onClick={() => navigate("/dashboard")}>
          Get Started <Arrow className="font-light" />
        </Button>
      </TextImageDuo>
    </CentredLayout>
  );
}
