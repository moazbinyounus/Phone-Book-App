// src/screens/ContactDetailScreen.tsx
import React, { useLayoutEffect } from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { useContacts } from '../context/ContactContext';
import { RootStackParamList } from '../navigation/types';

// Use an icon library or emoji for simplicity
const EditIcon = () => <Text style={styles.headerIcon}>✏️</Text>;

type Props = NativeStackScreenProps<RootStackParamList, 'Details'>;

export const ContactDetailScreen: React.FC<Props> = ({ route, navigation }) => {
  const { contactId } = route.params;
  const {
    state: { contacts }
  } = useContacts();

  // Find the contact by ID
  const contact = contacts.find(c => c.id === contactId);

  // Add an edit button in the header
  useLayoutEffect(() => {
    navigation.setOptions({
      headerRight: () => (
        // Touchable edit icon in header
        <TouchableOpacity onPress={() => navigation.navigate('Form', { contactId })} style={styles.headerButton}>
          <EditIcon />
        </TouchableOpacity>
      ),
    });
  }, [navigation, contactId]);

  // If no contact found, show fallback message
  if (!contact) {
    return (
      <View style={styles.container}>
        <Text style={styles.notFound}>Contact not found.</Text>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <View style={styles.field}>
        <Text style={styles.label}>Name:</Text>
        <Text style={styles.value}>{contact.name}</Text>
      </View>
      <View style={styles.field}>
        <Text style={styles.label}>Phone:</Text>
        <Text style={styles.value}>{contact.phone}</Text>
      </View>
      <View style={styles.field}>
        <Text style={styles.label}>Address:</Text>
        <Text style={styles.value}>{contact.address}</Text>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
    backgroundColor: '#fff',
  },
  field: {
    marginBottom: 16,
  },
  label: {
    fontWeight: '600',
    fontSize: 14,
    color: '#555',
  },
  value: {
    fontSize: 18,
    marginTop: 4,
    color: '#000',
  },
  notFound: {
    fontSize: 16,
    textAlign: 'center',
    marginTop: 20,
    color: 'red',
  },
  headerButton: {
    marginRight: 16,
  },
  headerIcon: {
    fontSize: 24,
  },
});
