import { NextRequest, NextResponse } from 'next/server';
import MemberService from '@/backend/service/member-service';
import { authorizeRoute } from '@/components/admin/auth'; 

export async function DELETE(
  request: NextRequest,
  { params }: { params: { id: string } }
): Promise<Response> {
  try {
    return await authorizeRoute(async () => {

      const id = Number(params.id);

      const service = new MemberService();
      await service.deleteMember(id);

      return NextResponse.json(
        { message: 'Member deleted successfully' },
        { status: 200 }
      );
    });
  } catch (error: any) {
    console.error('Error in DELETE API route:', error);
    return NextResponse.json(
      { error: 'Failed to delete member', details: error.message },
      { status: 500 }
    );
  }
}
