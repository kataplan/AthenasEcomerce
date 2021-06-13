import {comuna} from '../interfaces/comunas'
export interface Regiones{
    regiones:Array<Region>
}
export interface Region{
    region:string,
    comunas:Array<comuna>
}