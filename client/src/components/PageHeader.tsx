import { cn } from "@/lib/utils";

type PageHeaderProps = {
  title: string;
  className?: string;
};

export default function PageHeader({ title, className }: PageHeaderProps) {
  return (
    <header>
      <h1 className={cn("text-left text-3xl font-bold", className)}>{title}</h1>
    </header>
  );
}
