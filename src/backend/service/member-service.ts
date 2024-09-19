import { PostgrestSingleResponse } from "@supabase/supabase-js";
import { MemberDTO } from "../dto/member";
import { AddressDTO, PersonDTO } from "../dto/person";
import MemberMapper, { Member } from "../mapper/member-mapper";
import MemberRepository from "../repository/member-repository";
import { DatabaseError } from "../util/errors";


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

    public constructor(){
        this.repository = new MemberRepository();
        this.mapper = new MemberMapper();
    }

    private repository: MemberRepository;
    private mapper: MemberMapper;

    public async addMember(member: MemberDTO) { // : Promise<MemberDTO[]> {
        const response = await this.repository.addMember(member);

        return this.handleResponse(response, (data) => data);
    }

    public async getMember(id: number) {
        const response = await this.repository.get(id);

        return this.handleResponse(response, 
            (members) => members.length == 0 ? undefined : this.mapper.mapTo(members[0]));
    }

    public async getAllMembers() {
        const response = await this.repository.getAllMembers();

        return this.handleResponse(response as PostgrestSingleResponse<Member[]>, 
            (data) => data.map(member => 
                this.mapper.mapTo(member)
            )
        );
    }
}