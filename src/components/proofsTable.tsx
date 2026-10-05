import { Card, CardContent, CardDescription, CardHeader, CardTitle } from './ui/card';
import { DataTable } from './table/data-table';
import { ProofDTO } from '@/types/dto';
import { proofsColumns } from './proofsColumns';

interface ClaimedFactsTableProps {
  pagination?: boolean;
}

const proofs: ProofDTO[] = [
  { thumbnailUrl: '', title: 'TEST TITLE', verdict: 'TRUE', timeTaken: '120' },
  { thumbnailUrl: '', title: 'TEST TITLE', verdict: 'TRUE', timeTaken: '120' },
  { thumbnailUrl: '', title: 'TEST TITLE', verdict: 'TRUE', timeTaken: '120' },
  { thumbnailUrl: '', title: 'TEST TITLE', verdict: 'TRUE', timeTaken: '120' },
  { thumbnailUrl: '', title: 'TEST TITLE', verdict: 'TRUE', timeTaken: '120' },
];

const ProofsTable = ({ pagination = true }: ClaimedFactsTableProps) => {
  return (
    <section>
      <Card className='w-full h-full mx-auto'>
        <CardHeader>
          <CardDescription className='font-semibold'>Your Proof Please Runs</CardDescription>
          {/* <CardDescription></CardDescription> */}
        </CardHeader>
        <CardContent>
          <DataTable
            columns={proofsColumns}
            data={proofs}
            pagination={pagination}
            page={1}
            pageSize={5}
            totalPages={3}
            totalRecords={12}
          />
        </CardContent>
      </Card>
    </section>
  );
};
export default ProofsTable;
