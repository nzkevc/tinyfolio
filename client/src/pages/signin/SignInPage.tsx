import CentredLayout from "@/components/CentredLayout";
import PageHeader from "@/components/PageHeader";
import PageSubHeader from "@/components/PageSubHeader";

export default function SignInPage() {
  return (
    <CentredLayout>
      <PageHeader title="Sign In" />
      <PageSubHeader
        title="Please choose one of the options below to sign in."
        className="text-center text-lg"
      />
      <div className="flex flex-col items-center gap-4">
        <p>insert oauth button here</p>
      </div>
    </CentredLayout>
  );
}
