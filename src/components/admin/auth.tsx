import { redirect } from 'next/navigation'; 
import { auth } from "../../../auth";

export async function authorize(onSuccess: () => Promise<JSX.Element>): Promise<JSX.Element> {
    const session = await auth();
    
    // if not authenticated, redirect to the login page
    if (!session) {
        redirect('/admin/sign-in');
    }
    else {
        return await onSuccess();
    }
}