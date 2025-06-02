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
      paymentMode: prospect.paymentMode,
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

  get paymentMode(): number {
    return this.data.paymentMode;
  }

  get age(): number {
    const today = new Date();
    const birthDate = new Date(this.data.birthDate);

    let age = today.getFullYear() - birthDate.getFullYear();

    const hasBirthdayPassed =
      today.getMonth() > birthDate.getMonth() ||
      (today.getMonth() === birthDate.getMonth() &&
        today.getDate() >= birthDate.getDate());

    if (!hasBirthdayPassed) {
      age -= 1;
    }

    return age;
  }

  get insuranceAge(): number {
    const today = new Date();
    const birthDate = new Date(this.data.birthDate);

    // คำนวณอายุเต็มปี
    let age = today.getFullYear() - birthDate.getFullYear();

    const hasBirthdayPassed =
      today.getMonth() > birthDate.getMonth() ||
      (today.getMonth() === birthDate.getMonth() &&
        today.getDate() >= birthDate.getDate());

    if (!hasBirthdayPassed) {
      age -= 1;
    }

    // คำนวณเศษเดือนและวันนับจากวันเกิดปีล่าสุด
    const lastBirthday = new Date(
      today.getFullYear(),
      birthDate.getMonth(),
      birthDate.getDate(),
    );
    if (!hasBirthdayPassed) {
      lastBirthday.setFullYear(lastBirthday.getFullYear() - 1);
    }

    const msDiff = today.getTime() - lastBirthday.getTime();
    const daysDiff = msDiff / (1000 * 60 * 60 * 24);

    // ปัดขึ้นถ้าเศษเกินหรือเท่ากับ 183 วัน (ประมาณ 6 เดือน)
    if (daysDiff >= 183) {
      age += 1;
    }

    return age;
  }
}
