import { Eye } from 'lucide-react';

const VerdictMisleadingIcon = () => {
  return (
    <div className='flex items-center justify-center h-20 w-20 shrink-0 rounded-full bg-orange-500/80'>
      <Eye className='h-10 w-10 text-white' strokeWidth={2.5} />
    </div>
  );
};

export default VerdictMisleadingIcon;
