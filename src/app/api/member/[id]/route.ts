// app/api/member/[id]/route.ts

import { NextRequest, NextResponse } from 'next/server'; 
import MemberService from '@/backend/service/member-service';
import { getToken } from 'next-auth/jwt';

export async function DELETE(
  request: NextRequest,
  { params }: { params: { id: string } }
): Promise<NextResponse> {
  // Retrieve the token from the request
  const token = await getToken({ req: request, secret: process.env.AUTH_SECRET });

  // If there's no token, return unauthorized response
  if (!token) {
    return new NextResponse(
      JSON.stringify({ error: 'Unauthorized.' }),
      {
        status: 403,
        headers: { 'Content-Type': 'application/json' },
      }
    );
  }

  try {
    const id = Number(params.id);

    const service = new MemberService();
    await service.deleteMember(id);

    return NextResponse.json(
      { message: 'Member deleted successfully' },
      { status: 200 }
    );
  } catch (error: any) {
    console.error('Error in DELETE API route:', error);
    return NextResponse.json(
      { error: 'Failed to delete member', details: error.message },
      { status: 500 }
    );
  }
}