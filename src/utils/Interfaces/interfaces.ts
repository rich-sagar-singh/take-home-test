export interface Dog {
  id: string;
  img: string;
  name: string;
  age: number;
  zip_code: string;
  breed: string;
}

export interface SearchResult {
  resultIds: string[];
  total: number;
  next?: string;
  prev?: string;
}

export interface Location {
  zip_code: string;
  city: string;
  state: string;
}

export interface Coordinates {
  lat: number;
  lon: number;
}

export interface PaginationProps {
  from: number;
  setFrom: (newFrom: number) => void;
  totalResults: number;
  pageSize: number;
}

export interface LocationFilterProps {
  setZipCodes: (
    zipCodes: string[] | ((prevZipCodes: string[]) => string[])
  ) => void;
}

export interface GeoLocationFilterProps {
  setZipCodes: (zipCodes: string[]) => void;
}

export interface FiltersProps {
  selectedBreed: string;
  setSelectedBreed: (breed: string) => void;
  zipCodes: string[];
  setZipCodes: (zip: string[]) => void;
  ageMin: string;
  setAgeMin: (age: string) => void;
  ageMax: string;
  setAgeMax: (age: string) => void;
  sortOrder: "asc" | "desc";
  setSortOrder: (order: "asc" | "desc") => void;
  breeds: string[];
  zipCode: string;
  setZipCode: (zip: string) => void;
}

export interface SearchResult {
  resultIds: string[];
  total: number;
  next?: string;
  prev?: string;
}

export interface DogStore {
  favorites: Dog[];
  isLoading: boolean;
  error: string | null;
  addFavorite: (dog: Dog) => void;
  removeFavorite: (id: string) => void;
  login: (name: string, email: string) => Promise<void>;
  logout: () => Promise<void>;
  getBreeds: () => Promise<string[]>;
  searchDogs: (
    filters: Record<string, unknown>
  ) => Promise<{ resultIds: string[]; total: number }>;
  fetchDogDetails: (dogIds: string[]) => Promise<Dog[]>;
  matchDog: (favoriteIds: string[]) => Promise<string>;
  searchLocations: (city?: string, states?: string[]) => Promise<string[]>;
  fetchLocationDetails: (zipCodes: string[]) => Promise<Location[]>;
  searchLocationsByBoundingBox: (
    topLeft: { lat: number; lon: number },
    bottomRight: { lat: number; lon: number },
    size?: number
  ) => Promise<string[]>;
  setLoading: (status: boolean) => void;
}
