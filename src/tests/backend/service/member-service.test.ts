import MemberService from "../../../backend/service/member-service";
import MemberRepository from "../../../backend/repository/member-repository";
import MemberMapper from "../../../backend/mapper/member-mapper";
import { PostgrestSingleResponse } from "@supabase/supabase-js";
import { MemberDTO } from "../../../backend/dto/member";
import { Member } from "../../../backend/mapper/member-mapper";
import { DatabaseError } from "../../../backend/util/errors";

// Mock the MemberRepository and MemberMapper
jest.mock("../../../backend/repository/member-repository");
jest.mock("../../../backend/mapper/member-mapper");

describe('MemberService', () => {
    let memberService: MemberService;
    let memberRepositoryMock: jest.Mocked<MemberRepository>;
    let memberMapperMock: jest.Mocked<MemberMapper>;
    let consoleErrorMock: jest.SpyInstance;

    beforeEach(() => {
        // Mock console.error
        consoleErrorMock = jest.spyOn(console, 'error').mockImplementation(() => {});

        // Create mocked instances of the dependencies
        memberRepositoryMock = new (MemberRepository as unknown as jest.Mock)() as jest.Mocked<MemberRepository>;
        memberMapperMock = new (MemberMapper as jest.Mock)() as jest.Mocked<MemberMapper>;

        // Create a new instance of MemberService with mocked repository and mapper
        memberService = new MemberService();
        memberService['repository'] = memberRepositoryMock;  // Inject mocked repository
        memberService['mapper'] = memberMapperMock;          // Inject mocked mapper
    });

    afterEach(() => {
        // Restore the original console.error after each test
        consoleErrorMock.mockRestore();
    });

    describe('addMember', () => {
        it('should call repository.addMember and return data on success', async () => {
            const memberDTO: MemberDTO = {
                memberId: 1,
                title: "Dr",
                submitDate: new Date(),
                person: {
                    personId: 1,
                    firstName: "John",
                    surname: "Doe",
                    email: "john@example.com",
                }
            };

            const response: PostgrestSingleResponse<MemberDTO> = {
                data: memberDTO,
                error: null,
                status: 201,
                statusText: "Created",
                count: null // Ensure count is provided
            };

            memberRepositoryMock.addMember.mockResolvedValue(response);

            const result = await memberService.addMember(memberDTO);

            expect(memberRepositoryMock.addMember).toHaveBeenCalledWith(memberDTO);
            expect(result).toEqual(memberDTO);
        });

        it('should throw a DatabaseError on failure', async () => {
            const memberDTO: MemberDTO = {
                memberId: 1,
                title: "Dr",
                submitDate: new Date(),
                person: {
                    personId: 1,
                    firstName: "John",
                    surname: "Doe",
                    email: "john@example.com",
                }
            };

            const response: PostgrestSingleResponse<MemberDTO> = {
                data: null,
                error: { message: "Database error", details: "", hint: "", code: "" },
                status: 400,
                statusText: "Bad Request",
                count: null // Ensure count is provided
            };

            memberRepositoryMock.addMember.mockResolvedValue(response);

            await expect(memberService.addMember(memberDTO)).rejects.toThrow(DatabaseError);
            expect(memberRepositoryMock.addMember).toHaveBeenCalledWith(memberDTO);
            expect(consoleErrorMock).toHaveBeenCalledWith(response.error); // Ensure the error was logged
        });
    });

    describe('getMember', () => {
        it('should call repository.get and return mapped member on success', async () => {
            const member: Member = {
                memberid: 1,
                title: "Dr",
                submitdate: "2023-09-01",
                personid: 100,
                person: {
                    personid: 100,
                    firstname: "John",
                    surname: "Doe",
                    email: "john@example.com",
                }
            };

            const response: PostgrestSingleResponse<Member[]> = {
                data: [member],
                error: null,
                status: 200,
                statusText: "OK",
                count: null // Ensure count is provided
            };

            memberRepositoryMock.get.mockResolvedValue(response);
            const mappedMemberDTO: MemberDTO = {
                memberId: 1,
                title: "Dr",
                submitDate: new Date("2023-09-01"),
                person: {
                    personId: 100,
                    firstName: "John",
                    surname: "Doe",
                    email: "john@example.com",
                }
            };

            memberMapperMock.mapTo.mockReturnValue(mappedMemberDTO);

            const result = await memberService.get(1);

            expect(memberRepositoryMock.get).toHaveBeenCalledWith(1);
            expect(memberMapperMock.mapTo).toHaveBeenCalledWith(member);
            expect(result).toEqual(mappedMemberDTO);
        });

        it('should return undefined if no member found', async () => {
            const response: PostgrestSingleResponse<Member[]> = {
                data: [],
                error: null,
                status: 200,
                statusText: "OK",
                count: null // Ensure count is provided
            };

            memberRepositoryMock.get.mockResolvedValue(response);

            const result = await memberService.get(1);

            expect(memberRepositoryMock.get).toHaveBeenCalledWith(1);
            expect(result).toBeUndefined();
        });

        it('should throw a DatabaseError on failure', async () => {
            const response: PostgrestSingleResponse<Member[]> = {
                data: null,
                error: { message: "Database error", details: "", hint: "", code: "" },
                status: 400,
                statusText: "Bad Request",
                count: null // Ensure count is provided
            };

            memberRepositoryMock.get.mockResolvedValue(response);

            await expect(memberService.get(1)).rejects.toThrow(DatabaseError);
        });
    });

    describe('getAll', () => {
        it('should call repository.getAll and return mapped members on success', async () => {
            const members: Member[] = [
                {
                    memberid: 1,
                    title: "Dr",
                    submitdate: "2023-09-01",
                    personid: 100,
                    person: {
                        personid: 100,
                        firstname: "John",
                        surname: "Doe",
                        email: "john@example.com",
                    }
                }
            ];

            const response: PostgrestSingleResponse<Member[]> = {
                data: members,
                error: null,
                status: 200,
                statusText: "OK",
                count: null // Ensure count is provided
            };

            memberRepositoryMock.getAll.mockResolvedValue(response);

            const mappedMemberDTO: MemberDTO = {
                memberId: 1,
                title: "Dr",
                submitDate: new Date("2023-09-01"),
                person: {
                    personId: 100,
                    firstName: "John",
                    surname: "Doe",
                    email: "john@example.com",
                }
            };

            memberMapperMock.mapTo.mockReturnValue(mappedMemberDTO);

            const result = await memberService.getAll();

            expect(memberRepositoryMock.getAll).toHaveBeenCalled();
            expect(memberMapperMock.mapTo).toHaveBeenCalledWith(members[0]);
            expect(result).toEqual([mappedMemberDTO]);
        });

        it('should throw a DatabaseError on failure', async () => {
            const response: PostgrestSingleResponse<Member[]> = {
                data: null,
                error: { message: "Database error", details: "", hint: "", code: "" },
                status: 400,
                statusText: "Bad Request",
                count: null // Ensure count is provided
            };

            memberRepositoryMock.getAll.mockResolvedValue(response);

            await expect(memberService.getAll()).rejects.toThrow(DatabaseError);
        });
    });
});
