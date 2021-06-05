export class Juror {

  id: number;
  firstName: string;
  lastName: string;
  country: string;
  age: number;

  constructor(id: number, firstName: string, lastName: string, country: string, age: number) {
    this.id = id;
    this.firstName = firstName;
    this.lastName = lastName;
    this.country = country;
    this.age = age;
  }

}
