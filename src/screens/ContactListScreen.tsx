// src/screens/ContactListScreen.tsx
import React, { useState, useMemo } from 'react';
import {
  FlatList,
  View,
  Alert,
  StyleSheet,
  TouchableOpacity,
  Text,
} from 'react-native';
import { SafeAreaView, useSafeAreaInsets } from 'react-native-safe-area-context';
import { useContacts } from '../context/ContactContext';
import { ContactItem } from '../components/ContactItem';
import { SearchBar } from '../components/SearchBar';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { RootStackParamList } from '../navigation/types';

type Props = NativeStackScreenProps<RootStackParamList, 'List'>;

export const ContactListScreen: React.FC<Props> = ({ navigation }) => {
  const { state: { contacts }, dispatch } = useContacts();
  const [search, setSearch] = useState('');
  const insets = useSafeAreaInsets();

  const filtered = useMemo(
    () =>
      contacts.filter(c =>
        c.name.toLowerCase().includes(search.toLowerCase()) ||
        c.address.toLowerCase().includes(search.toLowerCase())
      ),
    [search, contacts]
  );

  const handleDelete = (id: string) => {
    Alert.alert('Delete contact?', 'This cannot be undone.', [
      { text: 'Cancel', style: 'cancel' },
      {
        text: 'Delete',
        style: 'destructive',
        onPress: () => dispatch({ type: 'DELETE', payload: id }),
      },
    ]);
  };

  return (
    <SafeAreaView style={styles.safe}>
      <SearchBar value={search} onChangeText={setSearch} />
      <FlatList
        contentContainerStyle={styles.list}
        data={filtered}
        keyExtractor={item => item.id}
        renderItem={({ item }) => (
          <ContactItem
            contact={item}
            onPress={id => navigation.navigate('Details', { contactId: id })}
            onEdit={id => navigation.navigate('Form', { contactId: id })}
            onDelete={handleDelete}
          />
        )}
      />

      {/* Floating Add Button */}
      <TouchableOpacity
        style={[
          styles.fab,
          { bottom: (insets.bottom || 16) + 16 }
        ]}
        activeOpacity={0.7}
        onPress={() => navigation.navigate('Form', {})}
      >
        <Text style={styles.fabIcon}>＋</Text>
      </TouchableOpacity>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  safe: {
    flex: 1,
    backgroundColor: '#fff',
  },
  list: {
    paddingHorizontal: 16,
    paddingBottom: 80, // ensure list isn’t hidden behind FAB
  },
  fab: {
    position: 'absolute',
    right: 16,
    width: 56,
    height: 56,
    borderRadius: 28,
    backgroundColor: '#007AFF',
    justifyContent: 'center',
    alignItems: 'center',
    // iOS shadow
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 4.65,
    // Android elevation
    elevation: 8,
  },
  fabIcon: {
    fontSize: 32,
    color: '#fff',
    lineHeight: 32,
  },
});
