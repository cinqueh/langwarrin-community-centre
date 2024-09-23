import { PersonMapper, AddressMapper } from "../../../backend/mapper/person-mapper";
import { AddressDTO, PersonDTO } from "../../../backend/dto/person";

describe('Person Mapper Tests', () => {
    const addressMapper = new AddressMapper();
    const personMapper = new PersonMapper();

    describe('AddressMapper', () => {
        it('should map Address to AddressDTO', () => {
            const address = {
                addressid: 1,
                state: "Victoria",
                streetaddress: "123 Fake St",
                apartment: "Apt 1",
                suburb: "Faketown",
                postcode: "3000",
            };

            const expectedAddressDTO: AddressDTO = {
                state: "Victoria",
                streetAddress: "123 Fake St",
                apartment: "Apt 1",
                suburb: "Faketown",
                postcode: "3000",
            };

            const result = addressMapper.mapTo(address);
            expect(result).toEqual(expectedAddressDTO);
        });

        it('should map Address without apartment to AddressDTO', () => {
            const address = {
                addressid: 1,
                state: "Victoria",
                streetaddress: "123 Fake St",
                suburb: "Faketown",
                postcode: "3000",
            };

            const expectedAddressDTO: AddressDTO = {
                state: "Victoria",
                streetAddress: "123 Fake St",
                apartment: undefined,
                suburb: "Faketown",
                postcode: "3000",
            };

            const result = addressMapper.mapTo(address);
            expect(result).toEqual(expectedAddressDTO);
        });
    });

    describe('PersonMapper', () => {
        it('should map Person to PersonDTO with address', () => {
            const person = {
                personid: 1,
                firstname: "John",
                surname: "Doe",
                email: "john.doe@example.com",
                homenumber: "123456789",
                phonenumber: "987654321",
                occupation: "Engineer",
                address: {
                    addressid: 1,
                    state: "Victoria",
                    streetaddress: "123 Fake St",
                    suburb: "Faketown",
                    postcode: "3000",
                }
            };

            const expectedAddressDTO: AddressDTO = {
                state: "Victoria",
                streetAddress: "123 Fake St",
                apartment: undefined,
                suburb: "Faketown",
                postcode: "3000",
            };

            const expectedPersonDTO: PersonDTO = {
                personId: 1,
                firstName: "John",
                surname: "Doe",
                email: "john.doe@example.com",
                homeNumber: "123456789",
                phoneNumber: "987654321",
                occupation: "Engineer",
                address: expectedAddressDTO
            };

            const result = personMapper.mapTo(person);
            expect(result).toEqual(expectedPersonDTO);
        });

        it('should map Person to PersonDTO without address', () => {
            const person = {
                personid: 1,
                firstname: "John",
                surname: "Doe",
                email: "john.doe@example.com",
                homenumber: "123456789",
                phonenumber: "987654321",
                occupation: "Engineer",
            };

            const expectedPersonDTO: PersonDTO = {
                personId: 1,
                firstName: "John",
                surname: "Doe",
                email: "john.doe@example.com",
                homeNumber: "123456789",
                phoneNumber: "987654321",
                occupation: "Engineer",
                address: undefined
            };

            const result = personMapper.mapTo(person);
            expect(result).toEqual(expectedPersonDTO);
        });
    });
});
