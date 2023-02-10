import { StyleSheet, Text, View } from 'react-native';
import React from 'react';
import AuthScreen from '../src/screens/AuthScreen';
import HomeScreen from '../src/screens/HomeScreen';
import CreateScreen from '../src/screens/CreateScreen';
import AdminProductScreen from '../src/screens/AdminProductScreen';
import AdminVendorScreen from '../src/screens/AdminVendorScreen';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import Tabs from './Tabs';
import VendorDetails from '../src/components/Vendors/VendorDetails';
import CreateVendor from '../src/components/Vendors/CreateVendor';
import PendingScreen from '../src/screens/PendingScreen';
import AdminPendingScreen from '../src/screens/AdminPendingScreen';
import AdminPendingDetails from '../src/components/Products/AdminPendingDetails';
import LoginScreen from '../src/screens/LoginScreen';
import AdminOrderScreen from '../src/screens/AdminOrderScreen';
import OrderScreen from '../src/screens/OrderScreen';

const Main = () => {
	const Stack = createNativeStackNavigator();
	return (
		<Stack.Navigator
			initialRouteName="Home"
			screenOptions={{ headerShown: false }}
		>
			<Stack.Screen name="Home" component={Tabs} />
			<Stack.Screen name="Auth" component={AuthScreen} />
			<Stack.Screen name="Login" component={LoginScreen} />
			<Stack.Screen
				name="CreateProduct"
				component={CreateScreen}
			/>
			<Stack.Screen
				name="AdminProduct"
				component={AdminProductScreen}
			/>
			<Stack.Screen
				name="AdminPending"
				component={AdminPendingScreen}
			/>
			<Stack.Screen
				name="AdminVendor"
				component={AdminVendorScreen}
			/>
			<Stack.Screen
				name="VendorDetails"
				component={VendorDetails}
			/>
			<Stack.Screen
				name="AdminPendingDetails"
				component={AdminPendingDetails}
			/>
			<Stack.Screen
				name="CreateVendor"
				component={CreateVendor}
			/>
			<Stack.Screen
				name="CreatePending"
				component={PendingScreen}
			/>
			<Stack.Screen
				name="AdminOrder"
				component={AdminOrderScreen}
			/>
			<Stack.Screen name="Order" component={OrderScreen} />
		</Stack.Navigator>
	);
};

export default Main;

const styles = StyleSheet.create({});
