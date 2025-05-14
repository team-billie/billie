
interface LocationType{
  latitude:number;
  longitude:number;
}
export interface PostCreateRequestDTO {
  title: string;
  content: string;
  category: string;
  rentalFee: number;
  deposit: number;
  preferredLocation: LocationType
}