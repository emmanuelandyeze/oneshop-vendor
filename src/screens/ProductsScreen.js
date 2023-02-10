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
import ProductCard from '../../src/components/Home/ProductCard';
import Loader from '../components/Loader';
import { listProducts } from '../../Redux/actions/productActions';
import HomeProduct from '../components/Home/HomeProduct';
import Header from '../../src/components/Layout/Header';
import Icon from '@expo/vector-icons/Ionicons';

var { width } = Dimensions.get('window');

const wait = (timeout) => {
	return new Promise((resolve) =>
		setTimeout(resolve, timeout),
	);
};

const ProductsScreen = () => {
	const dispatch = useDispatch();
	const { vendorInfo } = useSelector(
		(state) => state.vendorLogin,
	);

	const [products, setProducts] = useState([]);
	const [loading, setLoading] = useState(true);

	const fetchProducts = async () => {
		const resp = await fetch(
			`https://oneshopadmin.herokuapp.com/api/products/vendor/${vendorInfo.vendor._id}`,
		);
		const products = await resp.json();
		setProducts(products);
		setLoading(false);
		onRefresh();
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
				<RefreshControl refreshing={refreshing} />
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
						Uploaded Products
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

export default ProductsScreen;

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
