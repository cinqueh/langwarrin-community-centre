import TableComponent from "../../../components/admin/display-table";
import { TableWrapper } from "../../../components/admin/background";
import AdminHeader from "@/components/admin/admin-header";
import { FeedbackInquiryDisplayObjectMapper } from "@/backend/mapper/display-object-mapper";
import { authorize } from "@/components/admin/auth";
import FeedbackInquiryService from "@/backend/service/feedback-inquiry-service";


export default async function Dashboard() {
    return authorize(
      async () => {
        const service = new FeedbackInquiryService();
        const data = await service.getAll();
    
        const mapper = new FeedbackInquiryDisplayObjectMapper();
    
        const formattedData = mapper.mapToMany(data);
    
        return (
          <AdminHeader>
              <TableWrapper title={'Feedback'}>
                  <TableComponent 
                    data={formattedData.objects} 
                    columns={formattedData.columns} 
                    descriptor={'Pieces of Feedback'}
                    linkedUrl={'feedback'}/>
              </TableWrapper>
          </AdminHeader>
        );
      }
    );
}