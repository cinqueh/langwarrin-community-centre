import FeedbackInquiryRepository from '../../../backend/repository/feedback-inquiry-repository';
import { FeedbackInquiryDTO } from '../../../backend/dto/inquiry';

jest.mock('../../../backend/repository/base-repository');

const mockRpc = jest.fn();
const mockSelect = jest.fn().mockReturnThis(); 
const mockEq = jest.fn().mockReturnThis();

const mockClient = {
    rpc: mockRpc,
    from: jest.fn().mockImplementation(() => ({
        select: mockSelect,
        eq: mockEq,
    })),
};

describe('FeedbackInquiryRepository', () => {
    let repository: FeedbackInquiryRepository;

    beforeEach(() => {
        repository = new FeedbackInquiryRepository();
        // Use type assertion to specify the method
        jest.spyOn(repository as any, 'getSupabaseClient').mockReturnValue(mockClient);
    });

    afterEach(() => {
        jest.clearAllMocks();
    });

    describe('addFeedbackInquiry', () => {
        it('should call add_feedback_inquiry RPC with correct parameters', async () => {
            const inquiry: FeedbackInquiryDTO = {
                date: new Date('2023-09-19'),
                person: {
                    personId: 10,
                    firstName: 'Jane',
                    surname: 'Doe',
                    email: 'jane@example.com',
                    phoneNumber: '987654321',
                    address: {
                        state: 'Victoria',
                        streetAddress: '456 Example St',
                        apartment: '7B',
                        suburb: 'Melbourne',
                        postcode: '3000',
                    },
                },
                programName: 'Program A',
                feedback: 'Great program!',
            };

            await repository.addFeedbackInquiry(inquiry);

            expect(mockRpc).toHaveBeenCalledWith('add_feedback_inquiry', {
                _date: '2023-09-19T00:00:00.000Z',
                _firstname: 'Jane',
                _surname: 'Doe',
                _email: 'jane@example.com',
                _phonenumber: '987654321',
                _state: 'Victoria',
                _streetaddress: '456 Example St',
                _apartment: '7B',
                _suburb: 'Melbourne',
                _postcode: '3000',
                _programname: 'Program A',
                _feedback: 'Great program!',
            });
        });
    });

    describe('get', () => {
        it('should retrieve feedback inquiry by id', async () => {
            const inquiryId = 1;

            await repository.get(inquiryId);

            expect(mockClient.from).toHaveBeenCalledWith('feedbackinquiry');
            expect(mockSelect).toHaveBeenCalledWith(`
                *,
                inquiry (
                  *,
                  person (
                    *,
                    address (
                        *
                    )
                  )
                )
              `);
            expect(mockEq).toHaveBeenCalledWith('inquiryid', inquiryId);
        });
    });

    describe('getAll', () => {
        it('should retrieve all feedback inquiries', async () => {
            await repository.getAll();

            expect(mockClient.from).toHaveBeenCalledWith('feedbackinquiry');
            expect(mockSelect).toHaveBeenCalledWith(`
                *,
                inquiry (
                  *,
                  person (
                    *,
                    address (
                        *
                    )
                  )
                )
              `);
        });
    });
});
