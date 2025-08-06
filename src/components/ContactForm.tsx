import React from 'react';
import { View, Button, StyleSheet } from 'react-native';
import { useForm, Controller } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as Yup from 'yup';
import { TextInput } from './TextInput'; // your own TextInput wrapper

// Reuse the Contact interface, omit id for form input
import { Contact } from '../types/Contact';

type FormData = Omit<Contact, 'id'>;

const schema = Yup.object().shape({
  name: Yup.string().required('Name is required'),
  phone: Yup.string().required('Phone is required'),
  address: Yup.string().required('Address is required'),
});

interface Props {
  initialValues?: FormData;
  onSubmit: (data: FormData) => void;
}

export const ContactForm: React.FC<Props> = ({
  initialValues = { name: '', phone: '', address: '' },
  onSubmit,
}) => {
  const { control, handleSubmit, formState: { errors } } = useForm<FormData>({
    resolver: yupResolver(schema),
    defaultValues: initialValues,
  });

  return (
    <View style={styles.container}>
      {/** Each Controller wraps a field so RHF can manage it */}
      <Controller
        control={control}
        name="name"
        render={({ field: { onChange, value } }) => (
          <TextInput
            label="Name"
            value={value}
            onChangeText={onChange}
            error={errors.name?.message}
          />
        )}
      />
      <Controller
        control={control}
        name="phone"
        render={({ field: { onChange, value } }) => (
          <TextInput
            label="Phone"
            value={value}
            keyboardType="phone-pad"
            onChangeText={onChange}
            error={errors.phone?.message}
          />
        )}
      />
      <Controller
        control={control}
        name="address"
        render={({ field: { onChange, value } }) => (
          <TextInput
            label="Address"
            value={value}
            onChangeText={onChange}
            error={errors.address?.message}
          />
        )}
      />
      <Button title="Save" onPress={handleSubmit(onSubmit)} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: { padding: 16 },
});
