import React from 'react';
import {useState,} from 'react';
import {
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
  ScrollView,
  KeyboardAvoidingView,
  Platform,
  TextInput,
  Button
} from 'react-native';
import {useNavigation} from '@react-navigation/native';
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';
import {collection, addDoc, serverTimestamp} from 'firebase/firestore';
import {Firebase_store} from '../Firebase';
import { Alert } from 'react-native';
import { Dropdown } from 'react-native-element-dropdown';
import {Calendar} from 'react-native-feather';
import DatePicker from 'react-native-date-picker';


const data = [
  { label: '1 BHK', value: '1 BHK' },
  { label: '2 BHK', value: '2 BHK' },
  { label: '3 BHK', value: '3 BHK' },
  { label: '4 BHK', value: '4 BHK' },
  { label: '5 BHK', value: '5 BHK' },
  { label: '6 BHK', value: '6 BHK' },
  { label: '7 BHK', value: '7 BHK' },
  { label: '8 BHK', value: '8 BHK' },
];


export default function StockEntryBuilder() {
  const navigation = useNavigation();
  const [date, setDate] = useState(new Date());
  const [open, setOpen] = useState(false);

  const [name, setName] = useState('');
  const [contact, setContact] = useState('');
  const [priceAbove, setPriceAbove] = useState('');
  const [priceBelow, setPriceBelow] = useState('');
  const [propertyAddress, setPropertyAddress] = useState('');
  const [CarpetBelow, setCarpetBelow] = useState('');
  const [CarpetAbove, setCarpetAbove] = useState('');
  const [amenities, setAmenities] = useState('');
  const [paymentSchedule, setPaymentSchedule] = useState('');
  const [additionalNotes, setAdditionalNotes] = useState('');
  const timestamp = serverTimestamp();
  const [value, setValue] = useState(null);

  const handleSubmit = async () => {
    // if (
    //   !date ||
    //   !name ||
    //   !contact ||
    //   !configuration ||
    //   !price ||
    //   !propertyAddress ||
    //   !parking ||
    //   !carpet ||
    //   !direction ||
    //   !additionalNotes
    // ) {
    //   Alert.alert('Please fill in all fields or write "NA" if not applicable.');
    //   return;
    // }
    const builderCollectionRef  = collection(Firebase_store, 'builder');

    const newProperty = {
      date: date || 'NA',
      name: name || 'NA',
      contact: contact || 'NA',
      priceBelow: priceBelow || 'NA',
      priceAbove: priceAbove || 'NA',
      propertyAddress: propertyAddress || 'NA',
      parking: CarpetAbove || 'NA',
      carpet: CarpetBelow || 'NA',
      amenities: amenities || 'NA',
      paymentSchedule: paymentSchedule || 'NA',
      additionalNotes: additionalNotes || 'NA',
      timestamp: timestamp,
      value: value,
    };

    try {
      const docRef = await addDoc(builderCollectionRef , newProperty);
      console.log(`Document added with ID: ${docRef.id}`);
      // Reset the form fields after submitting
      setDate('');
      setName('');
      setContact('');
      setPriceBelow('');
      setPriceAbove('');
      setPropertyAddress('');
      setCarpetAbove('');
      setCarpetBelow('');
      setAmenities('');
      setPaymentSchedule('');
      setAdditionalNotes('');
      setValue(null);
    } catch (e) {
      console.error('Error adding document: ', e);
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
              <Text style={styles.maintext}>Stock Builder</Text>
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
          <Dropdown
      style={styles.input}
      placeholderStyle={styles.placeholderStyle}
      selectedTextStyle={styles.selectedTextStyle}
      inputSearchStyle={styles.inputSearchStyle}
      iconStyle={styles.iconStyle}
      data={data}
    //   search
      maxHeight={300}
      labelField="label"
      valueField="value"
      placeholder="Configuration"
      searchPlaceholder="Search..."
      value={value}
      onChange={item => {
        setValue(item.value);
      }}
    />
          <View style={styles.datecontainer}>
              <View style={styles.dateContainer}>
                <TextInput
                  style={styles.inputbtn}
                  value={`${date.getDate()}/${date.getMonth() + 1}/${date.getFullYear()}`}
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
            placeholder="Price Above"
            value={priceAbove}
            onChangeText={setPriceAbove}
          />
          <TextInput
            style={styles.input}
            placeholder="Price Below"
            value={priceBelow}
            onChangeText={setPriceBelow}
          />
          <TextInput
            style={styles.input}
            placeholder="Property Address"
            value={propertyAddress}
            onChangeText={setPropertyAddress}
          />
          
          <TextInput
            style={styles.input}
            placeholder="CarpetAbove"
            value={CarpetAbove}
            onChangeText={setCarpetAbove}
          />
          <TextInput
            style={styles.input}
            placeholder="CarpetBelow"
            value={CarpetBelow}
            onChangeText={setCarpetBelow}
          />
          <TextInput
            style={styles.input}
            placeholder="Amenities"
            value={amenities}
            onChangeText={setAmenities}
          />
          <TextInput
            style={styles.input}
            placeholder="Payment Schedule"
            value={paymentSchedule}
            onChangeText={setPaymentSchedule}
          />
          <TextInput
            style={styles.input}
            placeholder="Additional Notes"
            value={additionalNotes}
            onChangeText={setAdditionalNotes}
          />
          <Button title="Submit" onPress={handleSubmit} />
        </View>
        </ScrollView>
      </KeyboardAvoidingView>
    </View>
  );
}

const styles = StyleSheet.create({
  text: {
    fontSize: hp('2.5'),
    fontWeight: 'bold',
  },
  container: {
    height: hp('30'),
    width: wp('100'),
    borderTopLeftRadius: 20, // Border radius for the top left corner
    borderTopRightRadius: 20, // Border radius for the top right corner
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
  scrollView: {
    flexGrow: 1,
    paddingBottom: hp('5'),
  },
  keyboardAvoidingContainer: {
    flexGrow: 1,
  },
  formcontainer: {
    padding: 20,
  },
  input: {
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 5,
    padding: 10,
    marginBottom: 10,
  },
  dropdown: {
    margin: 16,
    height: 50,
    borderBottomColor: 'gray',
    borderBottomWidth: 0.5,
  },
  icon: {
    marginRight: 5,
  },
  placeholderStyle: {
    fontSize: 16,
  },
  selectedTextStyle: {
    fontSize: 16,
  },
  iconStyle: {
    width: 20,
    height: 20,
  },
  inputSearchStyle: {
    height: 40,
    fontSize: 16,
  },
  dateContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    borderWidth: 1,
    borderColor: 'gray',
    borderRadius: 5,
    // padding: 10,
    paddingLeft: 8,
    paddingRight: 8,
    marginBottom: 10,
  },
  inputbtn: {
    flex: 1,
    marginRight: 10,
    color: 'black',
  },
});
