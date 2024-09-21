import GeneralInquiryMapper from "../../../backend/mapper/inquiry-mapper";
import { GeneralInquiryDTO } from "../../../backend/dto/inquiry";
import { PersonMapper } from "../../../backend/mapper/person-mapper";
import { PersonDTO } from "../../../backend/dto/person";

describe('GeneralInquiryMapper Tests', () => {
    const generalInquiryMapper = new GeneralInquiryMapper();

    describe('GeneralInquiryMapper', () => {
        it('should map GeneralInquiry to GeneralInquiryDTO with notes', () => {
            const inquiry = {
                inquiryId: 1,
                message: "This is a general inquiry message.",
                inquiry: {
                    inquiryId: 1,
                    time: "2024-09-19T09:11:22.027Z",
                    person: {
                        personid: 1,
                        firstname: "John",
                        surname: "Doe",
                        email: "john.doe@example.com",
                        homenumber: "123456789",
                        phonenumber: "987654321",
                        occupation: "Engineer",
                    },
                    notes: "These are some notes."
                }
            };

            const expectedPersonDTO: PersonDTO = {
                personId: 1,
                firstName: "John",
                surname: "Doe",
                email: "john.doe@example.com",
                homeNumber: "123456789",
                phoneNumber: "987654321",
                occupation: "Engineer",
                address: undefined
            };

            const expectedGeneralInquiryDTO: GeneralInquiryDTO = {
                date: new Date("2024-09-19T09:11:22.027Z"),
                person: expectedPersonDTO,
                message: "This is a general inquiry message.",
                inquiryId: 1,
                notes: "These are some notes."
            };

            const result = generalInquiryMapper.mapTo(inquiry);
            expect(result).toEqual(expectedGeneralInquiryDTO);
        });

        it('should map GeneralInquiry to GeneralInquiryDTO without notes', () => {
            const inquiry = {
                inquiryId: 1,
                message: "This is a general inquiry message.",
                inquiry: {
                    inquiryId: 1,
                    time: "2024-09-19T09:11:22.027Z",
                    person: {
                        personid: 1,
                        firstname: "John",
                        surname: "Doe",
                        email: "john.doe@example.com",
                        homenumber: "123456789",
                        phonenumber: "987654321",
                        occupation: "Engineer",
                    },
                    notes: "Hello"
                }
            };

            const expectedPersonDTO: PersonDTO = {
                personId: 1,
                firstName: "John",
                surname: "Doe",
                email: "john.doe@example.com",
                homeNumber: "123456789",
                phoneNumber: "987654321",
                occupation: "Engineer",
                address: undefined
            };

            const expectedGeneralInquiryDTO: GeneralInquiryDTO = {
                date: new Date("2024-09-19T09:11:22.027Z"),
                person: expectedPersonDTO,
                message: "This is a general inquiry message.",
                inquiryId: 1,
                notes: "Hello"
            };

            const result = generalInquiryMapper.mapTo(inquiry);
            expect(result).toEqual(expectedGeneralInquiryDTO);
        });
    });
});
