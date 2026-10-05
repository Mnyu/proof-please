import { Check } from 'lucide-react';
import { cn } from '@/lib/utils';

interface VerdictTrueIconProps {
  className?: string;
}

const VerdictTrueIcon = ({ className }: VerdictTrueIconProps) => {
  return (
    <div className={cn('flex size-10 shrink-0 items-center justify-center rounded-full bg-emerald-500', className)}>
      <Check className='size-1/2 text-white' strokeWidth={3} />
    </div>
  );
};
export default VerdictTrueIcon;
