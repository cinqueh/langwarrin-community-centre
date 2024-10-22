import { RoomBookingEnquiryDTO } from "../dto/inquiry";
import { RoomBookingEnquiry, RoomBookingEnquiryMapper } from "../mapper/inquiry-mapper";  // Import your RoomBookingEnquiryMapper
import RoomBookingInquiryRepository from "../repository/room-booking-inquiry-repository";  // Import your repository
import DatabaseService from "./database-service";

export default class RoomBookingInquiryService extends DatabaseService<RoomBookingInquiryRepository, RoomBookingEnquiry, RoomBookingEnquiryDTO> {

    constructor() {
        super(new RoomBookingInquiryRepository(), new RoomBookingEnquiryMapper());
    }

    // Method to create a new Room Booking Inquiry
    public async newRoomBookingInquiry(inquiry: RoomBookingEnquiryDTO) {
        // Set the inquiry submission date
        inquiry.date = new Date();

        // Validate the incoming inquiry (you can adjust the validation as needed)
        this.validateData(inquiry, (data) => Boolean(data.person?.phoneNumber) && Boolean(data.roomName));

        // Call the repository to add the inquiry
        const response = await this.repository.addRoomBookingInquiry(inquiry);

        // Handle the response from the repository
        return this.handleResponse(response, (data) => data);
    }
}
