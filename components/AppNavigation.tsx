import * as React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import HomeScreen from '../screens/HomeScreen';
import LoginPage from '../screens/LoginPage';
import StockScreen from '../components/stock/StockScreen'
import StockEntryScreen from '../components/stockentry/StockEntryScreen'
import StockEntryBuilder from '../components/stockentry/StockEntryBuilder'
import StockEntryCommercial from '../components/stockentry/StockEntryCommercial'
import StockEntryResale from '../components/stockentry/StockEntryResale'
import StockEntryRental from '../components/stockentry/StockEntryRental'
import RequirementsScreen from '../components/requirements/RequirementsScreen'
import FollowUp from './reqentry/FollowUp'
import StockResale from '../components/stock/StockResale'
import StockRental from '../components/stock/StockRental'
import StockBuilder from '../components/stock/StockBuilder'
import StockCommercial from '../components/stock/StockCommercial'
import ResaleReqFilter from './requirements/ResaleReqFilter'
import RentalReqFilter from './requirements/RentalReqFilter'
import BuilderReqFilter from './requirements/BuilderReqFilter'
import CommercialReqFilter from './requirements/CommercialReqFilter'
import AddImageForm from './ImagePicker';
import TryIt from './TryIt'

const Stack = createNativeStackNavigator();

function AppNavigation() {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="Home" screenOptions={{ headerShown: false }}>
      <Stack.Screen name="Login" component={LoginPage} options={{ headerShown: false }} />
        <Stack.Screen name="Home" component={HomeScreen} />
        <Stack.Screen name="Stock" component={StockScreen} />
        <Stack.Screen name="StockEntry" component={StockEntryScreen} />
        <Stack.Screen name="Requirements" component={RequirementsScreen} />
        <Stack.Screen name="FollowUp" component={FollowUp} />
        <Stack.Screen name="TryIt" component={TryIt} />
        <Stack.Screen name="StockResale" component={StockResale} />
        <Stack.Screen name="StockRental" component={StockRental} />
        <Stack.Screen name="StockBuilder" component={StockBuilder} />
        <Stack.Screen name="StockCommercial" component={StockCommercial} />
        <Stack.Screen name="StockEntryResale" component={StockEntryResale} />
        <Stack.Screen name="StockEntryRental" component={StockEntryRental} />
        <Stack.Screen name="StockEntryBuilder" component={StockEntryBuilder} />
        <Stack.Screen name="StockEntryCommercial" component={StockEntryCommercial} />
        <Stack.Screen name="ResaleReqFilter" component={ResaleReqFilter} />
        <Stack.Screen name="RentalReqFilter" component={RentalReqFilter} />
        <Stack.Screen name="BuilderReqFilter" component={BuilderReqFilter} />
        <Stack.Screen name="CommercialReqFilter" component={CommercialReqFilter} />
        <Stack.Screen name="ImagePicker" component={AddImageForm} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}

export default AppNavigation;
