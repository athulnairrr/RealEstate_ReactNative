import React from 'react';
import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  ScrollView,
} from 'react-native';
import { useNavigation } from '@react-navigation/native';
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';

// Define the type for navigation
type NavigationProp = {
  navigate: (screen: string) => void;
  goBack: () => void;
};

export default function RequirementsScreen() {
  const navigation = useNavigation<NavigationProp>();

  return (
    <View>
      <ScrollView>
        <View style={styles.container}>
          <View style={styles.overlayer}>
            <Text style={styles.maintext}>Requirements</Text>
            <Text style={styles.thetext}>Let's find the best for you.</Text>
          </View>
          <TouchableOpacity
            style={styles.button}
            onPress={() => navigation.goBack()}
          >
            <Text style={styles.text}>Back</Text>
          </TouchableOpacity>
        </View>
        <Text style={styles.thebgtext}>Let's Find Out</Text>
        <TouchableOpacity
          style={styles.container1}
          onPress={() => navigation.navigate('ResaleReqFilter')}
        >
          <View style={styles.container1}>
            {/* <ImageBackground
              source={require('../assets/banner.jpg')}
              style={styles.backgroundImage}
              resizeMode="cover"
            /> */}
            <View style={styles.overlayertext}>
              <Text style={styles.maintext}>Resale</Text>
              <Text style={styles.thetext}>We got what you need.</Text>
            </View>
          </View>
        </TouchableOpacity>
        <TouchableOpacity
          style={styles.container1}
          onPress={() => navigation.navigate('RentalReqFilter')}
        >
          <View style={styles.container2}>
            {/* <ImageBackground
              source={require('../assets/banner.jpg')}
              style={styles.backgroundImage}
              resizeMode="cover"
            /> */}
            <View style={styles.overlayertext}>
              <Text style={styles.maintext}>Rental</Text>
              <Text style={styles.thetext}>Let's find the best for you.</Text>
            </View>
          </View>
        </TouchableOpacity>
        <TouchableOpacity
          style={styles.container1}
          onPress={() => navigation.navigate('BuilderReqFilter')}
        >
          <View style={styles.container3}>
            {/* <ImageBackground
              source={require('../assets/banner.jpg')}
              style={styles.backgroundImage}
              resizeMode="cover"
            /> */}
            <View style={styles.overlayertext}>
              <Text style={styles.maintext}>Builder</Text>
              <Text style={styles.thetext}>We want to know you better.</Text>
            </View>
          </View>
        </TouchableOpacity>
        <TouchableOpacity
          style={styles.container1}
          onPress={() => navigation.navigate('CommercialReqFilter')}
        >
          <View style={styles.container4}>
            {/* <ImageBackground
              source={require('../assets/banner.jpg')}
              style={styles.backgroundImage}
              resizeMode="cover"
            /> */}
            <View style={styles.overlayertext}>
              <Text style={styles.maintext}>Commercial</Text>
              <Text style={styles.thetext}>We find the best for you.</Text>
            </View>
          </View>
        </TouchableOpacity>
        <Text style={styles.thebgtext}>Footer</Text>
      </ScrollView>
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
    borderRadius: hp('3'),
  },
  maintext: {
    fontSize: hp('5'),
    color: '#ffffff',
    fontWeight: 'bold',
  },
  thebgtext: {
    margin: 8,
    fontSize: hp('3'),
    color: 'black',
    fontWeight: 'bold',
  },
  thetext: {
    fontSize: hp('2'),
    color: '#ffffff',
  },
  text: {
    fontSize: hp('2.5'),
    fontWeight: 'bold',
  },
  container1: {
    width: wp('100'),
    height: hp('20'),
    backgroundColor: 'red',
  },
  container2: {
    width: wp('100'),
    height: hp('20'),
    backgroundColor: 'blue',
  },
  container3: {
    width: wp('100'),
    height: hp('20'),
    backgroundColor: 'green',
  },
  container4: {
    width: wp('100'),
    height: hp('20'),
    backgroundColor: 'black',
  },
  overlayertext: {
    height: hp('20'),
    width: wp('100'),
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
