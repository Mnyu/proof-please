import { Card, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import VerdictTrueIcon from './verdictTrueIcon';
import { ConfidenceRing } from './confidenceRing';

const takeaways = [
  `The claim that Dainik Jagran published a front-page headline on September 11, 2025, claiming 'Gyanendra' (Jen Ji) demanded a Hindu Rashtra is supported by multiple sources, including NewsLaundry and Bhadas4Media, which quote the specific headline: 'Army handles situation in Nepal, Gen Z wants a Hindu rashtra' and mention Gyanendra's involvement.`,
  `The claim that there is no online article or tweet from Nepali citizens demanding a Hindu Rashtra, and only BJP IT cell supporters are making this claim, is contradicted by evidence. Sources indicate that while Indian hardliners amplified the narrative, there were genuine pro-monarchy and Hindu Rashtra rallies in Nepal (e.g., by RPP and NJP parties) with thousands of participants, and social media posts from Nepali users existed, even if some were misattributed or exaggerated.`,
  `The claim that Dainik Jagran published a front-page headline two years prior (August 2023) claiming India conducted a surgical strike on Pakistan, which was clarified by the Indian Army as fake news, is fully supported by multiple fact-checks (Alt News, Newslaundry, National Herald) and official denials from the Indian Army and PIB.`,
];

const VerdictKPIs = () => {
  return (
    <section className='grid grid-cols-2 md:grid-cols-4 gap-4 p-1'>
      <Card className='w-full bg-emerald-50/70'>
        <CardHeader>
          <CardDescription className='font-semibold pb-2'>Verdict</CardDescription>
          <CardTitle className={`text-2xl xl:text-3xl tracking-tight text-emerald-950`}>
            <div className='flex gap-4 items-center'>
              <VerdictTrueIcon />
              True
            </div>
          </CardTitle>
          <CardDescription className='leading-relaxed text-emerald-950/70'>
            Well supported by credible, recent sources
          </CardDescription>
        </CardHeader>
      </Card>
      <Card className='w-full bg-emerald-50/70'>
        <CardHeader>
          <CardDescription className='font-semibold pb-2'>Confidence</CardDescription>
          <CardTitle className='flex justify-center items-center'>
            <ConfidenceRing value={76} size={70} strokeWidth={6} />
          </CardTitle>
          {/* <CardDescription>20.1% from last month</CardDescription> */}
        </CardHeader>
      </Card>
      <Card className='w-full'>
        <CardHeader>
          <CardDescription className='font-semibold pb-2'>Claimed Facts</CardDescription>
          <CardTitle className='text-2xl xl:text-3xl'>3</CardTitle>
          {/* <CardDescription>20.1% from last month</CardDescription> */}
        </CardHeader>
      </Card>
      <Card className='w-full'>
        <CardHeader>
          <CardDescription className='font-semibold pb-2'>Checked on</CardDescription>
          <CardTitle className='text-2xl xl:text-3xl'>Oct 3, 2026</CardTitle>
          {/* <CardDescription>20.1% from last month</CardDescription> */}
        </CardHeader>
      </Card>
      <Card className='w-full col-span-2 md:col-span-4'>
        <CardHeader>
          <CardDescription className='font-semibold pb-2'>Rationale</CardDescription>
          <CardTitle className=''>
            <ul className='space-y-1.5'>
              {takeaways.map((takeaway, index) => (
                <li key={index} className='flex items-start gap-2 leading-[1.2] text-muted-foreground'>
                  <span className='mt-1.5 h-2 w-2 shrink-0 rounded-full bg-primary' aria-hidden='true' />
                  <p className='text-sm'>{takeaway}</p>
                </li>
              ))}
            </ul>
          </CardTitle>
        </CardHeader>
      </Card>
    </section>
  );
};
export default VerdictKPIs;
