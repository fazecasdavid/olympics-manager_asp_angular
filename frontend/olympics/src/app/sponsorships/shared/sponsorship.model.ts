export class Sponsorship {

  id: number;
  competitionId: number;
  sponsorId: number;
  moneyContribution: number;

  competitionName: string;
  sponsorName: string;

  constructor(id: number, competitionId: number, sponsorId: number, moneyContribution: number) {
    this.id = id;
    this.competitionId = competitionId;
    this.sponsorId = sponsorId;
    this.moneyContribution = moneyContribution;
  }

}
