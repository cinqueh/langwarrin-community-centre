import MemberService from "@/backend/service/member-service";
import AdminHeader from "@/components/admin/admin-header";
import { authorize } from "@/components/admin/auth";
import { IndividualWrapper } from "@/components/admin/background";

import dynamic from "next/dynamic";
 
const EmailForm = dynamic(() => import("../../../components/admin/email"), { ssr: false });

export default async function Dashboard() {
    return authorize(
      async () => {
        // get a list of all member emails
        const service = new MemberService();
        const members = Array.from(
          new Set((await service.getAll())
            .map(member => member.person?.email)
            .filter(email => email !== undefined))
        );

        return (
          <AdminHeader>
              <IndividualWrapper title={"Send Mass Email"}>
                <EmailForm memberEmails={members}/>
              </IndividualWrapper>
          </AdminHeader>
        );
      }
    );
}