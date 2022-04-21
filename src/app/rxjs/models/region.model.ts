export class RegionModel {
  code: string;
  nom: string;

  constructor(value?: RegionModel) {
    this.code = value ? value.code : null;
    this.nom = value ? value.nom : null;
  }
}
