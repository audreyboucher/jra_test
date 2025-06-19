import { ErrorResponse } from './common';
import { Vehicle } from './vehicle';

export enum Status {
  InProgress = 'en cours',
  Delivered = 'livré',
  Canceled = 'annulé',
};

export interface Order {
  id: string;
  orderNumber: string;
  amount: number;
  date: string; // YYYY-MM-dd
  status: Status;
  vehicleId: Vehicle['id'] | null;
};

type Response = Order | ErrorResponse;

// GET /contacts/:contactId/orders
export type GetOrdersByContactIdRequest = null;
export type GetOrdersByContactIdResponse = Order[] | ErrorResponse;

// POST /contacts/:contactId/orders
export type CreateOrderRequest = Omit<Order, 'id'>;
export type CreateOrderResponse = Response;

// GET /contacts/:contactId/orders/:orderId
export type GetOrderByIdRequest = null;
export type GetOrderByIdResponse = Response;

// DELETE /contacts/:contactId/orders/:orderId
export type DeleteOrderRequest = null;
export type DeleteOrderResponse = null | ErrorResponse;
