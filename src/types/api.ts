export interface Person {
  name: string;
  url: string;
}

export interface ApiResponse {
  count: number;
  results: Person[];
}