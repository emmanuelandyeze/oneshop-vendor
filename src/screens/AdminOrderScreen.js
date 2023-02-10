import {
	StyleSheet,
	Text,
	View,
	TouchableOpacity,
	ActivityIndicator,
	ScrollView,
	RefreshControl,
} from 'react-native';
import React, { useEffect, useState } from 'react';
import Icon from '@expo/vector-icons/Ionicons';
import { DataTable } from 'react-native-paper';
import OrderList from '../components/Order/OrderList';
import { useSelector } from 'react-redux';
import Loader from '../components/Loader';

const wait = (timeout) => {
	return new Promise((resolve) =>
		setTimeout(resolve, timeout),
	);
};

const OrderListScreen = ({ navigation }) => {
	const { vendorInfo } = useSelector(
		(state) => state.vendorLogin,
	);

	const onRefresh = React.useCallback(() => {
		setRefreshing(true);
		wait(2000).then(() => setRefreshing(false));
	}, []);

	const [refreshing, setRefreshing] = React.useState(false);

	const [isLoading, setLoading] = useState(true);
	const [orders, setOrders] = useState([]);

	const fetchData = async () => {
		const resp = await fetch(
			`https://oneshopadmin.herokuapp.com/api/orders`,
			{
				method: 'get',
				headers: {
					'Content-Type': 'application/json',
					Authorization: `Bearer ${vendorInfo.token}`,
				},
			},
		);
		const orders = await resp.json();
		console.log(orders);
		console.log(vendorInfo);
		setOrders(orders);
		setLoading(false);
	};
	useEffect(() => {
		fetchData();
	}, []);

	return (
		<View
			style={{
				paddingTop: 30,
				paddingHorizontal: 10,
				paddingBottom: 60,
			}}
		>
			<View style={styles.productDetailsTop}>
				<TouchableOpacity
					onPress={() => navigation.goBack()}
				>
					<Icon name="arrow-back" color="#333" size={30} />
				</TouchableOpacity>
			</View>
			<ScrollView
				style={styles.scrollView}
				contentContainerStyle={styles.contentContainer}
				showsVerticalScrollIndicator={false}
				showsHorizontalScrollIndicator={false}
				refreshControl={
					<RefreshControl
						refreshing={refreshing}
						onRefresh={fetchData}
					/>
				}
			>
				{isLoading ? (
					<Loader />
				) : (
					<DataTable style={styles.container}>
						<DataTable.Header style={styles.tableHeader}>
							<DataTable.Title>Order Id</DataTable.Title>
							<DataTable.Title>Total Price</DataTable.Title>
							<DataTable.Title>
								Number of items
							</DataTable.Title>
							<DataTable.Title>Status</DataTable.Title>
						</DataTable.Header>
						<>
							{isLoading ? (
								<Loader />
							) : (
								<View>
									{orders &&
										orders.map((order) => (
											<OrderList
												key={order._id}
												order={order}
												navigation={navigation}
											/>
										))}
								</View>
							)}
						</>
					</DataTable>
				)}
			</ScrollView>
		</View>
	);
};

export default OrderListScreen;

const styles = StyleSheet.create({
	scrollView: {
		// alignSelf: 'center',
		// height: '120%',
		paddingBottom: 20,
	},
	contentContainer: {
		// justifyContent: 'center',
		// alignItems: 'center',
	},
});
