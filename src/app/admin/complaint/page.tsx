import { auth } from "../../../../auth";
import TableComponent from "../../../components/admin/display-table";
import MemberService from "../../../backend/service/member-service";
import { TableWrapper } from "../../../components/admin/background";
import AdminHeader from "@/components/admin/admin-header";
import { ComplaintInquiryObjectMapper, MemberDisplayObjectMapper } from "@/backend/mapper/display-object-mapper";
import { authorize } from "@/components/admin/auth";
import ComplaintInquiryService from "@/backend/service/complaint-inquiry-service";


export default async function Dashboard() {
    return authorize(
      async () => {
        const service = new ComplaintInquiryService();
        const data = await service.getAll();
    
        const mapper = new ComplaintInquiryObjectMapper();
    
        const formattedData = mapper.mapToMany(data);
    
        return (
          <AdminHeader>
              <TableWrapper title={'Complaints'}>
                  <TableComponent 
                    data={formattedData.objects} 
                    columns={formattedData.columns} 
                    descriptor={'Enquiries'}
                    linkedUrl={'complaint'}/>
              </TableWrapper>
          </AdminHeader>
        );
      }
    );
}