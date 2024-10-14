import TableComponent from "../../../components/admin/display-table";
import { TableWrapper } from "../../../components/admin/background";
import AdminHeader from "@/components/admin/admin-header";
import { RoomBookingDisplayObjectMapper } from "@/backend/mapper/display-object-mapper";
import { authorize } from "@/components/admin/auth";
import RoomBookingInquiryService from "@/backend/service/room-booking-inquiry-service";

export default async function Dashboard() {
    return authorize(
      async () => {
        const service = new RoomBookingInquiryService();
        const data = await service.getAll();
    
        const mapper = new RoomBookingDisplayObjectMapper();
    
        const formattedData = mapper.mapToMany(data);
    
        return (
          <AdminHeader>
              <TableWrapper title={'Room Booking Inquiries'}>
                  <TableComponent 
                    data={formattedData.objects} 
                    columns={formattedData.columns} 
                    descriptor={'Room Booking Inquiries'}
                    linkedUrl={'room-hire'}/>
              </TableWrapper>
          </AdminHeader>
        );
      }
    );
}
