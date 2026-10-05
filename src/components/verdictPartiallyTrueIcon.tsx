import { CircleAlert } from 'lucide-react';

const VerdictPartiallyTrueIcon = () => {
  return (
    <div className='flex items-center justify-center h-20 w-20 shrink-0 rounded-full bg-amber-500/80'>
      <CircleAlert className='h-10 w-10 text-white' strokeWidth={2.5} />
    </div>
  );
};

export default VerdictPartiallyTrueIcon;
