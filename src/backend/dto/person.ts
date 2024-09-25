export class PersonDTO {
    personId?: number;
    firstName: string;
    surname: string;
    email: string;
    homeNumber?: string;
    phoneNumber?: string;
    occupation?: string;
    address?: AddressDTO;

    constructor(data: {
        personId: number,
        firstName: string,
        surname: string,
        email: string,
        homeNumber?: string,
        phoneNumber?: string,
        occupation?: string,
        address?: AddressDTO
    }) {
        this.personId = data.personId;
        this.firstName = data.firstName;
        this.surname = data.surname;
        this.email = data.email;
        this.homeNumber = data.homeNumber;
        this.phoneNumber = data.phoneNumber;
        this.occupation = data.occupation;
        this.address = data.address;
    }
}

export class AddressDTO {
    state: string;
    streetAddress: string;
    apartment?: string;
    suburb: string;
    postcode: string;

    constructor(data: {
        state: string,
        streetAddress: string,
        apartment?: string,
        suburb: string,
        postcode: string
    }) {
        this.state = data.state;
        this.streetAddress = data.streetAddress;
        this.apartment = data.apartment;
        this.suburb = data.suburb;
        this.postcode = data.postcode;
    }

    public toString(): string {
        return `${this.streetAddress}${this.apartment ? ', ' + this.apartment : ''}, ${this.suburb}, ${this.state} ${this.postcode}`;
    }
}