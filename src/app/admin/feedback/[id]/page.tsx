import { IndividualWrapper } from "../../../../components/admin/background";
import AdminHeader from "@/components/admin/admin-header";
import { FeedbackInquiryDisplayObjectMapper } from "@/backend/mapper/display-object-mapper";
import { authorize } from "@/components/admin/auth";
import { DisplayIndividualComponent } from "@/components/admin/display-individual";
import FeedbackInquiryService from "@/backend/service/feedback-inquiry-service";

interface FeedbackPageProps {
    params: { id: string };
  } 

export default async function Feedback({ params }: FeedbackPageProps) {
    return authorize(
      async () => {

        const id = Number(params.id);

        const service = new FeedbackInquiryService();
        const data = await service.get(id);

        if (data) {
          const mapper = new FeedbackInquiryDisplayObjectMapper();
    
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