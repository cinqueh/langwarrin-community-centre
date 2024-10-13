// pages/admin/childcare/page.tsx

import TableComponent from "../../../components/admin/display-table";
import { TableWrapper } from "../../../components/admin/background";
import AdminHeader from "@/components/admin/admin-header";
import { ChildcareInquiryDisplayObjectMapper } from "@/backend/mapper/display-object-mapper";
import { authorize } from "@/components/admin/auth";
import ChildcareInquiryService from "@/backend/service/childcare-inquiry-service";

export default async function Dashboard() {
  return authorize(
    async () => {
      // Use the ChildcareInquiryService to fetch all childcare inquiries
      const service = new ChildcareInquiryService();
      const data = await service.getAll();

      // Use the ChildcareInquiryDisplayObjectMapper to map the data for display
      const mapper = new ChildcareInquiryDisplayObjectMapper();

      const formattedData = mapper.mapToMany(data);

      return (
        <AdminHeader>
          <TableWrapper title={'Childcare Enquiries'}>
            <TableComponent 
              data={formattedData.objects} 
              columns={formattedData.columns} 
              descriptor={'Childcare Enquiries'}
              linkedUrl={'childcare'}/>
          </TableWrapper>
        </AdminHeader>
      );
    }
  );
}