// import React from 'react';
// import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
// import { Contact } from '../types/Contact';

// interface Props {
//   contact: Contact;
//   onPress?: (id: string) => void;    // Callback when tapped
//   onDelete?: (id: string) => void;   // Delete button handler
// }

// export const ContactItem: React.FC<Props> = ({
//   contact,
//   onPress = () => {},               // Default no-op
//   onDelete = () => {},
// }) => (
//   <TouchableOpacity onPress={() => onPress(contact.id)}>
//     <View style={styles.container}>
//       <View>
//         <Text style={styles.name}>{contact.name}</Text>
//         <Text>{contact.phone}</Text>
//         <Text>{contact.address}</Text>
//       </View>
//       <TouchableOpacity onPress={() => onDelete(contact.id)}>
//         <Text style={styles.delete}>🗑️</Text>
//       </TouchableOpacity>
//     </View>
//   </TouchableOpacity>
// );

// const styles = StyleSheet.create({
//   container: {
//     flexDirection: 'row', 
//     justifyContent: 'space-between',
//     padding: 16,
//     borderBottomColor: '#ccc',
//     borderBottomWidth: 1,
//   },
//   name: { fontWeight: 'bold', fontSize: 16 },
//   delete: { color: 'red', fontSize: 18 },
// });
// src/components/ContactItem.tsx
import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { Contact } from '../types/Contact';

interface Props {
  contact: Contact;
  onPress?: (id: string) => void;
  onEdit?: (id: string) => void;     // ← new
  onDelete?: (id: string) => void;
}

export const ContactItem: React.FC<Props> = ({
  contact,
  onPress = () => {},
  onEdit = () => {},
  onDelete = () => {},
}) => (
  <TouchableOpacity onPress={() => onPress(contact.id)}>
    <View style={styles.container}>
      <View style={styles.info}>
        <Text style={styles.name}>{contact.name}</Text>
        <Text>{contact.phone}</Text>
        <Text>{contact.address}</Text>
      </View>
      <View style={styles.actions}>
        {/* Edit icon */}
        <TouchableOpacity onPress={() => onEdit(contact.id)} style={styles.icon}>
          <Text style={styles.edit}>✏️</Text>
        </TouchableOpacity>
        {/* Delete icon */}
        <TouchableOpacity onPress={() => onDelete(contact.id)} style={styles.icon}>
          <Text style={styles.delete}>🗑️</Text>
        </TouchableOpacity>
      </View>
    </View>
  </TouchableOpacity>
);

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    padding: 16,
    alignItems: 'center',
    borderBottomWidth: 1,
    borderBottomColor: '#ccc',
  },
  info: { flex: 1 },
  name: { fontWeight: 'bold', fontSize: 16 },
  actions: { flexDirection: 'row' },
  icon: { marginLeft: 12 },
  edit: { fontSize: 18, color: '#007AFF' },
  delete: { fontSize: 18, color: 'red' },
});
