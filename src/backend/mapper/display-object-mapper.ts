import { ColumnAdapter, ComplaintInquiryDisplayObject, DisplayData, DisplayDataMany, 
    DisplayObject, FeedbackInquiryDisplayObject, GeneralInquiryDisplayObject, MemberDisplayObject, ProgramCourseInquiryDisplayObject, ChildcareInquiryDisplayObject } from "../dto/display-object";
import { ComplaintInquiryDTO, FeedbackInquiryDTO, GeneralInquiryDTO, ProgramCourseInquiryDTO, ChildcareInquiryDTO} from "../dto/inquiry";
import { ChildDTO} from "../dto/childcare/child";
import { MemberDTO } from "../dto/member";
import { AddressDTO, PersonDTO } from "../dto/person";
import Mapper from "./mapper";


abstract class DisplayDataMapper<S, T extends DisplayObject> implements Mapper<S, DisplayData<T>> {
    protected formatName(person: PersonDTO | undefined): string {
        return `${person?.firstName ?? ''} ${person?.surname ?? ''}`;
    }
    protected formatAddress(address: AddressDTO | undefined): string {
        return address?.toString() ?? '';
    }
    protected formatDate(date: Date | undefined): string {
        return date?.toLocaleString('en-AU', {
            day: '2-digit',
            month: '2-digit',
            year: 'numeric',
            hour: '2-digit',
            minute: '2-digit',
            hour12: true,
          }) ?? ''
    }
    protected formatField(field: any): string {
        return field ?? '';
    }

    protected abstract mapDisplayObject(dto: S): T;
    protected abstract getColumns(): ColumnAdapter<T>[];

    public mapTo(dto: S): DisplayData<T> {
        return {
            object: this.mapDisplayObject(dto),
            columns: this.getColumns(),
        }
    }
    public mapToMany(dtos: S[]): DisplayDataMany<T> {
        return {
            objects: dtos.map(dto => this.mapDisplayObject(dto)),
            columns: this.getColumns(),
        }
    }
}

export class MemberDisplayObjectMapper extends DisplayDataMapper<MemberDTO, MemberDisplayObject> {
    protected override mapDisplayObject(member: MemberDTO): MemberDisplayObject {
        return {
            id: member.memberId,
            header: this.formatName(member?.person),
            name: this.formatField(member?.title) + " " + this.formatName(member?.person),
            email: this.formatField(member?.person?.email),
            address: this.formatAddress(member?.person?.address),
            phoneNumber: this.formatField(member?.person?.phoneNumber),
            homeNumber: this.formatField(member?.person?.homeNumber),
            occupation: this.formatField(member?.person?.occupation),
            approved: member.approved ? 'Yes' : 'No'
        }
    }

    protected override getColumns(): ColumnAdapter<MemberDisplayObject>[] {
        return [
            {
              Header: 'ID',
              accessor: 'id',
            },
            {
              Header: 'Name',
              accessor: 'name',
            },
            {
              Header: 'Email',
              accessor: 'email',
            },
            {
              Header: 'Address',
              accessor: 'address',
            },
            {
              Header: 'Mobile Number',
              accessor: 'phoneNumber',
            },
            {
              Header: 'Home Number',
              accessor: 'homeNumber',
            },
            {
              Header: 'Previous/Current Occupation',
              accessor: 'occupation',
            },
            {
              Header: 'Approved/Paid',
              accessor: 'approved',
            }
        ];
    }
}

export class GeneralInquiryDisplayObjectMapper extends DisplayDataMapper<GeneralInquiryDTO, 
    GeneralInquiryDisplayObject> {
    protected override mapDisplayObject(complaint: GeneralInquiryDTO): GeneralInquiryDisplayObject {
        return {
            id: complaint.inquiryId as number,
            header: this.formatName(complaint?.person),
            name: this.formatName(complaint?.person),
            email: this.formatField(complaint?.person?.email),
            date: this.formatDate(complaint?.date),
            phoneNumber: this.formatField(complaint?.person?.phoneNumber),
            message: this.formatField(complaint?.message),
            notes: this.formatField(complaint?.notes)
        }
    }

    protected override getColumns(): ColumnAdapter<GeneralInquiryDisplayObject>[] {
        return [
            {
                Header: 'ID',
                accessor: 'id',
            },
            {
                Header: 'Name',
                accessor: 'name',
            },
            {
                Header: 'Email',
                accessor: 'email',
            },
            {
                Header: 'Enquiry Date',
                accessor: 'date',
            },
            {
                Header: 'Mobile Number',
                accessor: 'phoneNumber',
            },
            {
                Header: 'Message',
                accessor: 'message'
            },
            {
                Header: 'Notes',
                accessor: 'notes',
            }
        ];
    }
}

