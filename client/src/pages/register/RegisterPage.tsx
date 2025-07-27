import CentredLayout from "@/components/CentredLayout";
import PageHeader from "@/components/PageHeader";
import PageSubHeader from "@/components/PageSubHeader";

export default function RegisterPage() {
  return (
    <CentredLayout>
      <PageHeader title="Register" />
      <PageSubHeader title="Create your account" className="text-center text-lg" />
      <div className="flex flex-col items-center gap-4">
        <p>insert registration form here</p>
      </div>
      <div className="mt-8 flex flex-col items-center">
        <span className="mb-2 text-gray-500">Already have an account?</span>
        <a
          href="/login"
          className="rounded-md bg-blue-600 px-6 py-2 font-semibold text-white shadow transition hover:bg-blue-700"
        >
          Log In
        </a>
      </div>
    </CentredLayout>
  );
}
