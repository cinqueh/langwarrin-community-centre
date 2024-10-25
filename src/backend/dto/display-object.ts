import { Column } from "react-table";
import { MemberDTO } from "./member";
import { Member } from "../mapper/member-mapper";

export type ColumnAdapter<T extends object> = Column<T> & {
    editable?: boolean;
}

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
// New Program Course Inquiry Display Object
export type ProgramCourseInquiryDisplayObject = InquiryDisplayObject & {
    emergencyContactName: string; // Combined emergencyFirstName and emergencySurName
    emergencyNumber: string;
    programName: string;
    howHeardAboutProgram: string;
}

export type ChildcareInquiryDisplayObject = InquiryDisplayObject & {
    childName: string;       // Full name of the child
    childAge: number;        // Age of the child
    day: string;             // Day of the program
    program: string;         // Name of the program
};
 