export class FeedbackInquiryDisplayObjectMapper extends DisplayDataMapper<FeedbackInquiryDTO, 
    FeedbackInquiryDisplayObject> {
    protected override mapDisplayObject(complaint: FeedbackInquiryDTO): FeedbackInquiryDisplayObject {
        return {
            id: complaint.inquiryId as number,
            header: this.formatName(complaint?.person),
            name: this.formatName(complaint?.person),
            email: this.formatField(complaint?.person?.email),
            date: this.formatDate(complaint?.date),
            phoneNumber: this.formatField(complaint?.person?.phoneNumber),
            notes: this.formatField(complaint?.notes),
            address: this.formatAddress(complaint?.person?.address),
            programName: this.formatField(complaint?.programName),
            feedback: this.formatField(complaint?.feedback),
        }
    }

    protected override getColumns(): ColumnAdapter<FeedbackInquiryDisplayObject>[] {
        return [
            {
                Header: 'ID',
                accessor: 'id',
            },
            {
                Header: 'Name',
                accessor: 'name',
            },
            {
                Header: 'Address',
                accessor: 'address'
            },
            {
                Header: 'Email',
                accessor: 'email',
            },
            {
                Header: 'Enquiry Date',
                accessor: 'date',
            },
            {
                Header: 'Mobile Number',
                accessor: 'phoneNumber',
            },
            {
                Header: 'Notes',
                accessor: 'notes',
            },
            {
                Header: 'Program Name',
                accessor: 'programName'
            },
            {
                Header: 'Feedback',
                accessor: 'feedback'
            }
        ];
    }
}

export class ComplaintInquiryObjectMapper extends DisplayDataMapper<ComplaintInquiryDTO, 
    ComplaintInquiryDisplayObject> {
    protected override mapDisplayObject(complaint: ComplaintInquiryDTO): ComplaintInquiryDisplayObject {
        return {
            id: complaint.inquiryId as number,
            header: this.formatName(complaint?.person),
            name: this.formatName(complaint?.person),
            email: this.formatField(complaint?.person?.email),
            date: this.formatDate(complaint?.date),
            phoneNumber: this.formatField(complaint?.person?.phoneNumber),
            notes: this.formatField(complaint?.notes),
            programName: this.formatField(complaint?.programName),
            grievanceReason: this.formatField(complaint?.grievanceReason),
            suggestedSolution: this.formatField(complaint?.suggestedSolution)
        }
    }

    protected override getColumns(): ColumnAdapter<ComplaintInquiryDisplayObject>[] {
        return [
            {
                Header: 'ID',
                accessor: 'id',
            },
            {
                Header: 'Name',
                accessor: 'name',
            },
            {
                Header: 'Email',
                accessor: 'email',
            },
            {
                Header: 'Enquiry Date',
                accessor: 'date',
            },
            {
                Header: 'Mobile Number',
                accessor: 'phoneNumber',
            },
            {
                Header: 'Notes',
                accessor: 'notes',
            },
            {
                Header: 'Program Name',
                accessor: 'programName'
            },
            {
                Header: 'Grievance Reason',
                accessor: 'grievanceReason'
            },
            {
                Header: 'Suggested Solution',
                accessor: 'suggestedSolution'
            }
        ];
    }
}

