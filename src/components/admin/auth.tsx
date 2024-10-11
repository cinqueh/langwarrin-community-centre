import { auth } from "../../../auth";

export async function authenticate(onSuccess: () => Promise<JSX.Element>): Promise<JSX.Element> {
    const session = await auth();
    if (!session) return <div>Not authenticated</div>
    
    return await onSuccess();
}