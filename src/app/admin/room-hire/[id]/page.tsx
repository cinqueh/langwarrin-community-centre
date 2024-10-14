import { IndividualWrapper } from "../../../../components/admin/background";
import AdminHeader from "@/components/admin/admin-header";
import { RoomBookingDisplayObjectMapper } from "@/backend/mapper/display-object-mapper";
import { authorize } from "@/components/admin/auth";
import { DisplayIndividualComponent } from "@/components/admin/display-individual";
import RoomBookingInquiryService from "@/backend/service/room-booking-inquiry-service";

interface RoomBookingPageProps {
    params: { id: string };
} 

export default async function RoomBooking({ params }: RoomBookingPageProps) {
    return authorize(
      async () => {

        const id = Number(params.id);

        const service = new RoomBookingInquiryService();
        const data = await service.get(id);

        if (data) {
          const mapper = new RoomBookingDisplayObjectMapper();
    
          const formattedData = mapper.mapTo(data);
      
          return (
            <AdminHeader>
              <IndividualWrapper title={formattedData.object.header}>
                <DisplayIndividualComponent data={formattedData.object} columns={formattedData.columns}/>
              </IndividualWrapper>
            </AdminHeader>
          );
        }
        else {
          return (
            <p>Could not find entity</p>
          )
        }
      }
    );
}