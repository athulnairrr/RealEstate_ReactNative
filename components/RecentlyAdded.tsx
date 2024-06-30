import {
  StyleSheet,
  Text,
  View,
  ScrollView,
  ImageBackground,
} from 'react-native';
import {SafeAreaView} from 'react-native-safe-area-context';
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';
import {collection, getDocs} from 'firebase/firestore';
import {Firebase_store} from './Firebase';
import React, {useState, useEffect} from 'react';
import {useNavigation} from '@react-navigation/native';

export default function RecentlyAdded() {
  const navigation = useNavigation();
  const [data, setData] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');

  useEffect(() => {
    const fetchData = async () => {
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

      // Sort by timestamp and take the top 8
      const sortedData = allData
        .sort((a, b) => b.timestamp - a.timestamp)
        .slice(0, 8);
      setData(sortedData);
    };
    fetchData();
  }, []);

  const filteredData = data.filter(
    item => item.propertyAddress && item.propertyAddress.includes(searchTerm),
  );

  return (
    <SafeAreaView>
      <ScrollView horizontal={true}>
        {filteredData.map(item => (
          <View key={item.id} style={styles.cardholder}>
            <View style={styles.leftContainer}>
              {/* <ImageBackground
                source={{ uri: item['images'][0] || 'https://firebasestorage.googleapis.com/v0/b/harshalhousing.appspot.com/o/rentalImages%2FrentalImg_image_1718352992894_0?alt=media&token=661008aa-4896-41b1-87a8-37ff8e7183e6' }}
                style={styles.backgroundImage}
                resizeMode="cover">
                <View style={styles.overlayer}>
                  <Text style={styles.maintext} numberOfLines={1}>{item.name || 'House Name'}</Text>
                  <Text style={styles.thetext} numberOfLines={2}>{item.propertyAddress || 'House Description keep it short and readable. Lorem ipsum dolor sit amet consectetur. Lorem ipsum dolor sit amet.'}</Text>
                  <Text style={styles.databaseText}>{item.collection}</Text>
                </View>
              </ImageBackground> */}
              <ImageBackground
                source={{
                  uri:
                    item['images'] && item['images'][0]
                      ? item['images'][0]
                      : 'https://firebasestorage.googleapis.com/v0/b/harshalhousing.appspot.com/o/rentalImages%2FrentalImg_image_1718352992894_0?alt=media&token=661008aa-4896-41b1-87a8-37ff8e7183e6'
                }}
                // source={{uri: 'https://source.unsplash.com/random/?kitchen'}}

                style={styles.backgroundImage}
                resizeMode="cover">
                <View style={styles.overlayer}>
                  <Text style={styles.maintext} numberOfLines={1}>
                    {item.name || 'House Name'}
                  </Text>
                  <Text style={styles.thetext} numberOfLines={2}>
                    {item.propertyAddress ||
                      'House Description keep it short and readable. Lorem ipsum dolor sit amet consectetur. Lorem ipsum dolor sit amet.'}
                  </Text>
                  <Text style={styles.databaseText}>{item.collection}</Text>
                </View>
              </ImageBackground>
              {/* <Carousel
                data={data}
                renderItem={renderItem}
                loop
                autoPlay = {false}
                autoplayInterval={3000} // Set the autoplay interval in milliseconds
              /> */}
            </View>
          </View>
        ))}
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  cardholder: {
    margin: 8,
    height: hp('23'),
    width: wp('90'),
    borderRadius: 20,
    overflow: 'hidden',
    flexDirection: 'row',
  },
  leftContainer: {
    flex: 1 ,
    borderTopLeftRadius: 20,
    borderBottomLeftRadius: 20,
    overflow: 'hidden',
  },
  rightContainer: {
    flex: 1,
    flexDirection: 'column',
    justifyContent: 'space-between',
    alignItems: 'center',
    backgroundColor: '#f0f0f0',
  },
  box: {
    width: '100%',
    height: hp('7'),
  },
  boxoverlayer: {
    width: '100%',
    height: hp('7'),
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
  },
  sideImage: {
    width: '100%',
    height: hp('7'),
    resizeMode: 'cover',
    position: 'absolute',
  },
  maintext: {
    fontSize: hp('4'),
    color: '#ffffff',
    fontWeight: 'bold',
  },
  thetext: {
    fontSize: hp('2'),
    color: '#ffffff',
  },
  overlayer: {
    height: hp('23'),
    width: wp('65'),
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    justifyContent: 'flex-end',
    paddingLeft: wp('3'),
    paddingBottom: hp('2'),
  },
  backgroundImage: {
    flex: 1,
    resizeMode: 'cover',
    position: 'absolute',
    height: hp('23'),
    width: wp('65'),
  },
  databaseText: {
    fontSize: hp('2'),
    color: '#ffffff',
  },
});
