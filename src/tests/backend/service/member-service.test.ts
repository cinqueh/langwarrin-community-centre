import MemberService from "../../../backend/service/member-service";
import MemberRepository from "../../../backend/repository/member-repository";
import MemberMapper from "../../../backend/mapper/member-mapper";
import { PostgrestSingleResponse } from "@supabase/supabase-js";
import { MemberDTO } from "../../../backend/dto/member";
import { Member } from "../../../backend/mapper/member-mapper";

// Mock the MemberRepository and MemberMapper
jest.mock("../../../backend/repository/member-repository");
jest.mock("../../../backend/mapper/member-mapper");

describe('MemberService', () => {
    let memberService: MemberService;
    let memberRepositoryMock: jest.Mocked<MemberRepository>;
    let memberMapperMock: jest.Mocked<MemberMapper>;

    beforeEach(() => {
        // Create mocked instances of the dependencies
        memberRepositoryMock = new (MemberRepository as jest.Mock)() as jest.Mocked<MemberRepository>;
        memberMapperMock = new (MemberMapper as jest.Mock)() as jest.Mocked<MemberMapper>;

        // Override the constructor to return the mocked instances
        (MemberRepository as jest.Mock).mockImplementation(() => memberRepositoryMock);
        (MemberMapper as jest.Mock).mockImplementation(() => memberMapperMock);

        // Create a new instance of MemberService
        memberService = new MemberService();
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

            await expect(memberService.addMember(memberDTO)).rejects.toThrow("Database error");
            expect(memberRepositoryMock.addMember).toHaveBeenCalledWith(memberDTO);
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

            const result = await memberService.getMember(1);

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

            const result = await memberService.getMember(1);

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

            await expect(memberService.getMember(1)).rejects.toThrow("Database error");
        });
    });

    describe('getAllMembers', () => {
        it('should call repository.getAllMembers and return mapped members on success', async () => {
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

            memberRepositoryMock.getAllMembers.mockResolvedValue(response);

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

            const result = await memberService.getAllMembers();

            expect(memberRepositoryMock.getAllMembers).toHaveBeenCalled();
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

            memberRepositoryMock.getAllMembers.mockResolvedValue(response);

            await expect(memberService.getAllMembers()).rejects.toThrow("Database error");
        });
    });
});