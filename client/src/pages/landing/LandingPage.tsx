import { useNavigate } from "react-router";

import Arrow from "@/assets/svg/Arrow";
import MainIcon from "@/assets/svg/MainIcon";
import CentredLayout from "@/components/CentredLayout";
import PageHeader from "@/components/PageHeader";
import { Button } from "@/components/ui/button";
import { useTheme } from "@/lib/utils";

export default function LandingPage() {
  const navigate = useNavigate();

  const { theme } = useTheme();

  return (
    <CentredLayout>
      <PageHeader title="Welcome to tinyfolio!" />
      <div className="flex flex-col items-center justify-center gap-x-48 gap-y-8 lg:flex-row">
        <div className="order-2 flex w-full flex-1 flex-col gap-y-6 lg:order-2">
          <p>
            tinyfolio is a tool for creating simple, shareable developer portfolios and allows you
            to showcase your work easily while networking.
          </p>
          <Button variant="default" className="w-fit" onClick={() => navigate("/dashboard")}>
            Get Started <Arrow className="font-light" />
          </Button>
        </div>
        <div className="order-1 flex w-full flex-1 items-center justify-center lg:order-1">
          <MainIcon fill={theme === "dark" ? "white" : "black"} />
        </div>
      </div>
    </CentredLayout>
  );
}
