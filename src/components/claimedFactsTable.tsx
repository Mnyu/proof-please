import { Card, CardContent, CardDescription, CardHeader, CardTitle } from './ui/card';
import { DataTable } from './table/data-table';
import { claimedFactColumns } from './claimedFactsColumns';
import { ClaimedFactDTO } from '@/types/dto';

interface ClaimedFactsTableProps {
  pagination?: boolean;
}

const claimedFacts: ClaimedFactDTO[] = [
  {
    fact: 'Two years prior, Dainik Jagran published a front-page headline claiming India conducted a surgical strike on Pakistan, which was later clarified by the Indian Army as fake news.',
    verdict: 'TRUE',
    confidence: 0.76,
    rationale:
      'Multiple sources confirm that on August 22, 2023, Dainik Jagran published a front-page headline claiming a surgical strike. The Indian Army, PIB, and Defense Ministry subsequently refuted this, stating no such strike occurred and clarifying it was an foiled infiltration attempt.',
    citations: [
      'https://www.newslaundry.com/2023/08/22/how-dainik-jagran-manufactured-a-surgical-strike-by-the-indian-army-in-pok',
      'https://www.altnews.in/false-claim-by-dainik-jagran-about-surgical-strike-on-pakistan/',
    ],
  },
  {
    fact: 'There is no online article or tweet from Nepali citizens demanding a Hindu Rashtra; only BJP IT cell supporters are seen making this claim on Twitter.',
    verdict: 'FALSE',
    confidence: 0.8,
    rationale:
      'While Indian BJP supporters and media amplified the narrative, evidence shows that there were genuine pro-monarchy and Hindu Rashtra rallies in Nepal involving Nepali citizens and political parties like RPP and NJP. Social media posts from Nepali users existed, contradicting the claim that *only* BJP IT cell supporters were making the claim or that *no* Nepali citizens demanded it.',
    citations: [
      'https://gnet-research.org/2023/12/21/the-vitalisation-of-hindu-nationalism-in-nepal-and-social-media-as-a-tool-of-pro-hindutva-propaganda-overseas/',
      'https://factcheck.afp.com/doc.afp.com.74H8966',
    ],
  },
  {
    fact: 'There is no online article or tweet from Nepali citizens demanding a Hindu Rashtra; only BJP IT cell supporters are seen making this claim on Twitter.',
    verdict: 'FALSE',
    confidence: 0.8,
    rationale:
      'While Indian BJP supporters and media amplified the narrative, evidence shows that there were genuine pro-monarchy and Hindu Rashtra rallies in Nepal involving Nepali citizens and political parties like RPP and NJP. Social media posts from Nepali users existed, contradicting the claim that *only* BJP IT cell supporters were making the claim or that *no* Nepali citizens demanded it.',
    citations: [
      'https://gnet-research.org/2023/12/21/the-vitalisation-of-hindu-nationalism-in-nepal-and-social-media-as-a-tool-of-pro-hindutva-propaganda-overseas/',
      'https://factcheck.afp.com/doc.afp.com.74H8966',
    ],
  },
];

const ClaimedFactsTable = ({ pagination = false }: ClaimedFactsTableProps) => {
  return (
    <section>
      <Card className='w-full'>
        <CardHeader>
          <CardDescription className='font-semibold'>Claimed Facts</CardDescription>
          {/* <CardDescription></CardDescription> */}
        </CardHeader>
        <CardContent>
          <DataTable columns={claimedFactColumns} data={claimedFacts} pagination={pagination} />
        </CardContent>
      </Card>
    </section>
  );
};
export default ClaimedFactsTable;
