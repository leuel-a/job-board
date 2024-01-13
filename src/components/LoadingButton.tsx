import { Button } from '@/components/ui/button';
import { Loader2 } from 'lucide-react';

interface LoadingButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  loading: boolean;
}

export default function LoadingButton({
  children,
  loading,
  ...props
}: LoadingButtonProps) {
  return (
    <Button {...props} type="submit" disabled={props.disabled || loading}>
      <span className="flex items-start justify-center gap-1">
        {loading && <Loader2 size={16} className="animate-spin" />}
        {children}
      </span>
    </Button>
  );
}
