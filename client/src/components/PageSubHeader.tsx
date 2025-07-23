import { cn } from "@/lib/utils";

type PageSubHeaderProps = {
  title: string;
  className?: string;
};

export default function PageSubHeader({ title, className }: PageSubHeaderProps) {
  return (
    <div>
      <h2 className={cn("text-left text-xl font-semibold", className)}>{title}</h2>
    </div>
  );
}
