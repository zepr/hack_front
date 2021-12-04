import axios from "axios";
import Rendement from "@/models/Rendement";
import DatedRendement from "@/models/DatedRendement";
import {useDateService} from "@/services/date.service";

const dateService = useDateService();

async function getRendement(): Promise<Rendement[]>{
  return (await axios.get('/model')).data;
}
async function getDatedRendement( startDate: Date): Promise<DatedRendement[]>{

  const rendement = await getRendement();
  let currDate = startDate;
  return rendement.map((rendement, index) => {
    const datedRend: DatedRendement = {
      ...rendement,
      date: dateService.formatToIsoLocalDate(currDate)
    };
    currDate = dateService.rollUpDate(currDate);
    return datedRend;
  })
}

function flattenAsChartData(rendement: DatedRendement[]): any[] {
  const keys = Object.keys(rendement[0]);
  const flattenedData: any[] = keys.map( key => [key]);
  rendement.forEach( (val : any) => {
    keys.forEach( (key, index) => flattenedData[index].push(val[key]))
  });
  return flattenedData;
}

export function useApiService() {
  return {
    getRendement,
    getDatedRendement,
    flattenAsChartData
  }
}
