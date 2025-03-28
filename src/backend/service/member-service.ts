import { MemberDTO } from "../dto/member";
import MemberMapper, { Member } from "../mapper/member-mapper";
import MemberRepository from "../repository/member-repository";
import DatabaseService from "./database-service";


export default class MemberService extends DatabaseService<MemberRepository, Member, MemberDTO> {

    constructor(){
        super(new MemberRepository(), new MemberMapper());
    }

    public async addMember(member: MemberDTO) { // : Promise<MemberDTO[]> {

        member.submitDate = new Date();

        member = this.validateData(member, (member) => true);

        const response = await this.repository.addMember(member);

        return this.handleResponse(response, (data) => data);
    }

    public async deleteMember(id: number) {
        const response = await this.repository.deleteMember(id);
        return this.handleResponse(response, (data) => data);
    }
}