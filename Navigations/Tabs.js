import { StyleSheet, Text, View } from 'react-native';
import React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import HomeScreen from '../src/screens/HomeScreen';
import ProductsScreen from '../src/screens/ProductsScreen';
import EarningScreen from '../src/screens/EarningScreen';
import AdminScreen from '../src/screens/AdminScreen';
import ProfileScreen from '../src/screens/ProfileScreen';
import Icon from '@expo/vector-icons/Ionicons';
import { useSelector } from 'react-redux';

const Tab = createBottomTabNavigator();

const Tabs = () => {
	const vendorLogin = useSelector(
		(state) => state.vendorLogin,
	);
	const { loading, error, vendorInfo } = vendorLogin;
	return (
		<Tab.Navigator
			screenOptions={{
				headerShown: true,
				tabBarHideOnKeyboard: true,
			}}
		>
			<Tab.Screen
				name="Dashboard"
				component={HomeScreen}
				options={{
					tabBarIcon: ({ focused }) => (
						<View
							style={{
								flexDirection: 'column',
								alignItems: 'center',
								justifyContent: 'center',
								tintColor: focused ? 'crimson' : 'black',
							}}
						>
							<Icon name="options-outline" size={25} />
						</View>
					),
				}}
			/>
			<Tab.Screen
				name="Products"
				component={ProductsScreen}
				options={{
					tabBarIcon: ({ focused }) => (
						<View
							style={{
								flexDirection: 'column',
								alignItems: 'center',
								justifyContent: 'center',
								tintColor: focused ? 'crimson' : 'black',
							}}
						>
							<Icon name="server-outline" size={25} />
						</View>
					),
				}}
			/>
			<Tab.Screen
				name="Earning"
				component={EarningScreen}
				options={{
					tabBarIcon: ({ focused }) => (
						<View
							style={{
								flexDirection: 'column',
								alignItems: 'center',
								justifyContent: 'center',
								tintColor: focused ? 'crimson' : 'black',
							}}
						>
							<Icon name="wallet-outline" size={25} />
						</View>
					),
				}}
			/>
			<Tab.Screen
				name="Profile"
				component={ProfileScreen}
				options={{
					tabBarIcon: ({ focused }) => (
						<View
							style={{
								flexDirection: 'column',
								alignItems: 'center',
								justifyContent: 'center',
								tintColor: focused ? 'crimson' : 'black',
							}}
						>
							<Icon name="person-outline" size={25} />
						</View>
					),
				}}
			/>
			{vendorInfo.vendor.isAdmin === true ? (
				<Tab.Screen
					name="Admin"
					component={AdminScreen}
					options={{
						tabBarIcon: ({ focused }) => (
							<View
								style={{
									flexDirection: 'column',
									alignItems: 'center',
									justifyContent: 'center',
									tintColor: focused ? 'crimson' : 'black',
								}}
							>
								<Icon name="apps-outline" size={25} />
							</View>
						),
					}}
				/>
			) : null}
		</Tab.Navigator>
	);
};

export default Tabs;

const styles = StyleSheet.create({});
