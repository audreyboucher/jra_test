import React, { useState, type FC } from 'react';

import { Layout, InfoDialog, EditDialog, DeleteDialog } from '../../components';

import { emptyList, emptyContact, getContacts } from '../../api/methods/contacts';

import { sendFakeRequest, Method } from '../../utils/api';
import type {
  Contact,
  CreateContactRequest,
  CreateContactResponse,
  DeleteContactRequest,
  DeleteContactResponse,
  GetContactByIdRequest,
  GetContactByIdResponse,
  GetContactsRequest,
  GetContactsResponse,
  PaginationResponse,
  UpdateContactRequest,
  UpdateContactResponse,
} from '../../types/api';
import type { Content, Field } from '../../types/common';

import FIELDS from './fields.json';

const dialogs: Content<Contact> = {
  [Method.GET]: {
    title: "More details",
    dialog: (props) => <InfoDialog {...props} />,
    action: async ({ id }: Contact) =>
      sendFakeRequest<GetContactByIdRequest, GetContactByIdResponse>(Method.GET, `/contacts/${id}`, null),
  },
  [Method.POST]: {
    title: "Create new contact",
    submitButton: "Add",
    dialog: (props) => <EditDialog {...props} />,
    action: async (contact: Contact) => 
      sendFakeRequest<CreateContactRequest, CreateContactResponse>(Method.POST, `/contacts`, contact),
    admin: true,
  },
  [Method.PATCH]: {
    title: "Edit",
    submitButton: "Update",
    dialog: (props) => <EditDialog {...props} />,
    action: async (contact: Contact) => 
      sendFakeRequest<UpdateContactRequest, UpdateContactResponse>(Method.PATCH, `/contacts/${contact.id}`, contact),
    admin: true,
  },
  [Method.DEL]: {
    title: "Delete",
    submitButton: "Confirm",
    dialog: (props) => <DeleteDialog {...props} />,
    action: async ({ id }: Contact) =>
      sendFakeRequest<DeleteContactRequest, DeleteContactResponse>(Method.DEL, `/contacts/${id}`, null),
    admin: true,
  },
};

const Home: FC = () => {
  const [contacts, setContacts] = useState<GetContactsResponse>(emptyList);

  const getItems = (filters: any) => {
    getContacts(filters as GetContactsRequest).then(setContacts);
  };

  return (
    <Layout
      items={'items' in contacts ? contacts.items : []}
      emptyItem={emptyContact}
      getItems={getItems}
      fields={FIELDS as Field<{}>[]}
      pagination={contacts as PaginationResponse<Contact>}
      dialogs={dialogs as any}
    />
  );
};

export default Home;
