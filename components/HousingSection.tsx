import React from 'react';
import {
  StyleSheet,
  Text,
  View,
  ImageBackground,
  TouchableOpacity,
} from 'react-native';
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';
import { useNavigation, NavigationProp } from '@react-navigation/native';

const HousingSection: React.FC = () => {
  const navigation = useNavigation<NavigationProp<any>>();

  return (
    <View>
      <TouchableOpacity
        style={styles.container1}
        onPress={() => navigation.navigate('Stock')}>
        <View style={styles.container1}>
          {/* <ImageBackground
            source={require('../assets/banner.jpg')}
            style={styles.backgroundImage}
            resizeMode="cover"
          /> */}
          <View style={styles.overlayer}>
            <Text style={styles.maintext}>Stock</Text>
            <Text style={styles.thetext}>We got what you need.</Text>
          </View>
        </View>
      </TouchableOpacity>
      <TouchableOpacity
        style={styles.container1}
        onPress={() => navigation.navigate('StockEntry')}>
        <View style={styles.container2}>
          {/* <ImageBackground
            source={require('../assets/banner.jpg')}
            style={styles.backgroundImage}
            resizeMode="cover"
          /> */}
          <View style={styles.overlayer}>
            <Text style={styles.maintext}>Stock Entry</Text>
            <Text style={styles.thetext}>Lets find the best for you.</Text>
          </View>
        </View>
      </TouchableOpacity>
      <TouchableOpacity
        style={styles.container1}
        onPress={() => navigation.navigate('Requirements')}>
        <View style={styles.container3}>
          {/* <ImageBackground
            source={require('../assets/banner.jpg')}
            style={styles.backgroundImage}
            resizeMode="cover"
          /> */}
          <View style={styles.overlayer}>
            <Text style={styles.maintext}>Requirements</Text>
            <Text style={styles.thetext}>We want to know you better.</Text>
          </View>
        </View>
      </TouchableOpacity>
      <TouchableOpacity
        style={styles.container1}
        onPress={() => navigation.navigate('FollowUp')}>
        <View style={styles.container4}>
          {/* <ImageBackground
            source={require('../assets/banner.jpg')}
            style={styles.backgroundImage}
            resizeMode="cover"
          /> */}
          <View style={styles.overlayer}>
            <Text style={styles.maintext}>Follow Up</Text>
            <Text style={styles.thetext}>We find the best for you.</Text>
          </View>
        </View>
      </TouchableOpacity>
      <TouchableOpacity
        style={styles.container1}
        onPress={() => navigation.navigate('TryIt')}>
        <View style={styles.container4}>
          {/* <ImageBackground
            source={require('../assets/banner.jpg')}
            style={styles.backgroundImage}
            resizeMode="cover"
          /> */}
          <View style={styles.overlayer}>
            <Text style={styles.maintext}>Try IT</Text>
            <Text style={styles.thetext}>We find the best for you.</Text>
          </View>
        </View>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container1: {
    width: wp('100%'),
    height: hp('20%'),
    backgroundColor: 'red',
  },
  container2: {
    width: wp('100%'),
    height: hp('20%'),
    backgroundColor: 'blue',
  },
  container3: {
    width: wp('100%'),
    height: hp('20%'),
    backgroundColor: 'green',
  },
  container4: {
    width: wp('100%'),
    height: hp('20%'),
    backgroundColor: 'black',
  },
  maintext: {
    fontSize: hp('5%'),
    color: '#ffffff',
    fontWeight: 'bold',
  },
  thetext: {
    fontSize: hp('2%'),
    color: '#ffffff',
  },
  overlayer: {
    height: hp('20%'),
    width: wp('100%'),
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    alignItems: 'center',
    justifyContent: 'center',
  },
  // backgroundImage: {
  //   flex: 1,
  //   resizeMode: 'cover',
  //   position: 'absolute',
  //   height: hp('30%'),
  //   width: wp('100%'),
  // },
});

export default HousingSection;
