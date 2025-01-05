import React, { useEffect, useState } from 'react';
import { FormControl, InputLabel, MenuItem, Select, Button } from '@mui/material';
import { City, RouteSelection } from '../types';
import { getCities } from '../services/cityService';

interface SearchSectionProps {
  selection: RouteSelection;
  onSelectionChange: (selection: RouteSelection) => void;
  onSearch: () => void;
  isLoading: boolean;
}

export const SearchSection: React.FC<SearchSectionProps> = ({
  selection,
  onSelectionChange,
  onSearch,
  isLoading
}) => {
  const [cities, setCities] = useState<City[]>([]);

  useEffect(() => {
    const loadCities = async () => {
      try {
        const citiesData = await getCities();
        setCities(citiesData);
      } catch (error) {
        console.error('Error loading cities:', error);
      }
    };

    loadCities();
  }, []);

  return (
    <div className="flex flex-col md:flex-row gap-4 p-4 bg-white rounded-lg shadow-md">
      <FormControl className="flex-1">
        <InputLabel>From</InputLabel>
        <Select
          value={selection.from?.name || ''}
          label="From"
          onChange={(e) => {
            const city = cities.find(c => c.name === e.target.value);
            onSelectionChange({ ...selection, from: city || null });
          }}
        >
          {cities.map((city) => (
            <MenuItem key={city.name} value={city.name}>
              {city.name}
            </MenuItem>
          ))}
        </Select>
      </FormControl>

      <FormControl className="flex-1">
        <InputLabel>To</InputLabel>
        <Select
          value={selection.to?.name || ''}
          label="To"
          onChange={(e) => {
            const city = cities.find(c => c.name === e.target.value);
            onSelectionChange({ ...selection, to: city || null });
          }}
        >
          {cities.map((city) => (
            <MenuItem key={city.name} value={city.name}>
              {city.name}
            </MenuItem>
          ))}
        </Select>
      </FormControl>

      <Button
        variant="contained"
        onClick={onSearch}
        disabled={!selection.from || !selection.to || isLoading}
        className="h-14"
      >
        {isLoading ? 'Loading...' : 'Search Routes'}
      </Button>
    </div>
  );
};