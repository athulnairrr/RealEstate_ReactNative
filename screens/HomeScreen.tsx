import { StyleSheet, Text, View, ScrollView } from 'react-native'
import React from 'react'
import {widthPercentageToDP as wp, heightPercentageToDP as hp} from 'react-native-responsive-screen';
import { SafeAreaView } from 'react-native-safe-area-context'
import NavbarSection from '../components/NavbarSection'
import BannerSection from '../components/BannerSection'
// import RecommendedSection from '../components/RecommendedSection';
import HousingSection from '../components/HousingSection';
import RecentlyAdded from '../components/RecentlyAdded';
import FormComponent from '../components/FormComponent';





export default function MainSection() {
  return (
    <SafeAreaView>
        <ScrollView>
            <NavbarSection />
            <BannerSection />
            {/* <Text style = {[styles.thetext, styles.container]}>Recently Added</Text> */}
            {/* <RecentlyAdded /> */}
            {/* <Text style = {[styles.thetext, styles.container]}>Recommended Section</Text> */}
            {/* <RecommendedSection /> */}
            <Text style = {[styles.thetext, styles.container]}>LEts Find Out</Text>
            <RecentlyAdded />
            <HousingSection />
            <Text style = {[styles.thetext, styles.container]}>Footer</Text>
        </ScrollView>
    </SafeAreaView>
  )
}

const styles = StyleSheet.create({
    container: {
        margin: 8
    },
    thetext: {
        fontSize: hp('3'),
        color: 'black',
        fontWeight: 'bold',
    }
})