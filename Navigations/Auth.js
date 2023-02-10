import { StyleSheet, Text, View } from 'react-native';
import React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import LoginScreen from '../src/screens/LoginScreen';
import SignupScreen from '../src/screens/SignupScreen';

const Auth = () => {
	const Stack = createNativeStackNavigator();
	return (
		<Stack.Navigator
			initialRouteName="Login"
			screenOptions={{ headerShown: false }}
		>
			<Stack.Screen name="Login" component={LoginScreen} />
			<Stack.Screen
				name="Signup"
				component={SignupScreen}
			/>
		</Stack.Navigator>
	);
};

export default Auth;

const styles = StyleSheet.create({});
