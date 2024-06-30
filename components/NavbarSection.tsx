import { 
    SafeAreaView, 
    StyleSheet, 
    Text, 
    View,
    ScrollView
} from 'react-native'
import React from 'react'
import {widthPercentageToDP as wp, heightPercentageToDP as hp} from 'react-native-responsive-screen';


export default function NavbarSection() {
  return (
    <SafeAreaView>
        <ScrollView>
        <View style={styles.container}>
        <View style={styles.textWrapper}>
          <Text style={styles.myText}>Hi, Harshal</Text>
        </View>
        
      </View>
        </ScrollView>
    </SafeAreaView>
  )
}

const styles = StyleSheet.create({
    container: { 
        flex: 1,
        flexDirection: 'row',
        
    },
    textWrapper: {
      flex: 1,
      height: hp('8%'),
      width: wp('100%'),
      flexDirection: 'row',
      alignItems: 'center',
      marginLeft: 8
    },
    myText: {
      fontSize: hp('3%'),
      color: 'black',
      fontWeight: 'bold'
    },
    
    
  })