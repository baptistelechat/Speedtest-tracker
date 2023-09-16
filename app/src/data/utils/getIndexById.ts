import { ISpeedTestData } from "../interface/ISpeedTestData";

export const getIndexById = (data: ISpeedTestData[], targetId: string) => {
  for (let i = 0; i < data.length; i++) {
    if (data[i].id === targetId) {
      return i;
    }
  }
  return -1;
};
