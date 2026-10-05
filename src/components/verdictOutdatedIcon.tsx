import { cn } from 'cn';
import { Clock } from 'lucide-react';

interface VerdictOutdatedIconProps {
  className?: string;
}

const VerdictOutdatedIcon = ({ className }: VerdictOutdatedIconProps) => {
  return (
    <div className={cn('flex size-10 shrink-0 items-center justify-center rounded-full bg-blue-500/80', className)}>
      <Clock className='size-1/2 text-white' strokeWidth={3} />
    </div>
  );
};

export default VerdictOutdatedIcon;
