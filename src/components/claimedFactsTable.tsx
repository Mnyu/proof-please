import { Card, CardContent, CardDescription, CardHeader, CardTitle } from './ui/card';
import { DataTable } from './table/data-table';
import { claimedFactColumns } from './claimedFactsColumns';
import { ClaimedFactDTO, FactCheckJobDTO } from '@/types/dto';

interface ClaimedFactsTableProps {
  proof: FactCheckJobDTO;
  pagination?: boolean;
}

const transformToClaimedFactDTOs = (proof: FactCheckJobDTO) => {
  const factResults = proof.verifierResponse.factResults;
  const claimedFactDTOs: ClaimedFactDTO[] = [];
  factResults.map((factResult) => {
    claimedFactDTOs.push({
      fact: factResult.fact,
      verdict: factResult.verdict,
      confidence: factResult.confidence,
      rationale: factResult.rationale,
      citations: factResult.support.map((s) => s.url),
    });
  });
  return claimedFactDTOs;
};

const ClaimedFactsTable = ({ proof, pagination = false }: ClaimedFactsTableProps) => {
  const claimedFacts = transformToClaimedFactDTOs(proof);
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
