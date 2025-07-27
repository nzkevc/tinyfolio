import CentredLayout from "@/components/CentredLayout";
import PageHeader from "@/components/PageHeader";
import PageSubHeader from "@/components/PageSubHeader";
import { Button } from "@/components/ui/button";
import { refreshToken } from "@/services/account";

export default function LoginPage() {
  return (
    <CentredLayout>
      <PageHeader title="Log In" />
      <PageSubHeader
        title="Please enter your details below to log in."
        className="text-center text-lg"
      />
      <div className="flex flex-col items-center gap-4">
        <p>insert oauth button here</p>
      </div>
      <div className="mt-8 flex flex-col items-center">
        <span className="mb-2 text-gray-500">Haven&apos;t registered yet?</span>
        <a
          href="/register"
          className="rounded-md bg-blue-600 px-6 py-2 font-semibold text-white shadow transition hover:bg-blue-700"
        >
          Register
        </a>
      </div>

      <Button onClick={() => refreshToken()} className="mt-4">
        Refresh token test
      </Button>
    </CentredLayout>
  );
}
