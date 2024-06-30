import React, { useState, useEffect } from 'react';
import { useNavigation } from '@react-navigation/native';
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';
import { View, Text,TextInput, FlatList, StyleSheet, TouchableOpacity } from 'react-native';
import { collection, getDocs } from 'firebase/firestore';
import { Firebase_store } from '../Firebase'; 

export default function StockResale() {
  const navigation = useNavigation();
  const [data, setData] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');

  useEffect(() => {
    const fetchData = async () => {
      const resaleCollectionRef = collection(Firebase_store, 'resale');
      const querySnapshot = await getDocs(resaleCollectionRef);
      const fetchedData = [];
      querySnapshot.forEach(doc => {
        fetchedData.push({ id: doc.id, ...doc.data() });
      });
      setData(fetchedData);
    };
    fetchData();
  }, []);

  const filteredData = data.filter(item => item.propertyAddress && item.propertyAddress.includes(searchTerm));

  return (
    <View>
      <View style={styles.container}>
        <View style={styles.overlayer}>
          <Text style={styles.maintext}>Stock Resale</Text>
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
        <TextInput
          style={styles.searchInput}
          placeholder="Search by address..."
          value={searchTerm}
          onChangeText={setSearchTerm}
        />
      </View>
      <View style={styles.containermain}>
        <FlatList
          data={filteredData.slice(0, 5)} // Show only the first 5 entries
          keyExtractor={item => item.id}
          renderItem={({ item }) => (
            <View style={styles.item}>
              <Text style={styles.name}>{item.name}</Text>
              <Text style={styles.address}>{item.propertyAddress}</Text>
            </View>
          )}
        />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    height: hp('30'),
    width: wp('100'),
    borderTopLeftRadius: 20, // Border radius for the top left corner
    borderTopRightRadius: 20, // Border radius for the top right corner
    overflow: 'hidden',
  },
  text: {
    fontSize: hp('2.5'),
    fontWeight: 'bold',
  },
  containermain: {
    height: hp('100'),
    width: wp('100'),
    borderTopLeftRadius: 20, // Border radius for the top left corner
    borderTopRightRadius: 20, // Border radius for the top right corner
    overflow: 'hidden',
  },
  item: {
    marginBottom: 10,
    padding: 10,
    borderWidth: 1,
    borderRadius: 5,
    borderColor: '#ccc',
  },
  name: {
    fontSize: 18,
    fontWeight: 'bold',
  },
  address: {
    fontSize: 16,
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
  button: {
    width: wp('20'),
    position: 'absolute',
    right: wp('1'), 
    marginTop: hp('3'),
    marginRight: wp('5'),
    alignItems: 'flex-end',
    padding: hp('2'),
    borderRadius: hp('3')
  },
  bgcontainer: {
    width: wp('100'),
    marginTop: 10,
    marginLeft: 10,
    marginBottom: 10,
  },
  bgtext: {
    fontSize: hp('2.5'),
    width: wp('100'),
    color: '#000000',
    fontWeight: 'bold',
  },
  searchInput: {
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 5,
    padding: 10,
    margin: 10,
  },
});
