import GeneralInquiryRepository from '../../../backend/repository/general-inquiry-repository';
import { GeneralInquiryDTO } from '../../../backend/dto/inquiry';

jest.mock('../../../backend/repository/base-repository');

const mockRpc = jest.fn();
const mockSelect = jest.fn().mockReturnThis();  // Allow chaining with .select()
const mockEq = jest.fn().mockReturnThis();      // Allow chaining with .eq()

const mockClient = {
    rpc: mockRpc,
    from: jest.fn().mockImplementation(() => ({
        select: mockSelect,
        eq: mockEq,
    })),
};

describe('GeneralInquiryRepository', () => {
    let repository: GeneralInquiryRepository;

    beforeEach(() => {
        repository = new GeneralInquiryRepository();
        jest.spyOn(repository as any, 'getSupabaseClient').mockReturnValue(mockClient);
    });

    afterEach(() => {
        jest.clearAllMocks();
    });

    describe('addGeneralInquiry', () => {
        it('should call add_general_inquiry RPC with correct parameters', async () => {
            const inquiry: GeneralInquiryDTO = {
                date: new Date('2023-09-19'),
                person: {
                    personId: 10,
                    firstName: 'John',
                    surname: 'Doe',
                    email: 'john@example.com',
                    phoneNumber: '987654321',
                },
                message: 'This is a general inquiry.',
            };

            await repository.addGeneralInquiry(inquiry);

            expect(mockRpc).toHaveBeenCalledWith('add_general_inquiry', {
                _date: '2023-09-19T00:00:00.000Z',
                _firstname: 'John',
                _surname: 'Doe',
                _email: 'john@example.com',
                _phonenumber: '987654321',
                _message: 'This is a general inquiry.',
            });
        });
    });

    describe('get', () => {
        it('should retrieve general inquiry by id', async () => {
            const inquiryId = 1;

            await repository.get(inquiryId);

            expect(mockClient.from).toHaveBeenCalledWith('generalinquiry');
            expect(mockSelect).toHaveBeenCalledWith(`
                *,
                inquiry (
                  *,
                  person (
                    *
                  )
                )
              `);
            expect(mockEq).toHaveBeenCalledWith('inquiryid', inquiryId);
        });
    });

    describe('getAll', () => {
        it('should retrieve all general inquiries', async () => {
            await repository.getAll();

            expect(mockClient.from).toHaveBeenCalledWith('generalinquiry');
            expect(mockSelect).toHaveBeenCalledWith(`
                *,
                inquiry (
                  *,
                  person (
                    *
                  )
                )
              `);
        });
    });
});
