import FeedbackInquiryService from "../../../backend/service/feedback-inquiry-service";
import FeedbackInquiryRepository from "../../../backend/repository/feedback-inquiry-repository";
import { FeedbackInquiryMapper } from "../../../backend/mapper/inquiry-mapper";
import { FeedbackInquiryDTO } from "../../../backend/dto/inquiry";
import { PostgrestSingleResponse } from "@supabase/supabase-js";
import { DatabaseError, DataValidationError } from "../../../backend/util/errors";

// Mock the FeedbackInquiryRepository and FeedbackInquiryMapper
jest.mock("../../../backend/repository/feedback-inquiry-repository");
jest.mock("../../../backend/mapper/inquiry-mapper");

describe('FeedbackInquiryService', () => {
    let feedbackInquiryService: FeedbackInquiryService;
    let feedbackInquiryRepositoryMock: jest.Mocked<FeedbackInquiryRepository>;
    let feedbackInquiryMapperMock: jest.Mocked<FeedbackInquiryMapper>;
    let consoleErrorMock: jest.SpyInstance;

    beforeEach(() => {
        // Mock console.error to avoid cluttering the output
        consoleErrorMock = jest.spyOn(console, 'error').mockImplementation(() => {});

        // Create mocked instances of the dependencies
        feedbackInquiryRepositoryMock = new (FeedbackInquiryRepository as unknown as jest.Mock)() as jest.Mocked<FeedbackInquiryRepository>;
        feedbackInquiryMapperMock = new (FeedbackInquiryMapper as jest.Mock)() as jest.Mocked<FeedbackInquiryMapper>;

        // Create a new instance of FeedbackInquiryService with mocked repository and mapper
        feedbackInquiryService = new FeedbackInquiryService();
        feedbackInquiryService['repository'] = feedbackInquiryRepositoryMock;  // Inject mocked repository
        feedbackInquiryService['mapper'] = feedbackInquiryMapperMock;          // Inject mocked mapper
    });

    afterEach(() => {
        // Restore the original console.error after each test
        consoleErrorMock.mockRestore();
    });

    describe('newFeedbackInquiry', () => {
        it('should call repository.addFeedbackInquiry and return data on success', async () => {
            const feedbackInquiryDTO: FeedbackInquiryDTO = {
                programName: "Program A",
                feedback: "Great feedback!",
                date: new Date(),
                person: {
                    firstName: "Jane",
                    surname: "Doe",
                    email: "jane@example.com",
                    phoneNumber: "123456789",
                    address: {
                        state: "Victoria",
                        streetAddress: "123 Example St",
                        apartment: "4B",
                        suburb: "Melbourne",
                        postcode: "3000",
                    }
                }
            };

            const response: PostgrestSingleResponse<FeedbackInquiryDTO> = {
                data: feedbackInquiryDTO,
                error: null,
                status: 201,
                statusText: "Created",
                count: null // Ensure count is provided
            };

            feedbackInquiryRepositoryMock.addFeedbackInquiry.mockResolvedValue(response);

            const result = await feedbackInquiryService.newFeedbackInquiry(feedbackInquiryDTO);

            expect(feedbackInquiryRepositoryMock.addFeedbackInquiry).toHaveBeenCalledWith(feedbackInquiryDTO);
            expect(result).toEqual(feedbackInquiryDTO);
        });

        it('should throw a DataValidationError if person.phoneNumber is missing', async () => {
            const invalidFeedbackInquiryDTO: FeedbackInquiryDTO = {
                programName: "Program A",
                feedback: "Great feedback!",
                date: new Date(),
                person: {
                    firstName: "Jane",
                    surname: "Doe",
                    email: "jane@example.com",
                    phoneNumber: "", // Empty phoneNumber should trigger validation error
                    address: {
                        state: "Victoria",
                        streetAddress: "123 Example St",
                        apartment: "4B",
                        suburb: "Melbourne",
                        postcode: "3000",
                    }
                }
            };

            await expect(feedbackInquiryService.newFeedbackInquiry(invalidFeedbackInquiryDTO)).rejects.toThrow(DataValidationError);
        });

        it('should throw a DatabaseError on failure', async () => {
            const feedbackInquiryDTO: FeedbackInquiryDTO = {
                programName: "Program A",
                feedback: "Great feedback!",
                date: new Date(),
                person: {
                    firstName: "Jane",
                    surname: "Doe",
                    email: "jane@example.com",
                    phoneNumber: "123456789",
                    address: {
                        state: "Victoria",
                        streetAddress: "123 Example St",
                        apartment: "4B",
                        suburb: "Melbourne",
                        postcode: "3000",
                    }
                }
            };

            const response: PostgrestSingleResponse<FeedbackInquiryDTO> = {
                data: null,
                error: { message: "Database error", details: "", hint: "", code: "" },
                status: 400,
                statusText: "Bad Request",
                count: null // Ensure count is provided
            };

            feedbackInquiryRepositoryMock.addFeedbackInquiry.mockResolvedValue(response);

            await expect(feedbackInquiryService.newFeedbackInquiry(feedbackInquiryDTO)).rejects.toThrow(DatabaseError);
            expect(feedbackInquiryRepositoryMock.addFeedbackInquiry).toHaveBeenCalledWith(feedbackInquiryDTO);
        });
    });
});
