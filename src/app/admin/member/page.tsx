import { auth } from "../../../../auth";
import TableComponent from "../../../components/admin/display-table";

import MemberService from "../../../backend/service/member-service";
import { TableWrapper } from "../../../components/admin/background";
import AdminHeader from "@/components/admin/admin-header";
import { MemberDisplayObjectMapper } from "@/backend/mapper/display-object-mapper";
import { authorize } from "@/components/admin/auth";


export default async function Dashboard() {
    return authorize(
      async () => {
        const service = new MemberService();
        const data = await service.getAll();
    
        const mapper = new MemberDisplayObjectMapper();
    
        const formattedData = mapper.mapToMany(data);
    
        return (
          <AdminHeader>
              <TableWrapper title={'Memberships'}>
                  <TableComponent 
                    data={formattedData.objects} 
                    columns={formattedData.columns} 
                    descriptor={'Community Members'}
                    linkedUrl={'member'}/>
              </TableWrapper>
          </AdminHeader>
        );
      }
    );
}