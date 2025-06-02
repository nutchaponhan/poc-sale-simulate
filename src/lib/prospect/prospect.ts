import { IProspect } from '../interface/prospect.interface';

export class Prospect {
  constructor(private data: IProspect) {
    return this.set(data);
  }

  private set(prospect: IProspect): Prospect {
    this.data = {
      gender: prospect.gender,
      birthDate: prospect.birthDate,
      codeocctouw: prospect.codeocctouw,
      occupationBusiness: prospect.occupationBusiness,
      occgroup: prospect.occgroup,
      occupationType: prospect.occupationType,
    };
    return this;
  }

  get gender(): string {
    return this.data.gender;
  }

  get birthDate(): string {
    return this.data.birthDate;
  }

  get codeocctouw(): string {
    return this.data.codeocctouw;
  }

  get occupationBusiness(): string {
    return this.data.occupationBusiness;
  }

  get occgroup(): number {
    return this.data.occgroup;
  }

  get occupationType(): string {
    return this.data.occupationType;
  }

  get age(): number {
    const today = new Date();
    const birthDate = new Date(this.data.birthDate);
    const age = today.getFullYear() - birthDate.getFullYear();
    return age;
  }
}
