import { ColumnAdapter, DisplayData, DisplayDataMany, 
    DisplayObject, MemberDisplayObject } from "../dto/display-object";
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