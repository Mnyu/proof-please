import { Card, CardContent, CardDescription, CardHeader, CardTitle } from './ui/card';
import { DataTable } from './table/data-table';
import { PageResponse, ProofDTO } from '@/types/dto';
import { proofsColumns } from './proofsColumns';

interface ClaimedFactsTableProps {
  data: PageResponse<ProofDTO>;
}

const ProofsTable = ({ data }: ClaimedFactsTableProps) => {
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
            data={data.data}
            pagination={true}
            page={data.pagination.page}
            pageSize={data.pagination.pageSize}
            totalPages={data.pagination.totalPages}
            totalRecords={data.pagination.totalRecords}
          />
        </CardContent>
      </Card>
    </section>
  );
};
export default ProofsTable;
