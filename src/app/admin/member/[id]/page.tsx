import TableComponent from "../../../../components/admin/display-table";
import MemberService from "../../../../backend/service/member-service";
import { IndividualWrapper, TableWrapper } from "../../../../components/admin/background";
import AdminHeader from "@/components/admin/admin-header";
import { MemberDisplayObjectMapper } from "@/backend/mapper/display-object-mapper";
import { authorize } from "@/components/admin/auth";
import { DisplayIndividualComponent } from "@/components/admin/display-individual";

interface MemberPageProps {
    params: { id: string };
  } 

export default async function Member({ params }: MemberPageProps) {
    return authorize(
      async () => {

        const id = Number(params.id);

        const service = new MemberService();
        const data = await service.get(id);

        if (data) {
          const mapper = new MemberDisplayObjectMapper();
    
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