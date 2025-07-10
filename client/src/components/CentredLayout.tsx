import NestedDiv from "@/components/NestedDiv";

export default function CentredLayout({ children }: { children: React.ReactNode }) {
  return (
    <NestedDiv
      outer="flex w-full items-center justify-center py-20"
      inner="flex w-[80%] max-w-[1100px] flex-col gap-24"
    >
      {children}
    </NestedDiv>
  );
}
