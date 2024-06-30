import {
  StyleSheet,
  Text,
  View,
  ScrollView,
  ImageBackground,
} from 'react-native';
import React from 'react';
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';
import {SafeAreaView} from 'react-native-safe-area-context';

export default function RecommendedSection() {
  return (
    <SafeAreaView>
      <ScrollView>
        <View style={styles.container}>
          <View style={styles.card}>
            <View style={styles.backgroundImage}>
              <ImageBackground
                source={{uri: 'https://source.unsplash.com/random/?hall'}}
                style={styles.backgroundImage}
                resizeMode="cover">
                <View style={styles.overlayer}>
                  <Text style={styles.maintext} numberOfLines={1}>
                    House Name
                  </Text>
                </View>
              </ImageBackground>
            </View>

            <View style={styles.textbox}>
              <Text style={styles.thetext}> Address</Text>
              <Text style={styles.thethetext}>
                A1/504, Harassiddh Park, Pawar Nagar, Thane(west)
              </Text>
              <View style={styles.button}>
                <Text style={styles.buttonText}>Know More</Text>
              </View>
            </View>
          </View>

          <View style={styles.card}>
            <View style={styles.backgroundImage}>
              <ImageBackground
                source={{uri: 'https://source.unsplash.com/random/?hall'}}
                style={styles.backgroundImage}
                resizeMode="cover">
                <View style={styles.overlayer}>
                  <Text style={styles.maintext} numberOfLines={1}>
                    House Name
                  </Text>
                </View>
              </ImageBackground>
            </View>

            <View style={styles.textbox}>
              <Text style={styles.thetext}> Address</Text>
              <Text style={styles.thethetext}>
                A1/504, Harassiddh Park, Pawar Nagar, Thane(west)
              </Text>
              <View style={styles.button}>
                <Text style={styles.buttonText}>Know More</Text>
              </View>
            </View>
          </View>

          <View style={styles.card}>
            <View style={styles.backgroundImage}>
              <ImageBackground
                source={{uri: 'https://source.unsplash.com/random/?hall'}}
                style={styles.backgroundImage}
                resizeMode="cover">
                <View style={styles.overlayer}>
                  <Text style={styles.maintext} numberOfLines={1}>
                    House Name
                  </Text>
                </View>
              </ImageBackground>
            </View>

            <View style={styles.textbox}>
              <Text style={styles.thetext}> Address</Text>
              <Text style={styles.thethetext}>
                A1/504, Harassiddh Park, Pawar Nagar, Thane(west)
              </Text>
              <View style={styles.button}>
                <Text style={styles.buttonText}>Know More</Text>
              </View>
            </View>
          </View>

          <View style={styles.card}>
            <View style={styles.backgroundImage}>
              <ImageBackground
                source={{uri: 'https://source.unsplash.com/random/?hall'}}
                style={styles.backgroundImage}
                resizeMode="cover">
                <View style={styles.overlayer}>
                  <Text style={styles.maintext} numberOfLines={1}>
                    House Name
                  </Text>
                </View>
              </ImageBackground>
            </View>

            <View style={styles.textbox}>
              <Text style={styles.thetext}> Address</Text>
              <Text style={styles.thethetext}>
                A1/504, Harassiddh Park, Pawar Nagar, Thane(west)
              </Text>
              <View style={styles.button}>
                <Text style={styles.buttonText}>Know More</Text>
              </View>
            </View>
          </View>

          <View style={styles.card}>
            <View style={styles.backgroundImage}>
              <ImageBackground
                source={{uri: 'https://source.unsplash.com/random/?hall'}}
                style={styles.backgroundImage}
                resizeMode="cover">
                <View style={styles.overlayer}>
                  <Text style={styles.maintext} numberOfLines={1}>
                    House Name
                  </Text>
                </View>
              </ImageBackground>
            </View>

            <View style={styles.textbox}>
              <Text style={styles.thetext}> Address</Text>
              <Text style={styles.thethetext}>
                A1/504, Harassiddh Park, Pawar Nagar, Thane(west)
              </Text>
              <View style={styles.button}>
                <Text style={styles.buttonText}>Know More</Text>
              </View>
            </View>
          </View>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    width: wp('100'),
    alignItems: 'center',
    justifyContent: 'center',
  },

  card: {
    height: hp('50'),
    width: wp('85'),
    margin: 8,
    borderColor: 'black',
    borderWidth: 2,
    flex: 1,
    borderRadius: 20,
    overflow: 'hidden',
  },

  textbox: {
    position: 'absolute',
    top: hp('26'),
    width: wp('85'),
    height: hp('26'),
    paddingLeft: 8,
    backgroundColor: '#f5f5f5',
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
    flex: 1,
    paddingTop: hp('1'),
  },

  button: {
    width: wp('40'),
    height: hp('7'),
    position: 'absolute',
    top: hp('13'),
    left: wp('20'),
    backgroundColor: '#ffdab9',
    margin: 8,
    borderRadius: 50,
    borderColor: 'black',
    borderWidth: 2,
    overflow: 'hidden',
    alignItems: 'center',
    justifyContent: 'center',
  },

  buttonText: {
    fontSize: hp('3'),
    color: 'black',
    fontWeight: 'bold',
  },

  maintext: {
    fontSize: hp('4'),
    color: '#ffffff',
    fontWeight: 'bold',
    paddingBottom: hp('2'),
  },

  thetext: {
    fontSize: hp('2.5'),
    color: '#000000',
    fontWeight: 'bold',
  },

  thethetext: {
    fontSize: hp('2.2'),
    color: '#000000',
    fontWeight: 'bold',
    paddingTop: 8,
  },

  backgroundImage: {
    flex: 1,
    resizeMode: 'cover',
    position: 'absolute',
    height: hp('28'),
    width: wp('85'),
    backgroundColor: 'red',
  },

  overlayer: {
    height: hp('27'),
    width: wp('85'),
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    justifyContent: 'flex-end',
    alignItems: 'center',
    paddingLeft: 8,
  },
});
