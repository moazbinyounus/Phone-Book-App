import React, { createContext, useReducer, ReactNode, useContext } from 'react';
import { Contact } from '../types/Contact';

// Actions for our reducer
type Action =
  | { type: 'ADD'; payload: Contact }
  | { type: 'UPDATE'; payload: Contact }
  | { type: 'DELETE'; payload: string };

type State = { contacts: Contact[] };

const initialState: State = { contacts: [] };

const ContactContext = createContext<{
  state: State;
  dispatch: React.Dispatch<Action>;
}>({ state: initialState, dispatch: () => null });

function reducer(state: State, action: Action): State {
  switch (action.type) {
    case 'ADD':
      return { contacts: [...state.contacts, action.payload] };
    case 'UPDATE':
      return {
        contacts: state.contacts.map(c =>
          c.id === action.payload.id ? action.payload : c
        ),
      };
    case 'DELETE':
      return {
        contacts: state.contacts.filter(c => c.id !== action.payload),
      };
    default:
      return state;
  }
}

// Provider wraps the app
export const ContactProvider = ({ children }: { children: ReactNode }) => {
  const [state, dispatch] = useReducer(reducer, initialState);
  return (
    <ContactContext.Provider value={{ state, dispatch }}>
      {children}
    </ContactContext.Provider>
  );
};

// Custom hook for easy usage
export const useContacts = () => useContext(ContactContext);
