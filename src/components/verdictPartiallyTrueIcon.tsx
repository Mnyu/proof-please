import { cn } from 'cn';
import { CircleAlert } from 'lucide-react';

interface VerdictPartiallyTrueIconProps {
  className?: string;
}

const VerdictPartiallyTrueIcon = ({ className }: VerdictPartiallyTrueIconProps) => {
  return (
    <div className={cn('flex size-10 shrink-0 items-center justify-center rounded-full bg-amber-500/80', className)}>
      <CircleAlert className='size-1/2 text-white' strokeWidth={3} />
    </div>
  );
};

export default VerdictPartiallyTrueIcon;
