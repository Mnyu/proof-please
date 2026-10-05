import { Card, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import VerdictTrueIcon from './verdictTrueIcon';
import { ConfidenceRing } from './confidenceRing';
import { FactCheckJobDTO } from '@/types/dto';

interface VerdictKPIsProps {
  proof: FactCheckJobDTO;
}

const VerdictKPIs = ({ proof }: VerdictKPIsProps) => {
  const confidenceValue = Math.round(proof.verifierResponse.confidence * 100);
  return (
    <section className='grid grid-cols-2 md:grid-cols-4 gap-4 p-1'>
      <Card className='w-full bg-emerald-50/70'>
        <CardHeader>
          <CardDescription className='font-semibold pb-2'>Verdict</CardDescription>
          <CardTitle className={`text-xl xl:text-2xl tracking-tight text-emerald-950`}>
            <div className='flex gap-4 items-center'>
              <VerdictTrueIcon />
              {proof.verdict}
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
            <ConfidenceRing value={confidenceValue} size={70} strokeWidth={6} />
          </CardTitle>
          {/* <CardDescription>20.1% from last month</CardDescription> */}
        </CardHeader>
      </Card>
      <Card className='w-full'>
        <CardHeader>
          <CardDescription className='font-semibold pb-2'>Claimed Facts</CardDescription>
          <CardTitle className='text-xl xl:text-2xl'>
            {Object.keys(proof.verifierResponse.factResults).length}
          </CardTitle>
          {/* <CardDescription>20.1% from last month</CardDescription> */}
        </CardHeader>
      </Card>
      <Card className='w-full'>
        <CardHeader>
          <CardDescription className='font-semibold pb-2'>Checked on</CardDescription>
          <CardTitle className='text-xl xl:text-2xl'>{proof.updatedAt}</CardTitle>
          {/* <CardDescription>20.1% from last month</CardDescription> */}
        </CardHeader>
      </Card>
      <Card className='w-full col-span-2 md:col-span-4'>
        <CardHeader>
          <CardDescription className='font-semibold pb-2'>Rationale</CardDescription>
          <CardTitle className=''>
            <ul className='space-y-1.5'>
              {proof.verifierResponse.rationale.map((point, index) => (
                <li key={index} className='flex items-start gap-2 leading-[1.2] text-muted-foreground'>
                  <span className='mt-1.5 h-2 w-2 shrink-0 rounded-full bg-primary' aria-hidden='true' />
                  <p className='text-sm'>{point}</p>
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
