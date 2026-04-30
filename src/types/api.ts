export interface Person {
  name: string;
  height: string;
  mass: string;
  gender: string;
}

export interface ApiResponse {
  count: number;
  next: string | null;
  previous: string | null;
  results: Person[];
}
