import { PostgrestSingleResponse } from "@supabase/supabase-js";
import { MemberDTO } from "../dto/member";
import { AddressDTO, PersonDTO } from "../dto/person";
import MemberMapper, { Member } from "../mapper/member-mapper";
import MemberRepository from "../repository/member-repository";


export default class MemberService {

    private handleResponse<T, Q>(
        response: PostgrestSingleResponse<T>,
        onSuccess: (data: T) => Q            
    ): Q {
        if (!response.error) {
          return onSuccess(response.data as T);
        } else {
          console.error(response.error);
          throw new DatabaseError(response.error.message);
        }
    }

    public async addMember(member: MemberDTO) { // : Promise<MemberDTO[]> {
        const repository = new MemberRepository();

        const response = await repository.addMember(member);

        return this.handleResponse(response, (data) => data);
    }

    public async getMember(id: number) {
        const repository = new MemberRepository();
        const mapper = new MemberMapper();

        const response = await repository.get(id);

        return this.handleResponse(response, 
            (members) => members.length == 0 ? undefined : mapper.mapTo(members[0]));
    }

    public async getAllMembers() {
        const repository = new MemberRepository();
        const mapper = new MemberMapper();

        const response = await repository.getAllMembers();

        return this.handleResponse(response as PostgrestSingleResponse<Member[]>, 
            (data) => data.map(member => 
                mapper.mapTo(member)
            )
        );
    }
}