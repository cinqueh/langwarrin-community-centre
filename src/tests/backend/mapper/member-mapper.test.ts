import MemberMapper from "../../../backend/mapper/member-mapper";
import { MemberDTO } from "../../../backend/dto/member";
import { PersonDTO } from "../../../backend/dto/person";

describe('MemberMapper', () => {
    let memberMapper: MemberMapper;

    beforeEach(() => {
        memberMapper = new MemberMapper();
    });

    it('should map Member to MemberDTO with approved date', () => {
        const member = {
            memberid: 1,
            title: "Dr",
            submitdate: "2023-09-01T12:00:00Z",
            approved: "2023-09-10T12:00:00Z",
            personid: 100,
            person: {
                personid: 100,
                firstname: "John",
                surname: "Doe",
                email: "john.doe@example.com",
                homenumber: "123456789",
                phonenumber: "987654321",
                occupation: "Engineer",
                address: {
                    addressid: 1,
                    state: "Victoria",
                    streetaddress: "123 Fake St",
                    suburb: "Faketown",
                    postcode: "3000",
                }
            }
        };

        const expectedPersonDTO: PersonDTO = {
            personId: 100,
            firstName: "John",
            surname: "Doe",
            email: "john.doe@example.com",
            homeNumber: "123456789",
            phoneNumber: "987654321",
            occupation: "Engineer",
            address: {
                state: "Victoria",
                streetAddress: "123 Fake St",
                apartment: undefined,
                suburb: "Faketown",
                postcode: "3000",
            }
        };
        const expectedMemberDTO: MemberDTO = {
            memberId: 1,
            title: "Dr",
            submitDate: new Date("2023-09-01T12:00:00Z"),
            approved: new Date("2023-09-10T12:00:00Z"),
            person: expectedPersonDTO
        };

        const result = memberMapper.mapTo(member);
        expect(result).toEqual(expectedMemberDTO);
    });

    it('should map Member to MemberDTO without approved date', () => {
        const member = {
            memberid: 2,
            title: "Mr",
            submitdate: "2023-09-01T12:00:00Z",
            approved: null,
            personid: 200,
            person: {
                personid: 200,
                firstname: "Jane",
                surname: "Smith",
                email: "jane.smith@example.com",
                homenumber: "987654321",
                phonenumber: "123456789",
                occupation: "Doctor",
                address: {
                    addressid: 2,
                    state: "Victoria",
                    streetaddress: "456 Real Rd",
                    suburb: "Realville",
                    postcode: "4000",
                }
            }
        };

        const expectedPersonDTO: PersonDTO = {
            personId: 200,
            firstName: "Jane",
            surname: "Smith",
            email: "jane.smith@example.com",
            homeNumber: "987654321",
            phoneNumber: "123456789",
            occupation: "Doctor",
            address: {
                state: "Victoria",
                streetAddress: "456 Real Rd",
                apartment: undefined,
                suburb: "Realville",
                postcode: "4000",
            }
        };

        const expectedMemberDTO: MemberDTO = {
            memberId: 2,
            title: "Mr",
            submitDate: new Date("2023-09-01T12:00:00Z"),
            approved: undefined,
            person: expectedPersonDTO
        };

        const result = memberMapper.mapTo(member);
        expect(result).toEqual(expectedMemberDTO);
    });
});
