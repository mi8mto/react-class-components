export interface Person {
  name: string;
  url: string;
  gender?: string;
}

export interface ApiResponse {
  count: number;
  results: Person[];
}
