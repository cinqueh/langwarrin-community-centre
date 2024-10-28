import AdminHeader from "@/components/admin/admin-header";
import { authorize } from "@/components/admin/auth";
import { IndividualWrapper } from "@/components/admin/background";

import dynamic from "next/dynamic";
 
const EmailForm = dynamic(() => import("../../../components/admin/email"), { ssr: false });

export default async function Dashboard() {
    return authorize(
      async () => {
        return (
          <AdminHeader>
              <IndividualWrapper title={"Bulk Emailer"}>
                <EmailForm/>
              </IndividualWrapper>
          </AdminHeader>
        );
      }
    );
}