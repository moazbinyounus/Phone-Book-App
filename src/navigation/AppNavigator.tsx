// src/navigation/AppNavigator.tsx
import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

// ✅ Make sure these imports match your file names & exports exactly:
import { ContactListScreen } from '../screens/ContactListScreen';
import { ContactDetailScreen } from '../screens/ContactDetailScreen';
import { ContactFormScreen } from '../screens/ContactFormScreen';

import { RootStackParamList } from './types';

const Stack = createNativeStackNavigator<RootStackParamList>();

export const AppNavigator = () => (
  <NavigationContainer>
    <Stack.Navigator>
      <Stack.Screen 
        name="List"
        component={ContactListScreen} 
        options={{ title: 'Contacts' }}
      />
      <Stack.Screen 
        name="Details" 
        component={ContactDetailScreen}   // ← must be a real component
        options={{ title: 'Contact Details' }}
      />
      <Stack.Screen 
        name="Form" 
        component={ContactFormScreen} 
        options={({ route }) => ({
          title: route.params?.contactId ? 'Edit Contact' : 'New Contact'
        })}
      />
    </Stack.Navigator>
  </NavigationContainer>
);
