import axios from "axios";
import Rendement from "@/models/Rendement";
import DatedRendement from "@/models/DatedRendement";
import {useDateService} from "@/services/date.service";

const dateService = useDateService();

async function findVille(criteria: string): Promise<string[]>{
  return (await axios.get('/api/find/'+criteria)).data;
}

async function postSimationScenarios(aleas: any[]): Promise<Rendement[]> {
  type aleaInput = {type: string, firstDay: string, lastDay: string, intensity: number};
  const postPayload: aleaInput[] = aleas.map(alea => {
    return {
      firstDay: dateService.formatToIsoLocalDate(alea.periode.start),
      lastDay: dateService.formatToIsoLocalDate(alea.periode.end),
      intensity: alea.intensite,
      type: alea.type
    }
  });

  return (await axios.post(`/api/model`, postPayload)).data;
}


async function getProbaAlea(commune: string, annee: string){
  const codeCommune: string = (commune.match(/\(\d+\)/) as string[])[0].replace('(', '').replace(')', '');

  return (await axios.get(`/api/alea/${codeCommune}/${annee}`)).data;
}

async function getSimulationTheorique(): Promise<Rendement[]>{
  return (await axios.get('/api/model')).data;
}

function getDatedRendement( startDate: Date, rendement: Rendement[]): DatedRendement[]{
  let currDate = startDate;
  if ( rendement?.map ){
    return rendement.map((currRendement, index) => {
      const datedRend: DatedRendement = {
        ...currRendement,
        date: dateService.formatToIsoLocalDate(currDate)
      };
      currDate = dateService.rollUpDate(currDate);
      return datedRend;
    });
  }
  return [];

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
    findVille,
    getSimulationTheorique,
    getDatedRendement,
    flattenAsChartData,
    postSimationScenarios,
    getProbaAlea
  }
}
