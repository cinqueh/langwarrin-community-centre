import { RoomBookingEnquiryDTO } from "../dto/inquiry";
import BaseRepository from "./base-repository";

export default class RoomBookingInquiryRepository extends BaseRepository {

    // Add a new room booking inquiry
    public async addRoomBookingInquiry(inquiry: RoomBookingEnquiryDTO) {
        const client = this.getSupabaseClient();

        const addInquiryData = {
            _date: inquiry?.date?.toISOString(), // Inquiry submission date
            _firstname: inquiry?.person?.firstName,
            _surname: inquiry?.person?.surname,
            _email: inquiry?.person?.email,
            _phonenumber: inquiry?.person?.phoneNumber,
            _state: inquiry?.person?.address?.state,
            _suburb: inquiry?.person?.address?.suburb,
            _streetaddress: inquiry?.person?.address?.streetAddress, // Full address field
            _postcode: inquiry?.person?.address?.postcode,
            _roomname: inquiry.roomName,
            _hiretype: inquiry.hireType,
            _bookingdate: inquiry.bookingDate,
            _bookingstarttime: inquiry.bookingStartTime,
            _bookingendtime: inquiry.bookingEndTime,
            _purposeofhire: inquiry.purposeOfHire,
            _isorganisationbooking: inquiry.isOrganisationBooking,
            _organisationname: inquiry.organisationName,
            _organisationaddress: inquiry.organisationAddress,
            _othercompaniesinvolved: inquiry.otherCompaniesInvolved,
            _companydetails: inquiry.companyDetails,
            _numberattending: inquiry.numberAttending,
            _howdidyouhear: inquiry.howDidYouHear,
            _specialrequirements: inquiry.specialRequirements,
            _willliquorbeconsumed: inquiry.willLiquorBeConsumed
        };

        return await client.rpc('add_room_booking_inquiry', addInquiryData);
    }

    // Get a specific room booking inquiry by ID
    public override async get(id: number) {
        const client = this.getSupabaseClient();

        return await client
            .from('roombookinginquiry')
            .select(`
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
              `)
            .eq('inquiryid', id);
    }

    // Get all room booking inquiries
    public async getAll() {
        const client = this.getSupabaseClient();

        return await client
            .from('roombookinginquiry')
            .select(`
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
    }
}
