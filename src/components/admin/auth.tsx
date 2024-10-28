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

export async function authorizeRoute(onSuccess: () => Promise<Response>): Promise<Response> {

    const session = await auth();
    
    // if not authenticated, redirect to the login page
    if (!session) {
        return new Response(
            JSON.stringify({ error: 'Unauthorized.' }),
            {
                status: 403,
                headers: { 'Content-Type': 'application/json' }
            }
        );
    }
    else {
        return await onSuccess();
    }
}