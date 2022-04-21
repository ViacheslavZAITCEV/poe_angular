import { RegionModel } from './region.model';

export class DepartementModel {
  code: string;
  nom: string;
  codeRegion: string;
  region: RegionModel;

  constructor(value?: DepartementModel) {
    this.code = value ? value.code : null;
    this.nom = value ? value.nom : null;
    this.codeRegion = value ? value.codeRegion : null;
    this.region = value ? value.region : null;
  }
}
