import CONTACTS from '../contacts.json';

import {
  Contact,
  PaginationResponse,
  GetContactsRequest,
  GetContactsResponse,
  GetContactByIdResponse,
  UpdateContactRequest,
  UpdateContactResponse,
  DeleteContactResponse,
  CreateContactRequest,
  CreateContactResponse,
} from '../../types/api';

let contactsList: Contact[] = CONTACTS;

export const emptyList: PaginationResponse<Contact> = {
  items: [],
  total: 0,
  page: 1,
  limit: 10,
  pages: 0,
};

export const emptyContact: Contact = {
  id: '',
  firstName: '',
  lastName: '',
  email: '',
  phone: '',
};

export const getContacts = async (filters?: GetContactsRequest): Promise<GetContactsResponse> => {
  return new Promise((resolve) => {
    const result = contactsList;
    const page = filters?.page || emptyList.page;
    const limit = filters?.limit || emptyList.limit;
    const sortBy = filters?.sortBy || 'id';
    const isDesc = filters && 'isDesc' in filters ? filters.isDesc : true;
    const customFilters = Object.keys(filters || {}).filter((key) => key in emptyContact) as (keyof Contact)[];

    resolve({
      items: result
        .filter((item) => filters && customFilters.length
          ? customFilters.every((key) =>
            !!item[key].toLowerCase().includes(String(filters[key as keyof GetContactsRequest]).toLowerCase())
          )
          : item
        )
        .sort((a, b) => {
          if (a[sortBy] < b[sortBy]) return isDesc ? -1 : 1;
          if (a[sortBy] > b[sortBy]) return isDesc ? 1 : -1;
          return 0;
        })
        .slice((page - 1) * limit, page * limit),
      total: result.length,
      page,
      limit,
      pages: Math.ceil(result.length / limit),
    });
  });
};

export const getContactById = async (id: string): Promise<GetContactByIdResponse> => {
  return new Promise((resolve, reject) => {
    const result = contactsList.find(({ id: contactId }) => contactId === id);

    if (result) resolve(result as GetContactByIdResponse);
    else reject({ message: "Contact not found" });
  });
};

export const createContact = async (data: CreateContactRequest): Promise<CreateContactResponse> => {
  return new Promise((resolve, reject) => {
    const { firstName, lastName, email, phone } = data;

    if (!firstName || !firstName.trim().length) reject({ message: "First name is required" });
    if (!lastName || !lastName.trim().length) reject({ message: "Last name is required" });
    if (!email || !email.trim().length) reject({ message: "Email is required" });
    if (!phone || !phone.trim().length) reject({ message: "Phone is required" });
    if (contactsList.find(({ email: emailAddress }) => emailAddress === email)) reject({ message: "This email is already used" });

    const newContact = {
      ...Object.entries(data)
        .reduce((acc, [key, value]) => ({ ...acc, [key]: key === 'email' ? value.trim().toLowerCase() : value.trim() }), {}),
      id: `c${contactsList.length ? Math.max(...contactsList.map(({ id }) => parseInt(id.replace(/\D/g, "")))) + 1 : 1}`,
    };

    contactsList.push(newContact as Contact);
    resolve(newContact as CreateContactResponse);
  });
};

export const updateContactById = async (id: string, data: UpdateContactRequest): Promise<UpdateContactResponse> => {
  return new Promise((resolve, reject) => {
    const { firstName, lastName, email, phone } = data;

    if (!firstName || !firstName.trim().length) reject({ message: "First name is required" });
    if (!lastName || !lastName.trim().length) reject({ message: "Last name is required" });
    if (!email || !email.trim().length) reject({ message: "Email is required" });
    if (!phone || !phone.trim().length) reject({ message: "Phone is required" });

    const index = contactsList.findIndex(({ id: contactId }) => contactId === id);

    if (typeof index === 'number') {
      contactsList = contactsList.map((contact) => contact.id === id ? {
        ...contact,
        ...Object.entries(data)
          .reduce((acc, [key, value]) => ({ ...acc, [key]: key === 'email' ? value.trim().toLowerCase() : value.trim() }), {})
      } : contact);
      resolve(data as UpdateContactResponse);
    } else reject({ message: "Contact not found" });
  });
};

export const deleteContactById = async (id: string): Promise<DeleteContactResponse> => {
  return new Promise((resolve, reject) => {
    const index = contactsList.findIndex(({ id: contactId }) => contactId === id);

    if (typeof index === 'number') {
      contactsList = contactsList.filter((_, i) => i !== index);
      resolve(null);
    } else reject({ message: "Contact not found" });
  });
};
