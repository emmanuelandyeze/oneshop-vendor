import {
	StyleSheet,
	Text,
	View,
	Dimensions,
	TouchableOpacity,
	ScrollView,
	Image,
} from 'react-native';
import React, { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
var { width } = Dimensions.get('window');
var height = Dimensions.get('window').height;
import Header from '../Layout/Header';
import Icon from '@expo/vector-icons/Ionicons';

const VendorDetails = ({ route, navigation }) => {
	const [click, setClick] = useState(false);
	const [products, setProducts] = useState([]);
	const [loading, setLoading] = useState(true);
	const [orders, setOrders] = useState([]);
	const { vendorInfo } = useSelector(
		(state) => state.vendorLogin,
	);

	const fetchProducts = async () => {
		const resp = await fetch(
			`https://oneshopadmin.herokuapp.com/api/products/vendor/${route.params?.vendor._id}`,
		);
		const products = await resp.json();
		console.log(products);
		setProducts(products);
		setLoading(false);
	};

	const fetchOrders = async () => {
		const resp = await fetch(
			`https://oneshopadmin.herokuapp.com/api/products/orders/${route.params?.vendor._id}`,
			{
				method: 'get',
				headers: {
					'Content-Type': 'application/json',
					Authorization: `Bearer ${vendorInfo.token}`,
				},
			},
		);
		const orders = await resp.json();
		setOrders(orders);
		setLoading(false);

		onRefresh();
	};

	useEffect(() => {
		fetchProducts();
		fetchOrders();
	}, []);

	const sum = orders.reduce((accumulator, object) => {
		return (
			accumulator +
			(object.quantity * object.price -
				object.quantity * object.price * 0.07)
		);
	}, 0);

	return (
		<View>
			<View style={styles.productDetailsTop}>
				<TouchableOpacity
					onPress={() => navigation.goBack()}
				>
					<Icon name="arrow-back" color="#333" size={30} />
				</TouchableOpacity>
			</View>
			<ScrollView
				style={styles.container}
				showsVerticalScrollIndicator={false}
			>
				<View>
					<Image
						source={{
							uri: 'https://res.cloudinary.com/dg0lat2d3/image/upload/v1654750386/products/vj35shznx80kkcu9dee0.png',
						}}
						style={{
							width: width * 1,
							height: width / 2 - 20,
							resizeMode: 'contain',
							marginVertical: 10,
							// borderRadius: 50,
						}}
					/>
					<Text
						style={{
							fontSize: 25,
							fontWeight: 'bold',
							textAlign: 'center',
						}}
					>
						{route.params?.vendor.name}
					</Text>
					<View style={{ alignSelf: 'center' }}>
						{route.params?.vendor.isAdmin ? (
							<Text
								style={{
									fontSize: 20,
									// fontWeight: 'bold',
									textAlign: 'center',
									backgroundColor: 'green',
									color: '#fff',
									width: '20%',
									borderRadius: 10,
									paddingHorizontal: 10,
								}}
							>
								Admin
							</Text>
						) : (
							<Text
								style={{
									fontSize: 20,
									// fontWeight: 'bold',
									textAlign: 'center',
									backgroundColor: 'green',
									color: '#fff',
									width: '25%',
									borderRadius: 10,
								}}
							>
								Vendor
							</Text>
						)}
					</View>
				</View>
				<View style={{ padding: 10 }}>
					<Text
						style={{
							fontSize: 20,
							fontWeight: 'bold',
							textAlign: 'left',
						}}
					>
						Basic Information
					</Text>
					<View
						style={{
							borderWidth: 1,
							padding: 5,
							borderRadius: 8,
						}}
					>
						<Text
							style={{ fontSize: 20, fontWeight: 'bold' }}
						>
							Name:
							<Text
								style={{
									fontWeight: '100',
								}}
							>
								{' ' + route.params?.vendor.name}
							</Text>
						</Text>
						<Text
							style={{ fontSize: 20, fontWeight: 'bold' }}
						>
							Email Address:
							<Text
								style={{
									fontWeight: '100',
								}}
							>
								{' ' + route.params?.vendor.email}
							</Text>
						</Text>
						<Text
							style={{ fontSize: 20, fontWeight: 'bold' }}
						>
							Phone Number:
							<Text
								style={{
									fontWeight: '100',
								}}
							>
								{' ' + route.params?.vendor.phoneNumber}
							</Text>
						</Text>
						<Text
							style={{ fontSize: 20, fontWeight: 'bold' }}
						>
							Category:
							<Text
								style={{
									fontWeight: '100',
								}}
							>
								{' ' + route.params?.vendor.category}
							</Text>
						</Text>
						<Text
							style={{ fontSize: 20, fontWeight: 'bold' }}
						>
							Date Joined:
							<Text
								style={{
									fontWeight: '100',
								}}
							>
								{' ' + route.params?.vendor.createdAt}
							</Text>
						</Text>
					</View>
				</View>
				<View style={{ padding: 10 }}>
					<Text
						style={{
							fontSize: 20,
							fontWeight: 'bold',
							textAlign: 'left',
						}}
					>
						Account Information
					</Text>
					<View
						style={{
							borderWidth: 1,
							padding: 5,
							borderRadius: 8,
						}}
					>
						<Text
							style={{ fontSize: 20, fontWeight: 'bold' }}
						>
							Bank Name:
							<Text
								style={{
									fontWeight: '100',
								}}
							>
								{' ' + route.params?.vendor.bankName}
							</Text>
						</Text>
						<Text
							style={{ fontSize: 20, fontWeight: 'bold' }}
						>
							Account Name:
							<Text
								style={{
									fontWeight: '100',
								}}
							>
								{' ' + route.params?.vendor.accountName}
							</Text>
						</Text>
						<Text
							style={{ fontSize: 20, fontWeight: 'bold' }}
						>
							Account Number:
							<Text
								style={{
									fontWeight: '100',
								}}
							>
								{' ' + route.params?.vendor.accountNumber}
							</Text>
						</Text>
						<View
							style={{
								display: 'flex',
								flexDirection: 'column',
								alignItems: 'center',
								justifyContent: 'space-between',
								width: '100%',
							}}
						>
							<Text
								style={{ fontSize: 20, fontWeight: 'bold' }}
							>
								Outstanding Payment:
								<Text
									style={{
										fontWeight: '700',
										fontSize: 20,
									}}
								>
									{' '}
									₦{sum}
								</Text>
							</Text>
							<TouchableOpacity>
								<Text
									style={{
										backgroundColor: 'green',
										padding: 5,
										fontSize: 20,
										color: '#fff',
										borderRadius: 8,
									}}
								>
									Click if Paid
								</Text>
							</TouchableOpacity>
						</View>
					</View>
					<View style={{ paddingTop: 10 }}>
						<Text
							style={{
								fontSize: 20,
								fontWeight: 'bold',
								textAlign: 'left',
							}}
						>
							Products Information
						</Text>
						<View
							style={{
								borderWidth: 1,
								padding: 5,
								borderRadius: 8,
							}}
						>
							<Text
								style={{ fontSize: 20, fontWeight: 'bold' }}
							>
								Number of Approved Products:
								<Text
									style={{
										fontWeight: '100',
									}}
								>
									{' ' + products.length}
								</Text>
							</Text>
						</View>
					</View>
				</View>
			</ScrollView>
		</View>
	);
};

export default VendorDetails;

const styles = StyleSheet.create({
	productDetailsTop: {
		width: width * 1,
		flexDirection: 'row',
		alignItems: 'center',
		height: width / 6,
		paddingHorizontal: 10,
		elevation: 8,
		backgroundColor: '#fff',
		paddingTop: 25,
	},
	container: {
		width: width * 1,
		height: height * 1,
	},
});
