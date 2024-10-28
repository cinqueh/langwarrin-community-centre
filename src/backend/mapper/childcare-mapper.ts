import Mapper from "./mapper";
import { ChildDTO } from "../dto/childcare/child";

// Types for Child, ChildcareProgram, and ChildcareSession

export type Child = {
    childid: number;
    childage: number;
    childfirstname: string;
    childsurname: string;
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

