import TableComponent from "../../../components/admin/display-table";
import { TableWrapper } from "../../../components/admin/background";
import AdminHeader from "@/components/admin/admin-header";
import { GeneralInquiryDisplayObjectMapper } from "@/backend/mapper/display-object-mapper";
import { authorize } from "@/components/admin/auth";
import GeneralInquiryService from "@/backend/service/general-inquiry-service";


export default async function Dashboard() {
    return authorize(
      async () => {
        const service = new GeneralInquiryService();
        const data = await service.getAll();
    
        const mapper = new GeneralInquiryDisplayObjectMapper();
    
        const formattedData = mapper.mapToMany(data);
    
        return (
          <AdminHeader>
              <TableWrapper title={'General Enquiries'}>
                  <TableComponent 
                    data={formattedData.objects} 
                    columns={formattedData.columns} 
                    descriptor={'General Enquiries'}
                    linkedUrl={'general-enquiry'}/>
              </TableWrapper>
          </AdminHeader>
        );
      }
    );
}