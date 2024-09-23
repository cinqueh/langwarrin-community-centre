import { FeedbackInquiryMapper, GeneralInquiryMapper } from "../../../backend/mapper/inquiry-mapper";
import { FeedbackInquiryDTO, GeneralInquiryDTO } from "../../../backend/dto/inquiry";
import { PersonDTO } from "../../../backend/dto/person";

describe('Mapper Tests', () => {
    const generalInquiryMapper = new GeneralInquiryMapper();
    const feedbackInquiryMapper = new FeedbackInquiryMapper();

    describe('GeneralInquiryMapper', () => {
        it('should map GeneralInquiry to GeneralInquiryDTO with notes', () => {
            const inquiry = {
                inquiryid: 1,
                message: "This is a general inquiry message.",
                inquiry: {
                    inquiryid: 1,
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
                inquiryid: 1,
                message: "This is a general inquiry message.",
                inquiry: {
                    inquiryid: 1,
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
                    notes: ''
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
                notes: undefined
            };

            const result = generalInquiryMapper.mapTo(inquiry);
            expect(result).toEqual(expectedGeneralInquiryDTO);
        });
    });

    describe('FeedbackInquiryMapper', () => {
        it('should map FeedbackInquiry to FeedbackInquiryDTO with notes', () => {
            const inquiry = {
                inquiryid: 1,
                programname: "Program A",
                feedback: "Great feedback!",
                inquiry: {
                    inquiryid: 1,
                    time: "2024-09-19T09:11:22.027Z",
                    person: {
                        personid: 1,
                        firstname: "Jane",
                        surname: "Doe",
                        email: "jane.doe@example.com",
                        homenumber: "123456789",
                        phonenumber: "987654321",
                        occupation: "Doctor",
                    },
                    notes: "This is a note."
                }
            };

            const expectedPersonDTO: PersonDTO = {
                personId: 1,
                firstName: "Jane",
                surname: "Doe",
                email: "jane.doe@example.com",
                homeNumber: "123456789",
                phoneNumber: "987654321",
                occupation: "Doctor",
                address: undefined
            };

            const expectedFeedbackInquiryDTO: FeedbackInquiryDTO = {
                date: new Date("2024-09-19T09:11:22.027Z"),
                person: expectedPersonDTO,
                programName: "Program A",
                feedback: "Great feedback!",
                inquiryId: 1,
                notes: "This is a note."
            };

            const result = feedbackInquiryMapper.mapTo(inquiry);
            expect(result).toEqual(expectedFeedbackInquiryDTO);
        });

        it('should map FeedbackInquiry to FeedbackInquiryDTO without notes', () => {
            const inquiry = {
                inquiryid: 1,
                programname: "Program A",
                feedback: "Great feedback!",
                inquiry: {
                    inquiryid: 1,
                    time: "2024-09-19T09:11:22.027Z",
                    person: {
                        personid: 1,
                        firstname: "Jane",
                        surname: "Doe",
                        email: "jane.doe@example.com",
                        homenumber: "123456789",
                        phonenumber: "987654321",
                        occupation: "Doctor",
                    },
                    notes: ''
                }
            };

            const expectedPersonDTO: PersonDTO = {
                personId: 1,
                firstName: "Jane",
                surname: "Doe",
                email: "jane.doe@example.com",
                homeNumber: "123456789",
                phoneNumber: "987654321",
                occupation: "Doctor",
                address: undefined
            };

            const expectedFeedbackInquiryDTO: FeedbackInquiryDTO = {
                date: new Date("2024-09-19T09:11:22.027Z"),
                person: expectedPersonDTO,
                programName: "Program A",
                feedback: "Great feedback!",
                inquiryId: 1,
                notes: undefined
            };

            const result = feedbackInquiryMapper.mapTo(inquiry);
            expect(result).toEqual(expectedFeedbackInquiryDTO);
        });
    });
});
