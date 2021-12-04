import Rendement from "@/models/Rendement";

export default interface DatedRendement extends Rendement{
  date: string;
}
