import React, { useState } from 'react';
import { SearchSection } from './components/SearchSection';
import { MapComponent } from './components/MapComponent';
import { CarriersTable } from './components/CarriersTable';
import { RouteSelection, Carrier } from './types';

function App() {
  const [selection, setSelection] = useState<RouteSelection>({ from: null, to: null });
  const [carriers, setCarriers] = useState<Carrier[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleSearch = async () => {
    setIsLoading(true);
    setError(null);

    try {
      // Verificar que ambas ciudades estén seleccionadas
      if (!selection.from || !selection.to) {
        throw new Error('Please select both cities');
      }
      // Construir URL con query params
      const queryParams = new URLSearchParams({
        from_city: selection.from?.name || '', // Assuming City has a 'name' property
        to_city: selection.to?.name || ''      // Assuming City has a 'name' property
      });
      const url = `http://localhost:5000/get-carriers?${queryParams}`;

      const response = await fetch(url);
      if (!response.ok) throw new Error('Failed to fetch carriers data');
      
      const data = await response.json();
      setCarriers(data);
    } catch (err) {
      setError('Failed to load carriers data. Please try again.');
      console.error(err);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gray-100 p-4">
      <div className="max-w-7xl mx-auto space-y-4">
        <h1 className="text-3xl font-bold text-gray-800 mb-6">
          Genlogs
        </h1>

        <SearchSection
          selection={selection}
          onSelectionChange={setSelection}
          onSearch={handleSearch}
          isLoading={isLoading}
        />

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
          <div className="bg-white rounded-lg shadow-md overflow-hidden">
            <MapComponent from={selection.from} to={selection.to} />
          </div>
          
          <div className="bg-white rounded-lg shadow-md p-4">
            <h2 className="text-xl font-semibold mb-4">Available Carriers</h2>
            <CarriersTable
              carriers={carriers}
              isLoading={isLoading}
              error={error}
            />
          </div>
        </div>
      </div>
    </div>
  );
}

export default App;