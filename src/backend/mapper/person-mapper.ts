import { AddressDTO, PersonDTO } from "../dto/person";
import Mapper from "./mapper";

export type Address = {
    addressid: number;
    state: string;
    streetaddress: string;
    apartment?: string;
    suburb: string;
    postcode: string;
};

export type Person = {
    personid: number;
    firstname: string;
    surname: string;
    email: string;
    homenumber?: string;
    phonenumber?: string;
    occupation?: string;
    address?: Address;
};

export class AddressMapper implements Mapper<Address, AddressDTO> {

    public mapTo(address: Address): AddressDTO {
        return new AddressDTO({
            state: address.state,
            streetAddress: address.streetaddress,
            apartment: address.apartment,
            suburb: address.suburb,
            postcode: address.postcode
        });
    }
}

export class PersonMapper implements Mapper<Person, PersonDTO> {

    public mapTo(person: Person): PersonDTO {

        let address = undefined;
        if (person.address) {
            const addressMapper = new AddressMapper();
            address = addressMapper.mapTo(person.address);
        }

        return new PersonDTO({
            personId: person.personid,
            firstName: person.firstname,
            surname: person.surname,
            email: person.email,
            homeNumber: person.homenumber,
            phoneNumber: person.phonenumber,
            occupation: person.occupation,
            address: address
        });
    }
}