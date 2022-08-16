export interface ILocation {
  address: string;
  lat: number;
  lng: number;
}

export default class Place {
  public readonly id: string;
  public readonly title: string;
  public readonly imageUri: string;
  public readonly location: ILocation;

  constructor(
    id: string,
    title: string,
    imageUri: string,
    location: ILocation,
  ) {
    this.id = id;
    this.title = title;
    this.imageUri = imageUri;
    this.location = location;
  }
}
