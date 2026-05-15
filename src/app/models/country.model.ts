// Interfaces for the restcountries API response

export interface CountryName {
  common: string;
  official: string;
}

export interface Currency {
  name: string;
  symbol: string;
}

export interface Flags {
  png: string;
  svg: string;
  alt: string;
}

export interface Country {
  cca2: string;
  name: CountryName;
  capital: string[];
  currencies: { [key: string]: Currency };
  flags: Flags;
  population: number;
  region: string;
  subregion: string;
  latlng: number[];
  area: number;
  languages: { [key: string]: string };
  timezones: string[];
}
