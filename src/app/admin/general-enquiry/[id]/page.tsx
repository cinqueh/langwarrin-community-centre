import { IndividualWrapper } from "../../../../components/admin/background";
import AdminHeader from "@/components/admin/admin-header";
import { ComplaintInquiryObjectMapper, GeneralInquiryDisplayObjectMapper } from "@/backend/mapper/display-object-mapper";
import { authorize } from "@/components/admin/auth";
import { DisplayIndividualComponent } from "@/components/admin/display-individual";
import ComplaintInquiryService from "@/backend/service/complaint-inquiry-service";
import GeneralInquiryService from "@/backend/service/general-inquiry-service";

interface ComplaintPageProps {
    params: { id: string };
  } 

export default async function Complaint({ params }: ComplaintPageProps) {
    return authorize(
      async () => {

        const id = Number(params.id);

        const service = new GeneralInquiryService();
        const data = await service.get(id);

        if (data) {
          const mapper = new GeneralInquiryDisplayObjectMapper();
    
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