import React, { useState } from 'react';
import { View, Button, Image, StyleSheet, Text, Alert, TouchableOpacity } from 'react-native';
import { launchImageLibrary } from 'react-native-image-picker';
import { Firebase_storage, Firebase_store } from './Firebase';
import { ref, uploadBytes, getDownloadURL } from 'firebase/storage';
import { collection, addDoc } from 'firebase/firestore';
import { useNavigation } from '@react-navigation/native';

export default function AddImageForm() {
  const [images, setImages] = useState([]);
  const navigation = useNavigation();

  const pickImage = () => {
    launchImageLibrary({ mediaType: 'photo' }, async (response) => {
      if (response.didCancel) {
        console.log('User cancelled image picker');
      } else if (response.errorCode) {
        console.log('ImagePicker Error: ', response.errorMessage);
      } else {
        const newImage: ImageType = {
          uri: response.assets[0].uri,
          id: Date.now().toString()
        };
        setImages([...images, newImage]);
  
        try {
          const imageUrl = await uploadImage(newImage.uri, newImage.id);
          const rentalCollectionRef = collection(Firebase_store, 'rental');
          const docRef = await addDoc(rentalCollectionRef, {
            imageUrl: imageUrl,
            // Add other fields as needed
          });
          console.log(`Image uploaded with ID: ${docRef.id}`);
        } catch (error) {
          console.error('Error uploading image: ', error);
        }
      }
    });
  };

  const uploadImage = async (uri, imageName) => {
    const response = await fetch(uri);
    const blob = await response.blob();
    const storageRef = ref(Firebase_storage, `images/${imageName}`);
    await uploadBytes(storageRef, blob);
    return getDownloadURL(storageRef);
  };

  const saveImages = async () => {
    const uploadedImageUrls = [];
    for (const image of images) {
      const imageUrl = await uploadImage(image.uri, image.id);
      uploadedImageUrls.push({ id: image.id, url: imageUrl });
    }

    try {
      await addDoc(collection(Firebase_store, 'userImages'), {
        images: uploadedImageUrls,
      });
      Alert.alert('Success', 'Images uploaded successfully!');
    } catch (error) {
      Alert.alert('Error', error.message);
    }
  };

  return (
    <View style={styles.container}>
      <TouchableOpacity
        style={styles.button}
        onPress={() => navigation.goBack()}>
        <Text style={styles.text}>Back</Text>
      </TouchableOpacity>
      <Button title="Pick an image" onPress={pickImage} />
      {images.map((image) => (
        <View key={image.id} style={styles.imageContainer}>
          <Image source={{ uri: image.uri }} style={styles.image} />
          <Text>{image.uri}</Text>
        </View>
      ))}
      <Button title="Save Images" onPress={saveImages} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    padding: 10,
  },
  button: {
    marginBottom: 10,
  },
  imageContainer: {
    padding: 5,
    alignItems: 'center',
    justifyContent: 'center',
  },
  image: {
    width: 100,
    height: 100,
    borderRadius: 10,
  },
});

