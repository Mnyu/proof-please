import { HelpCircle } from 'lucide-react';

const VerdictUnverifiableIcon = () => {
  return (
    <div className='flex items-center justify-center h-20 w-20 shrink-0 rounded-full bg-slate-500/80'>
      <HelpCircle className='h-10 w-10 text-white' strokeWidth={2.5} />
    </div>
  );
};

export default VerdictUnverifiableIcon;
