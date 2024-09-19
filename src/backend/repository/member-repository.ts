import { MemberDTO } from "../dto/member";
import BaseRepository from "./base-repository";

export default class MemberRepository extends BaseRepository {

    public async addMember(member: MemberDTO) {

        const client = this.getSupabaseClient()

        const addMemberData = {
            _state: member?.person?.address?.state,
            _streetaddress: member?.person?.address?.streetAddress,
            _apartment: member?.person?.address?.apartment || '',
            _suburb: member?.person?.address?.suburb,
            _postcode: member?.person?.address?.postcode,
            _firstname: member?.person?.firstName,
            _surname: member?.person?.surname,
            _email: member?.person?.email,
            _homenumber: member?.person?.homeNumber || '',
            _phonenumber: member?.person?.phoneNumber || '',
            _occupation: member?.person?.occupation || '',
            _title: member?.title,
            _submitdate: member?.submitDate?.toISOString()
        };

        return await client
            .rpc('add_full_member', addMemberData);
    }

    public async get(id: number) {
        const client = this.getSupabaseClient();

        return await client
            .from('member')
            .select(`
                *,
                person (
                  *,
                  address (
                    *
                  )
                )
              `)
            .eq('memberid', id);
    }

    public async getAllMembers() {
        
        const client = this.getSupabaseClient();

        return await client
            .from('member')
            .select(`
                *,
                person (
                  *,
                  address (
                    *
                  )
                )
              `);
    }
}