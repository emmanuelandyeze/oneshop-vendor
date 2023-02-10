import {
	StyleSheet,
	Text,
	View,
	Dimensions,
	ScrollView,
	TouchableOpacity,
} from 'react-native';
import React, { useEffect, useState } from 'react';
import Icon from '@expo/vector-icons/Ionicons';
import Loader from '../components/Loader';

var { width } = Dimensions.get('window');

const AdminScreen = ({ navigation }) => {
	const [isLoading, setLoading] = useState(true);
	const [products, setProducts] = useState([]);
	const [vendors, setVendors] = useState([]);

	const fetchData = async () => {
		const resp = await fetch(
			`https://oneshopadmin.herokuapp.com/api/products`,
		);
		const products = await resp.json();
		setProducts(products);
		setLoading(false);
	};

	useEffect(() => {
		fetchData();
	}, []);
	return (
		<View>
			<ScrollView
				style={styles.scrollView}
				contentContainerStyle={styles.contentContainer}
				showsVerticalScrollIndicator={false}
				showsHorizontalScrollIndicator={false}
			>
				<>
					{isLoading ? (
						<Loader />
					) : (
						<>
							<View
								style={{
									display: 'flex',
									flexDirection: 'row',
									width: '90%',
									justifyContent: 'space-between',
									alignSelf: 'center',
									marginTop: 10,
								}}
							>
								<TouchableOpacity
									style={{
										height: 100,
										width: '48%',
										backgroundColor: 'green',
										alignSelf: 'center',
										borderRadius: 10,
									}}
									onPress={() =>
										navigation.navigate('AdminProduct')
									}
								>
									<View
										style={{
											display: 'flex',
											flexDirection: 'row',
											alignItems: 'center',
											justifyContent: 'center',
											paddingTop: 5,
										}}
									>
										<>
											{isLoading ? (
												<Text>Loading</Text>
											) : (
												<Icon
													style={{
														fontSize: 50,
														textAlign: 'center',
														alignItems: 'center',
														color: '#fff',
														fontWeight: 'bold',
														marginTop: 5,
													}}
													name="pricetags-outline"
												/>
											)}
										</>
									</View>
									<Text
										style={{
											fontSize: 15,
											textAlign: 'center',
											color: '#fff',
										}}
									>
										Approved Products
									</Text>
								</TouchableOpacity>
								<TouchableOpacity
									style={{
										height: 100,
										width: '48%',
										backgroundColor: 'orange',
										alignSelf: 'center',
										borderRadius: 10,
									}}
									onPress={() =>
										navigation.navigate('AdminPending')
									}
								>
									<View>
										<Icon
											style={{
												fontSize: 50,
												textAlign: 'center',
												alignItems: 'center',
												color: '#fff',
												fontWeight: 'bold',
												marginTop: 5,
											}}
											name="warning-outline"
										/>
										<Text
											style={{
												fontSize: 15,
												textAlign: 'center',
												color: '#fff',
											}}
										>
											Pending Products
										</Text>
									</View>
								</TouchableOpacity>
							</View>
							<View
								style={{
									display: 'flex',
									flexDirection: 'row',
									width: '90%',
									justifyContent: 'space-between',
									alignSelf: 'center',
									marginTop: 10,
								}}
							>
								<TouchableOpacity
									style={{
										height: 100,
										width: '48%',
										backgroundColor: 'blue',
										alignSelf: 'center',
										borderRadius: 10,
									}}
								>
									<View
										style={{
											display: 'flex',
											flexDirection: 'row',
											alignItems: 'center',
											justifyContent: 'center',
											paddingTop: 5,
										}}
									>
										<Text
											style={{
												fontSize: 25,
												textAlign: 'center',
												alignItems: 'center',
												paddingTop: 10,
												color: '#fff',
												fontWeight: 'bold',
												paddingBottom: 10,
											}}
										>
											₦300,000
										</Text>
									</View>
									<Text
										style={{
											fontSize: 15,
											textAlign: 'center',
											color: '#fff',
										}}
									>
										Total Earnings
									</Text>
								</TouchableOpacity>
								<TouchableOpacity
									style={{
										height: 100,
										width: '48%',
										backgroundColor: 'red',
										alignSelf: 'center',
										borderRadius: 10,
									}}
									onPress={() =>
										navigation.navigate('AdminOrder')
									}
								>
									<View>
										<Icon
											name="list-circle-outline"
											style={{
												fontSize: 50,
												textAlign: 'center',
												alignItems: 'center',
												color: '#fff',
												fontWeight: 'bold',
												paddingTop: 5,
											}}
										/>
										<Text
											style={{
												fontSize: 15,
												textAlign: 'center',
												color: '#fff',
											}}
										>
											Orders
										</Text>
									</View>
								</TouchableOpacity>
							</View>
							<View
								style={{
									display: 'flex',
									flexDirection: 'row',
									width: '90%',
									justifyContent: 'space-between',
									alignSelf: 'center',
									marginTop: 10,
								}}
							>
								<TouchableOpacity
									style={{
										height: 100,
										width: '48%',
										backgroundColor: 'orange',
										alignSelf: 'center',
										borderRadius: 10,
									}}
									onPress={() =>
										navigation.navigate('AdminVendor')
									}
								>
									<View
										style={{
											display: 'flex',
											flexDirection: 'row',
											alignItems: 'center',
											justifyContent: 'center',
											paddingTop: 5,
										}}
									>
										{isLoading ? (
											<Text>Loading</Text>
										) : (
											<Icon
												style={{
													fontSize: 50,
													textAlign: 'center',
													alignItems: 'center',
													color: '#fff',
													fontWeight: 'bold',
													paddingTop: 5,
												}}
												name="people-circle-outline"
											/>
										)}
									</View>
									<Text
										style={{
											fontSize: 15,
											textAlign: 'center',
											color: '#fff',
										}}
									>
										All Vendors
									</Text>
								</TouchableOpacity>
								<TouchableOpacity
									style={{
										height: 100,
										width: '48%',
										backgroundColor: 'green',
										alignSelf: 'center',
										borderRadius: 10,
									}}
									onPress={() =>
										navigation.navigate('CreateVendor')
									}
								>
									<View>
										<Icon
											name="person-add-outline"
											style={{
												fontSize: 50,
												textAlign: 'center',
												alignItems: 'center',
												color: '#fff',
												fontWeight: 'bold',
												paddingTop: 5,
											}}
										/>
										<Text
											style={{
												fontSize: 15,
												textAlign: 'center',
												color: '#fff',
											}}
										>
											New Vendor
										</Text>
									</View>
								</TouchableOpacity>
							</View>
						</>
					)}
				</>
			</ScrollView>
		</View>
	);
};

export default AdminScreen;

const styles = StyleSheet.create({});
