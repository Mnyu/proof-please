import { cn } from 'cn';
import { X } from 'lucide-react';

interface VerdictFalseIconProps {
  className?: string;
}

const VerdictFalseIcon = ({ className }: VerdictFalseIconProps) => {
  return (
    <div className={cn('flex size-10 shrink-0 items-center justify-center rounded-full bg-red-500/80', className)}>
      <X className='size-1/2 text-white' strokeWidth={3} />
    </div>
  );
};

export default VerdictFalseIcon;
