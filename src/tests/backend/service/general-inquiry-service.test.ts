import GeneralInquiryService from "../../../backend/service/general-inquiry-service";
import GeneralInquiryRepository from "../../../backend/repository/general-inquiry-repository";
import GeneralInquiryMapper from "../../../backend/mapper/inquiry-mapper";
import { PostgrestSingleResponse } from "@supabase/supabase-js";
import { GeneralInquiryDTO } from "../../../backend/dto/inquiry";
import { DatabaseError, DataValidationError } from "../../../backend/util/errors";

// Mock the GeneralInquiryRepository and GeneralInquiryMapper
jest.mock("../../../backend/repository/general-inquiry-repository");
jest.mock("../../../backend/mapper/inquiry-mapper");

describe('GeneralInquiryService', () => {
    let generalInquiryService: GeneralInquiryService;
    let generalInquiryRepositoryMock: jest.Mocked<GeneralInquiryRepository>;
    let generalInquiryMapperMock: jest.Mocked<GeneralInquiryMapper>;
    let consoleErrorMock: jest.SpyInstance;

    beforeEach(() => {
        // Mock console.error to avoid cluttering the output
        consoleErrorMock = jest.spyOn(console, 'error').mockImplementation(() => {});

        // Create mocked instances of the dependencies
        generalInquiryRepositoryMock = new (GeneralInquiryRepository as unknown as jest.Mock)() as jest.Mocked<GeneralInquiryRepository>;
        generalInquiryMapperMock = new (GeneralInquiryMapper as jest.Mock)() as jest.Mocked<GeneralInquiryMapper>;

        // Create a new instance of GeneralInquiryService with mocked repository and mapper
        generalInquiryService = new GeneralInquiryService();
        generalInquiryService['repository'] = generalInquiryRepositoryMock;  // Inject mocked repository
        generalInquiryService['mapper'] = generalInquiryMapperMock;          // Inject mocked mapper
    });

    afterEach(() => {
        // Restore the original console.error after each test
        consoleErrorMock.mockRestore();
    });

    describe('newGeneralInquiry', () => {
        it('should call repository.addGeneralInquiry and return data on success', async () => {
            const generalInquiryDTO: GeneralInquiryDTO = {
                message: "Test inquiry message",
                date: new Date(),
                person: {
                    personId: 1,
                    firstName: "John",
                    surname: "Doe",
                    email: "john@example.com",
                    phoneNumber: "123456789",
                }
            };

            const response: PostgrestSingleResponse<GeneralInquiryDTO> = {
                data: generalInquiryDTO,
                error: null,
                status: 201,
                statusText: "Created",
                count: null // Ensure count is provided
            };

            generalInquiryRepositoryMock.addGeneralInquiry.mockResolvedValue(response);

            const result = await generalInquiryService.newGeneralInquiry(generalInquiryDTO);

            expect(generalInquiryRepositoryMock.addGeneralInquiry).toHaveBeenCalledWith(generalInquiryDTO);
            expect(result).toEqual(generalInquiryDTO);
        });

        it('should throw a DataValidationError if person.phoneNumber is missing', async () => {
            const invalidGeneralInquiryDTO: GeneralInquiryDTO = {
                message: "Test inquiry message",
                date: new Date(),
                person: {
                    personId: 1,
                    firstName: "John",
                    surname: "Doe",
                    email: "john@example.com",
                    phoneNumber: "" // Empty phoneNumber should trigger validation error
                }
            };

            await expect(generalInquiryService.newGeneralInquiry(invalidGeneralInquiryDTO)).rejects.toThrow(DataValidationError);
        });

        it('should throw a DatabaseError on failure', async () => {
            const generalInquiryDTO: GeneralInquiryDTO = {
                message: "Test inquiry message",
                date: new Date(),
                person: {
                    personId: 1,
                    firstName: "John",
                    surname: "Doe",
                    email: "john@example.com",
                    phoneNumber: "123456789",
                }
            };

            const response: PostgrestSingleResponse<GeneralInquiryDTO> = {
                data: null,
                error: { message: "Database error", details: "", hint: "", code: "" },
                status: 400,
                statusText: "Bad Request",
                count: null // Ensure count is provided
            };

            generalInquiryRepositoryMock.addGeneralInquiry.mockResolvedValue(response);

            await expect(generalInquiryService.newGeneralInquiry(generalInquiryDTO)).rejects.toThrow(DatabaseError);
            expect(generalInquiryRepositoryMock.addGeneralInquiry).toHaveBeenCalledWith(generalInquiryDTO);
        });
    });
});
