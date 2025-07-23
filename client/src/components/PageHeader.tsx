export default function PageHeader({ title }: { title: string }) {
  return (
    <header>
      <h1 className="text-center text-3xl font-bold lg:text-left">{title}</h1>
    </header>
  );
}
