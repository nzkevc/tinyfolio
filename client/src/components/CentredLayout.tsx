import NestedDiv from "@/components/NestedDiv";
import { cn } from "@/lib/utils";

import TopBar from "./TopBar";

type CentredLayoutProps = {
  children: React.ReactNode;
  className?: string;
};

export default function CentredLayout({ children, className }: CentredLayoutProps) {
  return (
    <>
      <TopBar />
      <NestedDiv
        outer="flex w-full items-center justify-center py-20"
        inner={cn("flex w-[80%] max-w-[1100px] flex-col gap-16", className)}
      >
        {children}
      </NestedDiv>
    </>
  );
}
