import {
	StyleSheet,
	Text,
	View,
	ScrollView,
	RefreshControl,
} from 'react-native';
import React, { useEffect, useState } from 'react';
import {
	useSelector,
	useDispatch,
	useAsync,
} from 'react-redux';
import { listProducts } from '../../Redux/actions/productActions';
import HomeProduct from '../components/Home/HomeProduct';
import Header from '../../src/components/Layout/Header';
import Contact from '../components/Home/Contact';
import Loader from '../components/Loader';
const wait = (timeout) => {
	return new Promise((resolve) =>
		setTimeout(resolve, timeout),
	);
};

const HomeScreen = ({ navigation }) => {
	const dispatch = useDispatch();

	const onRefresh = React.useCallback(() => {
		setRefreshing(true);
		wait(2000).then(() => setRefreshing(false));
	}, []);

	const { vendorInfo } = useSelector(
		(state) => state.vendorLogin,
	);

	const [products, setProducts] = useState([]);
	const [pendingProducts, setPendingProducts] = useState(
		[],
	);
	const [orders, setOrders] = useState([]);
	const [loading, setLoading] = useState(true);

	const fetchProducts = async () => {
		const resp = await fetch(
			`https://oneshopadmin.herokuapp.com/api/products/vendor/${vendorInfo.vendor._id}`,
		);
		const products = await resp.json();
		console.log(products);
		setProducts(products);
		setLoading(false);
		onRefresh();
	};

	const fetchPendingProducts = async () => {
		const resp = await fetch(
			`https://oneshopadmin.herokuapp.com/api/products/pending/${vendorInfo.vendor._id}`,
		);
		const pendingProducts = await resp.json();
		console.log(pendingProducts);
		setPendingProducts(pendingProducts);
		setLoading(false);
		onRefresh();
	};

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
		fetchProducts();
		fetchOrders();
	}, []);

	const [refreshing, setRefreshing] = React.useState(false);

	const sum = orders.reduce((accumulator, object) => {
		return (
			accumulator +
			(object.quantity * object.price -
				object.quantity * object.price * 0.07)
		);
	}, 0);

	return (
		<>
			{loading ? (
				<View
					refreshControl={
						<RefreshControl
							refreshing={refreshing}
							onRefresh={fetchProducts}
						/>
					}
				>
					<Loader />
				</View>
			) : (
				<View>
					<ScrollView
						style={styles.scrollView}
						contentContainerStyle={styles.contentContainer}
						showsVerticalScrollIndicator={false}
						showsHorizontalScrollIndicator={false}
						refreshControl={
							<RefreshControl
								refreshing={refreshing}
								onRefresh={fetchPendingProducts}
							/>
						}
					>
						<Text
							style={{
								paddingTop: 10,
								color: '#000',
								fontSize: 16,
								fontWeight: 'bold',
							}}
						>
							Welcome Back, {vendorInfo.vendor.name}
						</Text>
						<HomeProduct
							products={products}
							pendingProducts={pendingProducts}
							sum={sum}
							navigation={navigation}
						/>
					</ScrollView>
				</View>
			)}
			<Contact />
		</>
	);
};

export default HomeScreen;

const styles = StyleSheet.create({
	scrollView: {
		alignSelf: 'center',
	},
	contentContainer: {
		justifyContent: 'center',
		alignItems: 'center',
	},
});
