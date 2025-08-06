import React from 'react';
import { useContacts } from '../context/ContactContext';
import { ContactForm } from '../components/ContactForm';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { RootStackParamList } from '../navigation/types';
import { v4 as uuidv4 } from 'uuid';
import { Contact } from '../types/Contact';

type Props = NativeStackScreenProps<RootStackParamList, 'Form'>;
type ContactInput = Omit<Contact, 'id'>;

export const ContactFormScreen: React.FC<Props> = ({ route, navigation }) => {
  const { contactId } = route.params ?? {};
  const { state: { contacts }, dispatch } = useContacts();

  const existing = contacts.find(c => c.id === contactId);
  const initialValues = existing
    ? { name: existing.name, phone: existing.phone, address: existing.address }
    : undefined;

  const onSubmit = (data: ContactInput) => {
    if (existing) {
      dispatch({ type: 'UPDATE', payload: { ...existing, ...data } });
    } else {
      dispatch({ type: 'ADD', payload: { id: uuidv4(), ...data } });
    }
    navigation.goBack();
  };

  return (
    <ContactForm initialValues={initialValues} onSubmit={onSubmit} />
  );
};
