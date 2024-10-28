// pages/admin/childcare/[id]/page.tsx

import { IndividualWrapper } from "../../../../components/admin/background";
import AdminHeader from "@/components/admin/admin-header";
import { ChildcareInquiryDisplayObjectMapper } from "@/backend/mapper/display-object-mapper";
import { authorize } from "@/components/admin/auth";
import { DisplayIndividualInquiryComponent } from "@/components/admin/display-individual";
import ChildcareInquiryService from "@/backend/service/childcare-inquiry-service";

interface ChildcareInquiryPageProps {
    params: { id: string };
} 

export default async function ChildcareInquiry({ params }: ChildcareInquiryPageProps) {
    return authorize(
      async () => {

        const id = Number(params.id);

        const service = new ChildcareInquiryService();
        const data = await service.get(id);

        if (data) {
          const mapper = new ChildcareInquiryDisplayObjectMapper();
    
          const formattedData = mapper.mapTo(data);
      
          return (
            <AdminHeader>
              <IndividualWrapper title={formattedData.object.header}>
                <DisplayIndividualInquiryComponent data={formattedData.object} columns={formattedData.columns}/>
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