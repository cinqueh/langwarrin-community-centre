import TableComponent from "../../../components/admin/display-table";
import { TableWrapper } from "../../../components/admin/background";
import AdminHeader from "@/components/admin/admin-header";
import { ProgramCourseInquiryDisplayObjectMapper } from "@/backend/mapper/display-object-mapper";
import { authorize } from "@/components/admin/auth";
import ProgramCourseInquiryService from "@/backend/service/program-course-inquiry-service";

export default async function Dashboard() {
    return authorize(
      async () => {
        const service = new ProgramCourseInquiryService();
        const data = await service.getAll();
    
        const mapper = new ProgramCourseInquiryDisplayObjectMapper();
    
        const formattedData = mapper.mapToMany(data);
    
        return (
          <AdminHeader>
              <TableWrapper title={'Program Enrollments'}>
                  <TableComponent 
                    data={formattedData.objects} 
                    columns={formattedData.columns} 
                    descriptor={'Program Enrollments'}
                    linkedUrl={'program-enrollment'}/>
              </TableWrapper>
          </AdminHeader>
        );
      }
    );
}