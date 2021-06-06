export class Participation {

  id: number;
  athleteId: number;
  competitionId: number;
  rank: number;

  athleteName: string;
  competitionName: string;

  constructor(id: number, competitionId: number, athleteId: number, rank: number) {
    this.id = id;
    this.competitionId = competitionId;
    this.athleteId = athleteId;
    this.rank = rank;
  }

}
