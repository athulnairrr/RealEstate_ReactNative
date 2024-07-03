import React, { useState, useEffect } from 'react';
import {
  View,
  TextInput,
  Button,
  FlatList,
  StyleSheet,
  Text,
  TouchableOpacity,
  ScrollView,
} from 'react-native';
import { collection, getDocs } from 'firebase/firestore';
import { useNavigation } from '@react-navigation/native';
import { Firebase_store } from '../Firebase';
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';

// Define the type for the data items
interface Property {
  id: string;
  name: string;
  configuration: string;
  price: number;
  propertyAddress: string;
  parking: string;
  carpet: string;
  direction: string;
}

// Define the type for the filters
interface Filters {
  configuration: string;
  priceRange: string;
  parking: string;
  carpet: string;
  direction: string;
}

const BuilderReqFilter: React.FC = () => {
  const navigation = useNavigation();
  const [data, setData] = useState<Property[]>([]);
  const [filters, setFilters] = useState<Filters>({
    configuration: '',
    priceRange: '',
    parking: '',
    carpet: '',
    direction: '',
  });
  const [filteredData, setFilteredData] = useState<Property[]>([]);

  useEffect(() => {
    const fetchData = async () => {
      const propertiesCollectionRef = collection(Firebase_store, 'builder');
      const querySnapshot = await getDocs(propertiesCollectionRef);
      const fetchedData: Property[] = [];
      querySnapshot.forEach(doc => {
        fetchedData.push({ id: doc.id, ...(doc.data() as Omit<Property, 'id'>) });
      });
      setData(fetchedData);
      setFilteredData(fetchedData); // Set filteredData to the initial data
    };
    fetchData();
  }, []);

  const filterData = (filters: Filters) => {
    let filtered = [...data]; // Start with a copy of the original data

    // Filter by configuration
    if (filters.configuration) {
      filtered = filtered.filter(item => item.configuration === filters.configuration);
    }

    // Filter by price range
    if (filters.priceRange) {
      const [min, max] = filters.priceRange.split('-').map(Number);
      filtered = filtered.filter(item => {
        const price = item.price;
        return price >= min && price <= max;
      });
    }

    // Filter by parking availability
    if (filters.parking) {
      filtered = filtered.filter(item => item.parking === filters.parking);
    }

    // Filter by carpet availability
    if (filters.carpet) {
      filtered = filtered.filter(item => item.carpet === filters.carpet);
    }

    // Filter by direction
    if (filters.direction) {
      filtered = filtered.filter(item => item.direction === filters.direction);
    }

    setFilteredData(filtered);
  };

  const handleFilterChange = (filterName: keyof Filters, value: string) => {
    setFilters({ ...filters, [filterName]: value });
  };

  const handleApplyFilters = () => {
    filterData(filters);
  };

  return (
    <ScrollView>
      <View>
        <View style={styles.container}>
          <View style={styles.overlayer}>
            <Text style={styles.maintext}>Builder Req</Text>
            <Text style={styles.thetext}>Let's find the best for you.</Text>
          </View>
          <TouchableOpacity
            style={styles.button}
            onPress={() => navigation.goBack()}
          >
            <Text style={styles.text}>Back</Text>
          </TouchableOpacity>
        </View>
        <View style={styles.containerfilter}>
          {/* Configuration filter */}
          <TextInput
            style={styles.input}
            placeholder="Filter by configuration"
            value={filters.configuration}
            onChangeText={(text) => handleFilterChange('configuration', text)}
          />

          {/* Price range filter */}
          <TextInput
            style={styles.input}
            placeholder="Filter by price range (e.g., 100000-500000)"
            value={filters.priceRange}
            onChangeText={(text) => handleFilterChange('priceRange', text)}
          />

          {/* Parking filter */}
          <TextInput
            style={styles.input}
            placeholder="Filter by parking availability"
            value={filters.parking}
            onChangeText={(text) => handleFilterChange('parking', text)}
          />

          {/* Carpet filter */}
          <TextInput
            style={styles.input}
            placeholder="Filter by carpet availability"
            value={filters.carpet}
            onChangeText={(text) => handleFilterChange('carpet', text)}
          />

          {/* Direction filter */}
          <TextInput
            style={styles.input}
            placeholder="Filter by direction"
            value={filters.direction}
            onChangeText={(text) => handleFilterChange('direction', text)}
          />

          <Button title="Apply Filters" onPress={handleApplyFilters} />

          <FlatList
            data={filteredData}
            keyExtractor={(item) => item.id}
            renderItem={({ item }) => (
              <View style={styles.item}>
                <Text>Name: {item.name}</Text>
                <Text>Configuration: {item.configuration}</Text>
                <Text>Price: {item.price}</Text>
                <Text>Property Address: {item.propertyAddress}</Text>
                <Text>Parking: {item.parking}</Text>
                <Text>Carpet: {item.carpet}</Text>
                <Text>Direction: {item.direction}</Text>
                {/* Render other fields */}
              </View>
            )}
          />
        </View>
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  containerfilter: {
    padding: 20,
  },
  text: {
    fontSize: hp('2.5'),
    fontWeight: 'bold',
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
  input: {
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 5,
    padding: 10,
    marginBottom: 10,
  },
  item: {
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 5,
    padding: 10,
    marginBottom: 10,
  },
  container: {
    height: hp('30'),
    width: wp('100'),
    borderTopLeftRadius: 20, // Border radius for the top left corner
    borderTopRightRadius: 20, // Border radius for the top right corner
    overflow: 'hidden',
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
});

export default BuilderReqFilter;
