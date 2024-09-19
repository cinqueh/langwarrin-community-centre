import { MemberDTO } from "../dto/member";
import Mapper from "./mapper";
import { Person, PersonMapper } from "./person-mapper";

export type AddMemberData = {
    _state: string;
    _streetAddress: string;
    _apartment: string;
    _suburb: string;
    _postcode: string;
    _firstName: string;
    _surname: string;
    _email: string;
    _homeNumber: string;
    _phoneNumber: string;
    _occupation: string;
    _title: string;
    _submitDate: string;
};

export type Member = {
    memberid: number;
    title: string;
    submitdate: string;
    approved?: string | null;
    personid: number;
    notes?: string | null;
    person: Person;
};

export default class MemberMapper implements Mapper<Member, MemberDTO> {

    public mapTo(member: Member): MemberDTO {

        console.log(member);

        const personMapper = new PersonMapper();

        return new MemberDTO({
            memberId: member.memberid,
            title: member.title,
            submitDate: new Date(member.submitdate),
            approved: member.approved ? new Date(member.approved) : undefined,
            person: personMapper.mapTo(member.person)
        });
    }
}