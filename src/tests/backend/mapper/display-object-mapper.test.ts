import { MemberDisplayObjectMapper } from '../../../backend/mapper/display-object-mapper';
import { MemberDTO } from '../../../backend/dto/member';
import { PersonDTO, AddressDTO } from '../../../backend/dto/person';

describe('MemberDisplayObjectMapper', () => {
  let mapper: MemberDisplayObjectMapper;

  beforeEach(() => {
    mapper = new MemberDisplayObjectMapper();
  });

  it('should map MemberDTO to MemberDisplayObject correctly', () => {
    // Creating AddressDTO instance
    const address = new AddressDTO({
      state: 'NY',
      streetAddress: '123 Street',
      apartment: '1A',
      suburb: 'Brooklyn',
      postcode: '11201',
    });

    // Creating PersonDTO instance
    const person = new PersonDTO({
      personId: 1,
      firstName: 'John',
      surname: 'Doe',
      email: 'john.doe@example.com',
      address: address,
      phoneNumber: '123-456-7890',
      homeNumber: '987-654-3210',
      occupation: 'Engineer',
    });

    // Creating MemberDTO instance
    const member = new MemberDTO({
      memberId: 1,
      title: 'Mr.',
      submitDate: new Date('2021-01-01'),
      approved: new Date('2021-02-01'),
      person: person,
    });

    const result = mapper['mapDisplayObject'](member);

    expect(result).toEqual({
      id: 1,
      header: 'John Doe',
      name: 'Mr. John Doe',
      email: 'john.doe@example.com',
      address: '123 Street, 1A, Brooklyn, NY 11201',
      phoneNumber: '123-456-7890',
      homeNumber: '987-654-3210',
      occupation: 'Engineer',
      approved: 'Yes',
    });
  });

  it('should return the correct columns for MemberDisplayObject', () => {
    const columns = mapper['getColumns']();

    expect(columns).toEqual([
      { Header: 'ID', accessor: 'id' },
      { Header: 'Name', accessor: 'name' },
      { Header: 'Email', accessor: 'email' },
      { Header: 'Address', accessor: 'address' },
      { Header: 'Mobile Number', accessor: 'phoneNumber' },
      { Header: 'Home Number', accessor: 'homeNumber' },
      { Header: 'Previous/Current Occupation', accessor: 'occupation' },
      { Header: 'Approved/Paid', accessor: 'approved' },
    ]);
  });

  it('should map a single MemberDTO to DisplayData correctly', () => {
    const address = new AddressDTO({
      state: 'NY',
      streetAddress: '123 Street',
      apartment: '1A',
      suburb: 'Brooklyn',
      postcode: '11201',
    });

    const person = new PersonDTO({
      personId: 1,
      firstName: 'John',
      surname: 'Doe',
      email: 'john.doe@example.com',
      address: address,
      phoneNumber: '123-456-7890',
      homeNumber: '987-654-3210',
      occupation: 'Engineer',
    });

    const member = new MemberDTO({
      memberId: 1,
      title: 'Mr.',
      submitDate: new Date('2021-01-01'),
      approved: new Date('2021-02-01'),
      person: person,
    });

    const displayData = mapper.mapTo(member);

    expect(displayData).toEqual({
      object: {
        id: 1,
        header: 'John Doe',
        name: 'Mr. John Doe',
        email: 'john.doe@example.com',
        address: '123 Street, 1A, Brooklyn, NY 11201',
        phoneNumber: '123-456-7890',
        homeNumber: '987-654-3210',
        occupation: 'Engineer',
        approved: 'Yes',
      },
      columns: [
        { Header: 'ID', accessor: 'id' },
        { Header: 'Name', accessor: 'name' },
        { Header: 'Email', accessor: 'email' },
        { Header: 'Address', accessor: 'address' },
        { Header: 'Mobile Number', accessor: 'phoneNumber' },
        { Header: 'Home Number', accessor: 'homeNumber' },
        { Header: 'Previous/Current Occupation', accessor: 'occupation' },
        { Header: 'Approved/Paid', accessor: 'approved' },
      ],
    });
  });

  it('should map multiple MemberDTOs to DisplayDataMany correctly', () => {
    const address1 = new AddressDTO({
      state: 'NY',
      streetAddress: '123 Street',
      apartment: '1A',
      suburb: 'Brooklyn',
      postcode: '11201',
    });

    const address2 = new AddressDTO({
      state: 'CA',
      streetAddress: '456 Avenue',
      suburb: 'San Francisco',
      postcode: '94103',
    });

    const person1 = new PersonDTO({
      personId: 1,
      firstName: 'John',
      surname: 'Doe',
      email: 'john.doe@example.com',
      address: address1,
      phoneNumber: '123-456-7890',
      homeNumber: '987-654-3210',
      occupation: 'Engineer',
    });

    const person2 = new PersonDTO({
      personId: 2,
      firstName: 'Jane',
      surname: 'Smith',
      email: 'jane.smith@example.com',
      address: address2,
      phoneNumber: '321-654-0987',
      homeNumber: '654-987-0123',
      occupation: 'Doctor',
    });

    const member1 = new MemberDTO({
      memberId: 1,
      title: 'Mr.',
      submitDate: new Date('2021-01-01'),
      approved: new Date('2021-02-01'),
      person: person1,
    });

    const member2 = new MemberDTO({
      memberId: 2,
      title: 'Ms.',
      submitDate: new Date('2021-03-01'),
      approved: undefined,
      person: person2,
    });

    const displayDataMany = mapper.mapToMany([member1, member2]);

    expect(displayDataMany).toEqual({
      objects: [
        {
          id: 1,
          header: 'John Doe',
          name: 'Mr. John Doe',
          email: 'john.doe@example.com',
          address: '123 Street, 1A, Brooklyn, NY 11201',
          phoneNumber: '123-456-7890',
          homeNumber: '987-654-3210',
          occupation: 'Engineer',
          approved: 'Yes',
        },
        {
          id: 2,
          header: 'Jane Smith',
          name: 'Ms. Jane Smith',
          email: 'jane.smith@example.com',
          address: '456 Avenue, San Francisco, CA 94103',
          phoneNumber: '321-654-0987',
          homeNumber: '654-987-0123',
          occupation: 'Doctor',
          approved: 'No',
        },
      ],
      columns: [
        { Header: 'ID', accessor: 'id' },
        { Header: 'Name', accessor: 'name' },
        { Header: 'Email', accessor: 'email' },
        { Header: 'Address', accessor: 'address' },
        { Header: 'Mobile Number', accessor: 'phoneNumber' },
        { Header: 'Home Number', accessor: 'homeNumber' },
        { Header: 'Previous/Current Occupation', accessor: 'occupation' },
        { Header: 'Approved/Paid', accessor: 'approved' },
      ],
    });
  });
});
