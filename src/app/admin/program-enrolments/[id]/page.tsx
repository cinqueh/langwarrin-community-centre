import ProgramCourseInquiryService from "../../../../backend/service/program-course-inquiry-service";
import { IndividualWrapper } from "../../../../components/admin/background";
import AdminHeader from "@/components/admin/admin-header";
import { ProgramCourseInquiryDisplayObjectMapper } from "@/backend/mapper/display-object-mapper";
import { authorize } from "@/components/admin/auth";
import { DisplayIndividualComponent } from "@/components/admin/display-individual";

interface ProgramInquiryPageProps {
    params: { id: string };
} 

export default async function ProgramInquiry({ params }: ProgramInquiryPageProps) {
    return authorize(
        async () => {
            const id = Number(params.id);

            const service = new ProgramCourseInquiryService();
            const data = await service.get(id);

            if (data) {
                const mapper = new ProgramCourseInquiryDisplayObjectMapper();
                const formattedData = mapper.mapTo(data);

                return (
                    <AdminHeader>
                        <IndividualWrapper title={formattedData.object.header}>
                            <DisplayIndividualComponent 
                              data={formattedData.object} 
                              columns={formattedData.columns}
                            />
                        </IndividualWrapper>
                    </AdminHeader>
                );
            } else {
                return (
                    <p>Could not find the program inquiry</p>
                );
            }
        }
    );
}