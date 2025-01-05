import { City } from '../types';

const fetchCitiesFromApi = async (): Promise<City[]> => {
  try {
    const response = await fetch(`${import.meta.env.VITE_API_URL}/cities`);
    return await response.json();
  } catch (error) {
    console.error('Error fetching cities:', error);
    throw error;
  }
};

export const getCities = async (): Promise<City[]> => {
  const citiesData = await fetchCitiesFromApi();
  return citiesData.map(city => ({
    name: city.name,
    lat: city.lat,
    lng: city.lng
  }));
}; 