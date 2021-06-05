export class Competition {

  id: number;
  date: Date;
  location: string;
  name: string;
  description: string;

  constructor(id: number, date: Date, location: string, name: string, description: string) {
    this.id = id;
    this.date = date;
    this.location = location;
    this.name = name;
    this.description = description;
  }

}
