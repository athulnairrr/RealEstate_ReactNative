import React, { useEffect, useState } from 'react';
import { View, StyleSheet, Text, ScrollView, ImageBackground } from 'react-native';
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen';
import { collection, getDocs } from 'firebase/firestore';
import { Firebase_store } from './Firebase';
import Carousel from './Carousel';

export default function TryIt() {
  const [images, setImages] = useState([]);
  const [data, setData] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');

  useEffect(() => {
    const fetchImages = async () => {
      try {
        const collectionRef = collection(Firebase_store, 'rental'); // Adjust the collection name as needed
        const querySnapshot = await getDocs(collectionRef);

        const fetchedImages = querySnapshot.docs.flatMap(
          doc => doc.data().images || [],
        ); // Flatten and get images arrays

        const collections = ['resale', 'rental', 'builder', 'commercial'];
        const promises = collections.map(async collectionName => {
          const collectionRef = collection(Firebase_store, collectionName);
          const querySnapshot = await getDocs(collectionRef);
          return querySnapshot.docs.map(doc => ({
            id: doc.id,
            ...doc.data(),
            collection: collectionName,
          }));
        });

        const results = await Promise.all(promises);
        const allData = results.flat();

        setImages(fetchedImages);
        setData(allData); // Set the fetched data to state
      } catch (error) {
        console.error('Error fetching images: ', error);
      }
    };

    fetchImages();
  }, []);

  // Define a default image URL
  const defaultImageUrl = 'https://firebasestorage.googleapis.com/v0/b/harshalhousing.appspot.com/o/rentalImages%2FrentalImg_image_1718195248734_0?alt=media&token=db660b4a-a701-4eae-8d48-0c40c5dddd48';

  // Function to get data for a specific collection
  const getDataForCollection = (collectionName) => {
    return data.filter(item => item.collection === collectionName);
  };

  // Display only one form's data at a time
  const collectionName = 'rental'; // Adjust this to the desired collection name
  const currentCollectionData = getDataForCollection(collectionName);

  return (
    <ScrollView>
      <View>
        <View style={styles.container}>
          {/* <Carousel images={images} /> */}
        </View>
        <View style={styles.backdrop}>
          {currentCollectionData.map(item => (
            <View key={item.id}>
              <ImageBackground
                source={{ uri: item.image || defaultImageUrl }} // Use item's image or default image URL
                style={styles.image}
                resizeMode="cover">
                  
                <View style={styles.overlay}>
                  <Text style={styles.name}>{item.name}</Text>
                  <Text style={styles.collection}>{item.collection}</Text>
                </View>
              </ImageBackground>
            </View>
          ))}
        </View>
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    height: hp('30'),
    width: wp('100'),
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
    overflow: 'hidden',
  },
  backdrop: {
    paddingLeft: 10,
  },
  image: {
    height: hp('20'),
    width: wp('90'),
    marginBottom: 10,
  },
  overlay: {
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    padding: 10,
  },
  name: {
    fontSize: 20,
    color: 'white',
    fontWeight: 'bold',
  },
  collection: {
    fontSize: 16,
    color: 'white',
  },
});
