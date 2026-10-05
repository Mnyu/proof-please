import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import Info from './info';
const Appetite = () => {
  return (
    <section className='p-1'>
      <Card className='w-full py-5'>
        <CardHeader>
          <CardTitle className={`xl:text-xl`}>Your Profile</CardTitle>
          <CardDescription className=''>A breakdown of your submitted reels</CardDescription>
        </CardHeader>
        <CardContent className='grid grid-cols-3 gap-4'>
          <Info label='Submitted reels' value='147' className='col-span-3' />
          <Info label='True' value='31%' />
          <Info label='False' value='27%' />
          <Info label='Misleading' value='19%' />
          <Info label='Partially True ' value='14%' />
          <Info label='Unverifiable' value='6%' />
          <Info label='Outdated' value='2%' />
          <Info label='Satire' value='1%' />
        </CardContent>
      </Card>
    </section>
  );
};
export default Appetite;
