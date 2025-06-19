import { ErrorResponse } from './common';
import { Contact } from './contact';

export interface Vehicle {
  id: string;
  brand: string;
  model: string;
  plate: string;
  registration: string;
  purchaseDate: string; // YYYY-MM-dd
  contactId: Contact['id'];
};

type Response = Vehicle | ErrorResponse;

// GET /vehicles
export type GetVehiclesRequest = null;
export type GetVehiclesResponse = Vehicle[] | ErrorResponse;

// POST /vehicles
export type CreateVehicleRequest = Omit<Vehicle, 'id'>;
export type CreateVehicleResponse = Response;

// GET /vehicles/:vehicleId
export type GetVehicleByIdRequest = null;
export type GetVehicleByIdResponse = Response;

// PATCH /vehicles/:vehicleId
export type UpdateVehicleRequest = Partial<Omit<Vehicle, 'id' | 'contactId'>>;
export type UpdateVehicleResponse = Response;

// DELETE /vehicles/:vehicleId
export type DeleteVehicleRequest = null;
export type DeleteVehicleResponse = null | ErrorResponse;
