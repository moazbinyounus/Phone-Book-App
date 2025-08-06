import { Contact } from "../types/Contact";

type ContactInput = Omit<Contact, 'id'>;          // For form data
type EditParams = { contactId: string }; 