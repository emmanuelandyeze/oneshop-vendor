import {
	StyleSheet,
	Text,
	View,
	ScrollView,
	TouchableOpacity,
	Dimensions,
	RefreshControl,
} from 'react-native';
import React, { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import ProductCard from '../Home/ProductCard';
import Loader from '../Loader';

var { width } = Dimensions.get('window');

const wait = (timeout) => {
	return new Promise((resolve) =>
		setTimeout(resolve, timeout),
	);
};

const PendingProducts = () => {
	const { vendorInfo } = useSelector(
		(state) => state.vendorLogin,
	);

	const [products, setProducts] = useState([]);
	const [loading, setLoading] = useState(true);

	const fetchProducts = async () => {
		const resp = await fetch(
			`https://oneshopadmin.herokuapp.com/api/products/pending/${vendorInfo.vendor._id}`,
		);
		const products = await resp.json();
		console.log(products);
		setProducts(products);
		setLoading(false);
	};

	useEffect(() => {
		fetchProducts();
	}, []);

	const [refreshing, setRefreshing] = React.useState(false);

	const onRefresh = React.useCallback(() => {
		setRefreshing(true);
		wait(2000).then(() => setRefreshing(false));
	}, []);

	return (
		<ScrollView
			style={styles.scrollView}
			contentContainerStyle={styles.contentContainer}
			showsVerticalScrollIndicator={false}
			showsHorizontalScrollIndicator={false}
			refreshControl={
				<RefreshControl
					refreshing={refreshing}
					onRefresh={onRefresh}
				/>
			}
		>
			<>
				<View>
					<Text
						style={{
							textAlign: 'center',
							fontSize: 20,
							fontWeight: 'bold',
							marginTop: 10,
						}}
					>
						Your Pending Products
					</Text>
					{loading ? (
						<Loader />
					) : (
						<View style={styles.productCard}>
							{products &&
								products.map((product) => (
									<ProductCard
										key={product._id}
										product={product}
									/>
								))}
						</View>
					)}
				</View>
			</>
		</ScrollView>
	);
};

export default PendingProducts;

const styles = StyleSheet.create({
	scrollView: {
		alignSelf: 'center',
	},
	contentContainer: {
		justifyContent: 'center',
		alignItems: 'center',
	},
	productCard: {
		width: width * 1 - 10,
		flexDirection: 'row',
		flexWrap: 'wrap',
		justifyContent: 'center',
		alignItems: 'center',
	},
});
