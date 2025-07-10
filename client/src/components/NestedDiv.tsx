interface NestedDivProps {
  children?: React.ReactNode;
  outer?: string;
  inner?: string;
}

export default function NestedDiv({ children, outer, inner }: NestedDivProps) {
  return (
    <div className={outer}>
      <div className={inner}>{children}</div>
    </div>
  );
}
