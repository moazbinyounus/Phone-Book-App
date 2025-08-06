import 'react-native-get-random-values';
import React from 'react';

import { ContactProvider } from '../src/context/ContactContext';
import { AppNavigator } from '../src/navigation/AppNavigator';

export default function App() {
  return (
    <ContactProvider>
      <AppNavigator />
    </ContactProvider>
  );
}
