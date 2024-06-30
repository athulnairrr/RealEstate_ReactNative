import React, { useState } from 'react';
import {
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
  ScrollView,
  KeyboardAvoidingView,
  Platform,
  TextInput,
  Button,
  Image,
} from 'react-native';
import { ref, uploadBytes, getDownloadURL } from 'firebase/storage';
import { useNavigation } from '@react-navigation/native';
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';
import { collection, addDoc, serverTimestamp } from 'firebase/firestore';
import { Firebase_store, Firebase_storage, storageRef } from '../Firebase';
import { Alert } from 'react-native';
import DatePicker from 'react-native-date-picker';
import { Calendar } from 'react-native-feather';
import { launchImageLibrary } from 'react-native-image-picker';

export default function StockEntryRental() {
  const navigation = useNavigation();
  const [selectedImages, setSelectedImages] = useState([]);
  const [open, setOpen] = useState(false);
  const [date, setDate] = useState(new Date());
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
    const rentalCollectionRef = collection(Firebase_store, 'rental');
  
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
      images: selectedImages.map((image, index) => ({
        uri: image,
        id: `image_${Date.now()}_${index}`,
      })),
      timestamp: timestamp,
    };
  
    try {
      const urls = await Promise.all(
        newProperty.images.map(async image => {
          const response = await fetch(image.uri);
          const blob = await response.blob();
          const imageName = `rentalImg_${image.id}`;
          const imageRef = ref(storageRef, `rentalImages/${imageName}`);
          await uploadBytes(imageRef, blob);
          return await getDownloadURL(imageRef);
        })
      );
  
      newProperty.images = urls;
  
      const docRef = await addDoc(rentalCollectionRef, newProperty);
      console.log(`Document added with ID: ${docRef.id}`);
      setDate(new Date());
      setName('');
      setContact('');
      setConfiguration('');
      setPrice('');
      setPropertyAddress('');
      setParking('');
      setCarpet('');
      setDirection('');
      setAdditionalNotes('');
      setSelectedImages([]);
    } catch (error) {
      console.error('Error adding document: ', error);
    }
  };

  return (
    <View>
      <KeyboardAvoidingView
        style={styles.keyboardAvoidingContainer}
        behavior={Platform.OS === 'ios' ? 'padding' : 'height'}>
        <ScrollView contentContainerStyle={styles.scrollView}>
          <View style={styles.container}>
            <View style={styles.overlayer}>
              <Text style={styles.maintext}>Stock Rental</Text>
              <Text style={styles.thetext}>Lets find the best for you.</Text>
            </View>
            <TouchableOpacity
              style={styles.button}
              onPress={() => navigation.goBack()}>
              <Text style={styles.text}>Back</Text>
            </TouchableOpacity>
          </View>
          <View style={styles.bgcontainer}>
            <Text style={styles.bgtext}>Enter the required Details</Text>
          </View>
          <View style={styles.formcontainer}>
            <View style={styles.datecontainer}>
              <View style={styles.dateContainer}>
                <TextInput
                  style={styles.inputbtn}
                  value={`${date.getDate()}/${
                    date.getMonth() + 1
                  }/${date.getFullYear()}`}
                  editable={false}
                />
                <TouchableOpacity onPress={() => setOpen(true)}>
                  <Calendar stroke="black" fill="#fff" width={28} height={28} />
                </TouchableOpacity>
              </View>
              <DatePicker
                modal
                open={open}
                date={date}
                onConfirm={newDate => {
                  setOpen(false);
                  setDate(newDate);
                }}
                mode="date"
                onCancel={() => setOpen(false)}
              />
            </View>
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
            <TouchableOpacity
              style={styles.input}
              onPress={() => {
                launchImageLibrary(
                  { mediaType: 'photo', selectionLimit: 5 },
                  response => {
                    if (!response.didCancel) {
                      setSelectedImages(
                        response.assets.map(asset => asset.uri),
                      );
                    }
                  },
                );
              }}>
              <Text>Pick Images</Text>
            </TouchableOpacity>

            {selectedImages.map((uri, index) => (
              <Image key={index} source={{ uri }} style={styles.image} />
            ))}
            <Button title="Submit" onPress={handleSubmit} />
          </View>
        </ScrollView>
      </KeyboardAvoidingView>
    </View>
  );
}

const styles = StyleSheet.create({
  keyboardAvoidingContainer: {
    flexGrow: 1,
  },
  scrollView: {
    flexGrow: 1,
    paddingBottom: hp('5'),
  },
  container: {
    height: hp('30'),
    width: wp('100'),
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
    overflow: 'hidden',
  },
  button: {
    width: wp('20'),
    position: 'absolute',
    right: wp('1'),
    marginTop: hp('3'),
    marginRight: wp('5'),
    alignItems: 'flex-end',
    padding: hp('2'),
    borderRadius: hp('3'),
  },
  maintext: {
    fontSize: hp('5'),
    color: '#ffffff',
    fontWeight: 'bold',
  },
  thetext: {
    fontSize: hp('2'),
    color: '#ffffff',
  },
  overlayer: {
    height: hp('30'),
    width: wp('100'),
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    alignItems: 'center',
    justifyContent: 'center',
  },
  bgcontainer: {
    width: wp('100'),
    marginTop: 10,
    marginLeft: 10,
  },
  bgtext: {
    fontSize: hp('2.5'),
    width: wp('100'),
    color: '#000000',
    fontWeight: 'bold',
  },
  formcontainer: {
    padding: 20,
  },
  datecontainer: {
    marginBottom: 10,
  },
  dateContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    borderWidth: 1,
    borderColor: 'gray',
    borderRadius: 5,
    paddingLeft: 8,
    paddingRight: 8,
  },
  input: {
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 5,
    padding: 10,
    marginBottom: 10,
  },
  inputbtn: {
    flex: 1,
    marginRight: 10,
    color: 'black',
  },
  image: {
    width: 100,
    height: 100,
    borderRadius: 5,
    marginVertical: 10,
  },
  text: {
    fontSize: hp('2.5'),
    fontWeight: 'bold',
  },
});
