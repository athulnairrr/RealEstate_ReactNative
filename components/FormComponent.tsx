import React, {useState} from 'react';
import {View, TextInput, Button, StyleSheet} from 'react-native';
import {collection, addDoc, serverTimestamp} from 'firebase/firestore';
import {Firebase_store} from './Firebase';
import { Alert } from 'react-native';
import AddImageForm from './ImagePicker'

const FormComponent = () => {
  const [date, setDate] = useState('');
  const [name, setName] = useState('');
  const [contact, setContact] = useState('');
  const [configuration, setConfiguration] = useState('');
  const [price, setPrice] = useState('');
  const [propertyAddress, setPropertyAddress] = useState('');
  const [parking, setParking] = useState('');
  const [carpet, setCarpet] = useState('');
  const [direction, setDirection] = useState('');
  const [additionalNotes, setAdditionalNotes] = useState('');
  const timestamp = serverTimestamp();

  const handleSubmit = async () => {
    if (
      !date ||
      !name ||
      !contact ||
      !configuration ||
      !price ||
      !propertyAddress ||
      !parking ||
      !carpet ||
      !direction ||
      !additionalNotes
    ) {
      Alert.alert('Please fill in all fields or write "NA" if not applicable.');
      return;
    }
    const propertiesCollectionRef = collection(Firebase_store, 'properties');

    const newProperty = {
      date: date || 'NA',
      name: name || 'NA',
      contact: contact || 'NA',
      configuration: configuration || 'NA',
      price: price || 'NA',
      propertyAddress: propertyAddress || 'NA',
      parking: parking || 'NA',
      carpet: carpet || 'NA',
      direction: direction || 'NA',
      additionalNotes: additionalNotes || 'NA',
      timestamp: timestamp,
    };

    try {
      const docRef = await addDoc(propertiesCollectionRef, newProperty);
      console.log(`Document added with ID: ${docRef.id}`);
      // Reset the form fields after submitting
      setDate('');
      setName('');
      setContact('');
      setConfiguration('');
      setPrice('');
      setPropertyAddress('');
      setParking('');
      setCarpet('');
      setDirection('');
      setAdditionalNotes('');
    } catch (e) {
      console.error('Error adding document: ', e);
    }
  };

  return (
        <View style={styles.container}>
          <TextInput
            style={styles.input}
            placeholder="Date"
            value={date}
            onChangeText={setDate}
          />
          <TextInput
            style={styles.input}
            placeholder="Name"
            value={name}
            onChangeText={setName}
          />
          <TextInput
            style={styles.input}
            placeholder="Contact"
            value={contact}
            onChangeText={setContact}
          />
          <TextInput
            style={styles.input}
            placeholder="Configuration"
            value={configuration}
            onChangeText={setConfiguration}
          />
          <TextInput
            style={styles.input}
            placeholder="Price"
            value={price}
            onChangeText={setPrice}
          />
          <TextInput
            style={styles.input}
            placeholder="Property Address"
            value={propertyAddress}
            onChangeText={setPropertyAddress}
          />
          <TextInput
            style={styles.input}
            placeholder="Parking"
            value={parking}
            onChangeText={setParking}
          />
          <TextInput
            style={styles.input}
            placeholder="Carpet"
            value={carpet}
            onChangeText={setCarpet}
          />
          <TextInput
            style={styles.input}
            placeholder="Direction"
            value={direction}
            onChangeText={setDirection}
          />
          <TextInput
            style={styles.input}
            placeholder="Additional Notes"
            value={additionalNotes}
            onChangeText={setAdditionalNotes}
          />
          <AddImageForm />
          <Button title="Submit" onPress={handleSubmit} />
        </View>
  );
};

const styles = StyleSheet.create({
  container: {
    padding: 20,
  },
  input: {
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 5,
    padding: 10,
    marginBottom: 10,
  },
});

export default FormComponent;
