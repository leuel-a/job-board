interface BadgeProps {
  children: React.ReactNode;
}

export default function Badge({ children }: BadgeProps) {
  return (
    <span className="rounded border bg-muted px-2 py-0.5 text-muted-foreground text-sm font-medium">
      {children}
    </span>
  );
}
