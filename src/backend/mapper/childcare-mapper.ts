import Mapper from "./mapper";
import { ChildDTO } from "../dto/childcare/child";
import { ChildcareProgramDTO } from "../dto/childcare/childcareprogram";
import { ChildcareSessionDTO } from "../dto/childcare/childcaresession";

// Types for Child, ChildcareProgram, and ChildcareSession

export type Child = {
    childid: number;
    childage: number;
    childfirstname: string;
    childsurname: string;
};

export type ChildcareProgram = {
    childcareprogramid: number;
    childcaresessionid?: number;
    programname: string;
};

export type ChildcareSession = {
    childcaresessionid: number;
    day: string;
    starttime: string;
    endtime: string;
};

// Child Mapper
export class ChildMapper implements Mapper<Child, ChildDTO> {
    public mapTo(child: Child): ChildDTO {
        return new ChildDTO({
            childId: child.childid,
            childAge: child.childage,
            childFirstName: child.childfirstname,
            childSurname: child.childsurname,
        });
    }
}

// Childcare Program Mapper
export class ChildcareProgramMapper implements Mapper<ChildcareProgram, ChildcareProgramDTO> {
    public mapTo(program: ChildcareProgram): ChildcareProgramDTO {
        return new ChildcareProgramDTO({
            childcareProgramId: program.childcareprogramid,
            childcareSessionId: program.childcaresessionid,
            programName: program.programname,
        });
    }
}

// Childcare Session Mapper
export class ChildcareSessionMapper implements Mapper<ChildcareSession, ChildcareSessionDTO> {
    public mapTo(session: ChildcareSession): ChildcareSessionDTO {
        return new ChildcareSessionDTO({
            childcareSessionId: session.childcaresessionid,
            day: session.day,
            startTime: session.starttime,
            endTime: session.endtime,
        });
    }
}
