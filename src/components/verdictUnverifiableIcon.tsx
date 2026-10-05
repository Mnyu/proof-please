import { cn } from 'cn';
import { HelpCircle } from 'lucide-react';

interface VerdictUnverifiableIconProps {
  className?: string;
}

const VerdictUnverifiableIcon = ({ className }: VerdictUnverifiableIconProps) => {
  return (
    <div className={cn('flex size-10 shrink-0 items-center justify-center rounded-full bg-slate-500/80', className)}>
      <HelpCircle className='size-1/2 text-white' strokeWidth={3} />
    </div>
  );
};

export default VerdictUnverifiableIcon;
