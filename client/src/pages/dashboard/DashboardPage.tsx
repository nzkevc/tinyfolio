import Arrow from "@/assets/svg/Arrow";
import CentredLayout from "@/components/CentredLayout";
import PageHeader from "@/components/PageHeader";
import PageSubHeader from "@/components/PageSubHeader";
import { Button } from "@/components/ui/button";

export default function DashboardPage() {
  // TODO: redirect if not authenticated

  /* TODO: what should be on the dashboard page?
   * - Link to edit tinyfolio --> how do we even do this?
   * - Create a new project (can also do when editing tinyfolio?)
   * - Notifications or updates
   * - Recent activity or changes
   * - Settings access
   * - Analytics or stats (if applicable)
   * - Help or support links
   */

  return (
    <CentredLayout>
      <PageHeader title="Dashboard" />
      <div className="flex flex-col items-center gap-4 lg:items-start">
        <PageSubHeader title="Manage your tinyfolio" />
        <p>Insert link to tinyfolio here?</p>
        <Button className="font-semibold">
          Go to your tinyfolio <Arrow />
        </Button>
      </div>

      <div className="flex flex-col items-center gap-4 lg:items-start">
        <PageSubHeader title="Your Projects" />
        <p>Insert link to create a new project here?</p>
      </div>
    </CentredLayout>
  );
}
