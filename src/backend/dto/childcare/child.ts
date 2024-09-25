export class ChildDTO {
    childId?: number;
    childAge: number;
    childFirstName: string;
    childSurname: string;

    constructor(data: {
        childId?: number;
        childAge: number;
        childFirstName: string;
        childSurname: string;
    }) {
        this.childId = data.childId;
        this.childAge = data.childAge;
        this.childFirstName = data.childFirstName;
        this.childSurname = data.childSurname;
    }
}
