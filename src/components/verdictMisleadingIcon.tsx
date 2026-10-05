import { cn } from 'cn';
import { Eye } from 'lucide-react';

interface VerdictMisleadingIconProps {
  className?: string;
}

const VerdictMisleadingIcon = ({ className }: VerdictMisleadingIconProps) => {
  return (
    <div className={cn('flex size-10 shrink-0 items-center justify-center rounded-full bg-orange-500/80', className)}>
      <Eye className='size-1/2 text-white' strokeWidth={3} />
    </div>
  );
};

export default VerdictMisleadingIcon;
