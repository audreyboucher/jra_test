import { ErrorResponse } from './common';
import { User } from './user';

// couldn't find any history example so this is only a guess:

export enum ActionType {
  Creation = 'création',
  Update = 'mise à jour',
  Removal = 'suppression',
};

export interface History {
  type: ActionType;
  date: string; // YYYY-MM-dd
  userId: User['id'];
};

// GET /contacts/:contactId/historics
export type GetContactHistoryRequest = null;
export type GetContactHistoryResponse = History[] | ErrorResponse;