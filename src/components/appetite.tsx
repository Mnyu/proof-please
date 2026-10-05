import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import Info from './info';
import { getUserStats } from '@/service/user.service';

const Appetite = async () => {
  const stats = await getUserStats();
  const total = `${String(stats.totalSubmitted)}`;
  const truePercent = `${String(Math.round(stats.truePercentage))}%`;
  const falsePercent = `${String(Math.round(stats.falsePercentage))}%`;
  const misleadingPercent = `${String(Math.round(stats.misleadingPercentage))}%`;
  const partialPercent = `${String(Math.round(stats.partiallyTruePercentage))}%`;
  const unverifyPercent = `${String(Math.round(stats.unverifiablePercentage))}%`;
  const outdatedPercent = `${String(Math.round(stats.outdatedPercentage))}%`;
  const satirePercent = `${String(Math.round(stats.satirePercentage))}%`;
  return (
    <section className='p-1'>
      <Card className='w-full py-5'>
        <CardHeader>
          <CardTitle className={`xl:text-xl`}>Your Profile</CardTitle>
          <CardDescription className=''>A breakdown of your submitted proof please runs</CardDescription>
        </CardHeader>
        <CardContent className='grid grid-cols-3 gap-4'>
          <Info label='Total Runs' value={total} className='col-span-3' />
          <Info label='True' value={truePercent} />
          <Info label='False' value={falsePercent} />
          <Info label='Misleading' value={misleadingPercent} />
          <Info label='Partially True ' value={partialPercent} />
          <Info label='Unverifiable' value={unverifyPercent} />
          <Info label='Outdated' value={outdatedPercent} />
          <Info label='Satire' value={satirePercent} />
        </CardContent>
      </Card>
    </section>
  );
};
export default Appetite;