// ProgramCourseInquiryDisplayObjectMapper for mapping ProgramCourseInquiryDTO to ProgramCourseInquiryDisplayObject
export class ProgramCourseInquiryDisplayObjectMapper extends DisplayDataMapper<ProgramCourseInquiryDTO, ProgramCourseInquiryDisplayObject> {
    protected override mapDisplayObject(inquiry: ProgramCourseInquiryDTO): ProgramCourseInquiryDisplayObject {
        return {
            id: inquiry.inquiryId ?? 0,
            header: this.formatName(inquiry?.person),
            name: this.formatField(inquiry?.person.firstName) + " " + this.formatField(inquiry?.person.surname),
            email: this.formatField(inquiry?.person?.email), // From base InquiryDisplayObject
            phoneNumber: this.formatField(inquiry?.person?.phoneNumber), // From base InquiryDisplayObject
            date: this.formatDate(inquiry?.date), // From base InquiryDisplayObject
            emergencyContactName: this.formatField(inquiry?.emergencyFirstName) + " " + this.formatField(inquiry?.emergencySurName),
            emergencyNumber: this.formatField(inquiry?.emergencyNumber),
            programName: this.formatField(inquiry?.programName),
            howHeardAboutProgram: this.formatField(inquiry?.howHeardAboutProgram),
            notes: this.formatField(inquiry?.notes),
        };
    }

    protected override getColumns(): ColumnAdapter<ProgramCourseInquiryDisplayObject>[] {
        return [
            {
                Header: 'ID',
                accessor: 'id',
            },
            {
                Header: 'Name',
                accessor: 'name',
            },
            {
                Header: 'Email',
                accessor: 'email',
            },
            {
                Header: 'Phone Number',
                accessor: 'phoneNumber',
            },
            {
                Header: 'Inquiry Date',
                accessor: 'date',
            },
            {
                Header: 'Emergency Contact Name',
                accessor: 'emergencyContactName',
            },
            {
                Header: 'Emergency Contact Number',
                accessor: 'emergencyNumber',
            },
            {
                Header: 'Program Name',
                accessor: 'programName',
            },
            {
                Header: 'How did you hear about the program?',
                accessor: 'howHeardAboutProgram',
            },
            {
                Header: 'Notes',
                accessor: 'notes',
            }
        ];
    }
}

export class ChildcareInquiryDisplayObjectMapper extends DisplayDataMapper<ChildcareInquiryDTO, ChildcareInquiryDisplayObject> {

    protected override mapDisplayObject(inquiry: ChildcareInquiryDTO): ChildcareInquiryDisplayObject {

        return {
            id: inquiry.inquiryId as number,                          // Inquiry ID
            header: this.formatName(inquiry?.person),                  // Person name (header)
            name: this.formatName(inquiry?.person),                    // Person full name
            email: this.formatField(inquiry?.person?.email),           // Person email
            phoneNumber: this.formatField(inquiry?.person?.phoneNumber), // Inherited from InquiryDisplayObject
            date: this.formatDate(inquiry?.date),                      // Inquiry date
            notes: this.formatField(inquiry.notes),                    // Optional notes inherited from InquiryDisplayObject
            childName: this.formatField(inquiry.child.childFirstName) + " " + this.formatField(inquiry.child.childSurname), // Child's full name
            childAge: inquiry.child?.childAge || 0,                    // Child's age
            day: this.formatField(inquiry.day),                        // Day of the program
            program: this.formatField(inquiry.program),                // Program name
        };
    }

    protected override getColumns(): ColumnAdapter<ChildcareInquiryDisplayObject>[] {
        return [
            {
              Header: 'ID',
              accessor: 'id',
            },
            {
              Header: 'Name',
              accessor: 'name',
            },
            {
              Header: 'Email',
              accessor: 'email',
            },
            {
              Header: 'Phone Number',
              accessor: 'phoneNumber',
            },
            {
              Header: 'Inquiry Date',
              accessor: 'date',
            },
            {
              Header: 'Child Name',
              accessor: 'childName',
            },
            {
              Header: 'Child Age',
              accessor: 'childAge',
            },
            {
              Header: 'Day',
              accessor: 'day',
            },
            {
              Header: 'Program Name',
              accessor: 'program',
            },
            {
              Header: 'Notes',
              accessor: 'notes',
            }
        ];
    }
}