import {StyleSheet, Text, View, ImageBackground} from 'react-native';
import React from 'react';
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';

export default function bannerSection() {
  return (
    <View style={styles.container}>
      <ImageBackground
        source={require('../assets/banner.jpg')}
        style={styles.backgroundImage}
        resizeMode="cover"></ImageBackground>
      <View style={styles.overlayer}>
        <Text style={styles.maintext}>Housing</Text>
        <Text style={styles.thetext}>We find the best for you.</Text>
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

  backgroundImage: {
    flex: 1,
    resizeMode: 'cover',
    position: 'absolute',
    height: hp('30'),
    width: wp('100'),
  },
});
