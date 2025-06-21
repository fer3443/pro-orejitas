export interface PostFormInputs {
  id: string;
  title:string;
  description:string;
  species: Species;
  age?:string;
  breed?: string;
  location:string;
  type: TypeCategory;
  image:FileList;
  status: Status;
}

export interface PostImages {
  id:number;
  url:string;
  petPostId?:string;
}

type Species = "PERRO" | "GATO" | "OTRO";
type TypeCategory = "LOST" | "FOUND" | "ADOPTION";
type Status = "ACTIVE" | "RESOLVED" | "CLOSED";