interface InfoItemProps {
  label: string;
  value: string;
  className?: string;
}

const Info = ({ label, value, className }: InfoItemProps) => {
  return (
    <div className={`flex items-center gap-2 ${className}`}>
      <div className='text-sm text-muted-foreground'>{label} :</div>
      <div className='text-sm font-normal text-foreground'>{value}</div>
    </div>
  );
};
export default Info;
