import { Column } from "react-table";
import { MemberDTO } from "./member";
import { Member } from "../mapper/member-mapper";

export type ColumnAdapter<T extends object> = Column<T>

// for displaying a single entity
export type DisplayData<T extends DisplayObject> = {
    object: T;
    columns: ColumnAdapter<T>[];
}

// for displaying a list of entities
export type DisplayDataMany<T extends DisplayObject> = {
    objects: T[];
    columns: ColumnAdapter<T>[];
}

export type DisplayObject = {
    id: number;
    header: string;
    name: string;
    email: string;
}

export type MemberDisplayObject = DisplayObject & {
    address: string;
    phoneNumber: string;
    homeNumber: string;
    occupation: string;
    approved: string;
}

export type InquiryDisplayObject = DisplayObject & {
    date: string;
    phoneNumber: string;
    notes?: string;
}

export type GeneralInquiryDisplayObject = InquiryDisplayObject & {
    message: string;
}

export type FeedbackInquiryDisplayObject = InquiryDisplayObject & {
    address: string;
    programName: string;
    feedback: string;
}

export type ComplaintInquiryDisplayObject = InquiryDisplayObject & {
    programName: string;
    grievanceReason: string;
    suggestedSolution: string;
}

// Extend the base DisplayObject for common fields like id, header, name, email
export type RoomBookingDisplayObject = DisplayObject & {
    bookingDate: string;
    bookingStartTime: string;
    bookingEndTime: string;
    roomName: string;
    hireType: string;
    purposeOfHire: string;
    isOrganisationBooking: string; // Display as 'Yes' or 'No'
    organisationName?: string;
    organisationAddress?: string;
    otherCompaniesInvolved?: string; // Display as 'Yes' or 'No'
    companyDetails?: string;
    numberAttending: string;
    howDidYouHear: string;
    specialRequirements?: string;
    willLiquorBeConsumed: string; // Display as 'Yes' or 'No'
    notes?: string;
}