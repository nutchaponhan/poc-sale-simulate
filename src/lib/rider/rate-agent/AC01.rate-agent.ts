import { IProductRateAgent } from '../../interface/product-rate-agent.interface';
import { RiderProduct } from '../../core/rider.product';
import { readRiderRateFile } from '../../utility/file';
import { RiderAgent } from '../../core/rider.agent';

export class AC01ProductRateAgent
  extends RiderAgent
  implements IProductRateAgent
{
  private asset: string = 'AC01.premium.json';
  private premiumRate: any;

  constructor(private rider: RiderProduct) {
    super();
    this.load();
  }

  private load() {
    const data = readRiderRateFile(this.asset);
    console.log(data);
    this.premiumRate = data.premiumRate;
  }

  calculate(input: {
    insuredAge: number;
    mode: number;
    occupationType: string;
    riderSum: number;
  }): string {
    try {
      let amount: string = '000000';
      let fact: string = '000';
      let tmpPrem: string = '';
      let result: string = '0';

      if (input.mode == 3 || input.mode > 4 || input.occupationType > '3')
        return '000000';

      // get amount and fact from rate file
      amount = this.premiumRate['amtRate'][input.occupationType].value;
      fact = this.premiumRate['pmFact'][input.mode].value;

      // logic calculate
      amount = String((Number(amount) / 10) * (Number(fact) / 100));
      amount = Number(amount).toFixed(2);

      fact = '0.05';
      amount = String(Number(parseFloat(amount)) + Number(parseFloat(fact)));
      amount = Number(amount).toFixed(2);

      amount = String(parseInt(String(Number(amount) * 100), 10));
      amount = this.rshift(amount, 1, 0);
      amount = this.lshift(amount, 1, 0);
      input.riderSum = this.rshift(input.riderSum, 4, 0);
      tmpPrem = String(input.riderSum * (Number(amount) / 100));
      tmpPrem = Number(tmpPrem).toFixed(2);
      tmpPrem = tmpPrem.substring(0, tmpPrem.length - 3);
      tmpPrem = this.setlen(tmpPrem, 9);
      result = tmpPrem;

      return result;
    } catch (error) {
      console.error(`Error to calculate AC01:`, error);
      return '0';
    }
  }

  // original code
  /*  async AC01(insuredAge: number, mode: number, occupationType: string, riderSum: number) {
    this.saveCondition(this.conf.getRiderCode('AC01'), insuredAge, null, mode, occupationType, riderSum);
    let amount: string = '000000';
    let fact: string = '000';
    let tmpPrem: string = '';
    let result: string = '0';
    if (mode == 3 || mode > 4 || occupationType > '3') return '000000';
    let a = await this.plan
      .getRider('AC01')
      .then((res: any) => {
        amount = res['amtRate'][occupationType];
        fact = res['pmFact'][mode];
        amount = String((Number(amount) / 10) * (Number(fact) / 100));
        amount = Number(amount).toFixed(2);

        fact = '0.05';
        amount = String(Number(parseFloat(amount)) + Number(parseFloat(fact)));
        amount = Number(amount).toFixed(2);

        amount = String(parseInt(String(Number(amount) * 100), 10));
        amount = this.rshift(amount, 1, 0);
        amount = this.lshift(amount, 1, 0);
        riderSum = this.rshift(riderSum, 4, 0);
        tmpPrem = String(riderSum * (Number(amount) / 100));
        tmpPrem = Number(tmpPrem).toFixed(2);
        tmpPrem = tmpPrem.substring(0, tmpPrem.length - 3);
        tmpPrem = this.setlen(tmpPrem, 9);
        result = tmpPrem;
        return result;
        //this.rshift("10")
      })
      .catch((err) => {
        console.log(err);
        return result;
      });

    this.saveCondition('AC01', insuredAge, null, mode, occupationType, riderSum, Number(a));
    return a;
  } */
}
