import { ISpeedTestData } from "./ISpeedTestData";

export interface IKeyData {
  Moyenne: ISpeedTestData | string;
  Minimum: ISpeedTestData | string;
  Maximum: ISpeedTestData | string;
  "1er Quartile (Q1)": ISpeedTestData | string;
  Médiane: ISpeedTestData | string;
  "3ème Quartile (Q3)": ISpeedTestData | string;
}
