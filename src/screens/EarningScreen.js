import { StyleSheet, Text, View } from 'react-native';
import React, { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import ProductCard from '../components/Home/ProductCard';

const EarningScreen = () => {
	const { vendorInfo } = useSelector(
		(state) => state.vendorLogin,
	);

	const [orders, setOrders] = useState([]);
	const [loading, setLoading] = useState(true);

	console.log(vendorInfo.token);

	const fetchOrders = async () => {
		const resp = await fetch(
			`https://oneshopadmin.herokuapp.com/api/products/orders/${vendorInfo.vendor._id}`,
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
		<View style={{}}>
			<View>
				<Text
					style={{
						fontSize: 20,
						fontWeight: 'bold',
						paddingHorizontal: 18,
						paddingVertical: 5,
					}}
				>
					Your Earnings so far on Items Sold
				</Text>
			</View>
			{orders &&
				orders.map((order) => (
					<View
						key={order._id}
						style={{
							display: 'flex',
							flexDirection: 'row',
							justifyContent: 'space-between',
							paddingHorizontal: 20,
						}}
					>
						{}
						<Text
							style={{
								fontSize: 20,
							}}
						>
							{order.name}
						</Text>
						<Text
							style={{
								fontSize: 20,
							}}
						>
							₦
							{order.quantity * order.price -
								order.quantity * order.price * 0.07}
						</Text>
					</View>
				))}

			<View
				style={{
					display: 'flex',
					flexDirection: 'row',
					justifyContent: 'space-between',
					paddingHorizontal: 20,
					paddingVertical: 10,
					borderWidth: 2,
					borderBottomColor: '#000',
					marginHorizontal: 20,
					marginVertical: 20,
				}}
			>
				{}
				<Text
					style={{
						fontSize: 20,
						fontWeight: 'bold',
					}}
				>
					Total Earning So Far
				</Text>
				<Text
					style={{
						fontSize: 20,
						fontWeight: 'bold',
					}}
				>
					₦{sum}
				</Text>
			</View>
		</View>
	);
};

export default EarningScreen;

const styles = StyleSheet.create({});
