import { auth } from "@/../auth";
import TableComponent from "@/components/admin/display-table";
import { Column } from "react-table";
import MemberService from "@/backend/service/member-service";
import { TableWrapper } from "@/components/admin/background";

type Member = {
    id: number;
    name: string;
    email: string;
    address: string;
    phoneNumber: string;
    homeNumber: string;
    occupation: string;
    approved: string;
}

const userColumns: Column<Member>[] = [
    {
      Header: 'ID',
      accessor: 'id',
    },
    {
      Header: 'Name',
      accessor: 'name',
    },
    {
      Header: 'Email',
      accessor: 'email',
    },
    {
      Header: 'Address',
      accessor: 'address',
    },
    {
      Header: 'Mobile Number',
      accessor: 'phoneNumber',
    },
    {
      Header: 'Home Number',
      accessor: 'homeNumber',
    },
    {
      Header: 'Previous/Current Occupation',
      accessor: 'occupation',
    },
    {
      Header: 'Approved/Paid',
      accessor: 'approved',
    }
];

export default async function Dashboard() {

    const session = await auth();
    if (!session) return <div>Not authenticated</div>

    const service = new MemberService();
    const data = await service.getAll();

    const formattedData: Member[] = data.map(item => ({
      id: item.memberId,
      name: `${item.title ?? ''} ${item.person?.firstName ?? ''} ${item.person?.surname ?? ''}`,
      email: item.person?.email ?? '',
      address: item.person?.address?.toString() ?? '',
      phoneNumber: item.person?.phoneNumber ?? '',
      homeNumber: item.person?.homeNumber ?? '',
      occupation: item.person?.occupation ?? '',
      approved: item.approved ? 'Yes' : 'No'
    }))

    return (
        <TableWrapper title={'Memberships'}>
            <TableComponent 
              data={formattedData} 
              columns={userColumns} 
              descriptor={'Community Members'}
              linkedUrl={'member'}/>
        </TableWrapper>
    );
}