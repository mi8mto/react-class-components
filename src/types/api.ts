export interface Pokemon {
  name: string;
  url: string;
}

export interface ApiResponse {
  count: number;
  results: Pokemon[];
}
