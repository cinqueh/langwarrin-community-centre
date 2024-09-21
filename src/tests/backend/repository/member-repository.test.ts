import MemberRepository from '../../../backend/repository/member-repository';
import { MemberDTO } from '../../../backend/dto/member';

jest.mock('../../../backend/repository/base-repository');

const mockRpc = jest.fn();
const mockSelect = jest.fn();
const mockEq = jest.fn();

const mockClient = {
    rpc: mockRpc,
    from: jest.fn().mockImplementation(() => ({
        select: mockSelect,
        eq: mockEq,
    })),
};
describe('MemberRepository', () => {
    let repository: MemberRepository;

    beforeEach(() => {
        repository = new MemberRepository();
        // Use type assertion to specify the method
        jest.spyOn(repository as any, 'getSupabaseClient').mockReturnValue(mockClient);
    });

    afterEach(() => {
        jest.clearAllMocks();
    });

    describe('addMember', () => {
        it('should call add_full_member RPC with correct parameters', async () => {
            const member: MemberDTO = {
                person: {
                    personId: 1,
                    address: {
                        state: 'State',
                        streetAddress: '123 Main St',
                        apartment: '4B',
                        suburb: 'Suburb',
                        postcode: '12345',
                    },
                    firstName: 'John',
                    surname: 'Doe',
                    email: 'john@example.com',
                    homeNumber: '123456789',
                    phoneNumber: '987654321',
                    occupation: 'Engineer',
                },
                title: 'Mr.',
                memberId: 1,
                submitDate: new Date('2023-09-19'),
            };

            await repository.addMember(member);

            expect(mockRpc).toHaveBeenCalledWith('add_full_member', {
                _state: 'State',
                _streetaddress: '123 Main St',
                _apartment: '4B',
                _suburb: 'Suburb',
                _postcode: '12345',
                _firstname: 'John',
                _surname: 'Doe',
                _email: 'john@example.com',
                _homenumber: '123456789',
                _phonenumber: '987654321',
                _occupation: 'Engineer',
                _title: 'Mr.',
                _submitdate: '2023-09-19T00:00:00.000Z',
            });
        });
    });

    describe('getAllMembers', () => {
        it('should call select to retrieve all members', async () => {
            await repository.getAll();

            expect(mockClient.from).toHaveBeenCalledWith('member');
            expect(mockSelect).toHaveBeenCalledWith(`
                *,
                person (
                  *,
                  address (
                    *
                  )
                )
              `);
        });
    });
});