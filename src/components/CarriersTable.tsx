import React from 'react';
import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  CircularProgress
} from '@mui/material';
import { Carrier } from '../types';

interface CarriersTableProps {
  carriers: Carrier[];
  isLoading: boolean;
  error: string | null;
}

export const CarriersTable: React.FC<CarriersTableProps> = ({
  carriers,
  isLoading,
  error
}) => {
  if (error) {
    return (
      <div className="p-4 text-red-600 bg-red-50 rounded-lg">
        {error}
      </div>
    );
  }

  if (isLoading) {
    return (
      <div className="flex justify-center items-center h-64">
        <CircularProgress />
      </div>
    );
  }

  return (
    <TableContainer component={Paper}>
      <Table>
        <TableHead>
          <TableRow>
            <TableCell>Carrier Name</TableCell>
            <TableCell align="right">Trucks per Day</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {carriers.map((carrier) => (
            <TableRow key={carrier.name}>
              <TableCell>{carrier.name}</TableCell>
              <TableCell align="right">{carrier.trucks_per_day}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
};