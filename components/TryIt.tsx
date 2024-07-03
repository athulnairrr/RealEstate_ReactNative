import React, { useEffect, useState } from 'react';
import { View, StyleSheet, Text, ScrollView, ImageBackground } from 'react-native';
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen';
import { collection, getDocs } from 'firebase/firestore';
import { Firebase_store } from './Firebase';
// import Carousel from './Carousel'; // Uncomment if using Carousel component

type PropertyData = {
  id: string;
  name?: string;
  images?: string[];
  collection: string;
};

export default function TryIt() {
  const [images, setImages] = useState<string[]>([]);
  const [data, setData] = useState<PropertyData[]>([]);
  const [searchTerm, setSearchTerm] = useState<string>('');

  useEffect(() => {
    const fetchImages = async () => {
      try {
        const collectionRef = collection(Firebase_store, 'rental');
        const querySnapshot = await getDocs(collectionRef);

        const fetchedImages: string[] = querySnapshot.docs.flatMap(
          doc => doc.data().images || [],
        );

        const collections = ['resale', 'rental', 'builder', 'commercial'];
        const promises = collections.map(async (collectionName) => {
          const collectionRef = collection(Firebase_store, collectionName);
          const querySnapshot = await getDocs(collectionRef);
          return querySnapshot.docs.map((doc) => ({
            id: doc.id,
            ...doc.data(),
            collection: collectionName,
          })) as PropertyData[];
        });

        const results = await Promise.all(promises);
        const allData = results.flat();

        setImages(fetchedImages);
        setData(allData);
      } catch (error) {
        console.error('Error fetching images: ', error);
      }
    };

    fetchImages();
  }, []);

  const defaultImageUrl = 'https://firebasestorage.googleapis.com/v0/b/harshalhousing.appspot.com/o/rentalImages%2FrentalImg_image_1718195248734_0?alt=media&token=db660b4a-a701-4eae-8d48-0c40c5dddd48';

  const getDataForCollection = (collectionName: string) => {
    return data.filter(item => item.collection === collectionName);
  };

  const collectionName = 'rental';
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
                source={{ uri: item.images && item.images[0] ? item.images[0] : defaultImageUrl }}
                style={styles.image}
                resizeMode="cover">
                <View style={styles.overlay}>
                  <Text style={styles.name}>{item.name || 'Unknown Name'}</Text>
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
    height: hp('30%'),
    width: wp('100%'),
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
    overflow: 'hidden',
  },
  backdrop: {
    paddingLeft: 10,
  },
  image: {
    height: hp('20%'),
    width: wp('90%'),
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
