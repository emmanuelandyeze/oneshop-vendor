import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View } from 'react-native';
import React, { useEffect, useState } from 'react';
import { Provider, useSelector } from 'react-redux';
import Store from './Redux/store';
import { NavigationContainer } from '@react-navigation/native';
import Main from './Navigations/Main';
import Auth from './Navigations/Auth';
import { loadVendor } from './Redux/actions/vendorActions';

export default function App() {
	return (
		<Provider store={Store}>
			<AppStack />
		</Provider>
	);
}

const AppStack = () => {
	const { isAuthenticated, loading, vendorInfo } =
		useSelector((state) => state.vendorLogin);

	useEffect(() => {
		Store.dispatch(loadVendor());
	}, []);

	return (
		<NavigationContainer>
			<>
				<>{isAuthenticated ? <Main /> : <Auth />}</>
			</>
		</NavigationContainer>
	);
};

const styles = StyleSheet.create({});
