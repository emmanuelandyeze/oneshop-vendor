import {
	StyleSheet,
	Text,
	View,
	ScrollView,
	TouchableOpacity,
	Dimensions,
} from 'react-native';
import React, { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
// import {listProducts} from '../../Redux/actions/productActions'
import ProductCard from '../../src/components/Home/ProductCard';
import HomeProduct from '../components/Home/HomeProduct';
import Header from '../components/Layout/Header';
import Icon from '@expo/vector-icons/Ionicons';
import Loader from '../components/Loader';

var { width } = Dimensions.get('window');

const ProductsScreen = ({ navigation }) => {
	const dispatch = useDispatch();
	const { userInfo } = useSelector(
		(state) => state.userDetails,
	);

	const [isLoading, setLoading] = useState(true);
	const [products, setProducts] = useState([]);
	console.log(products);

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
		<ScrollView
			style={styles.scrollView}
			contentContainerStyle={styles.contentContainer}
		>
			<>
				<View style={styles.productDetailsTop}>
					<TouchableOpacity
						onPress={() => navigation.goBack()}
					>
						<Icon
							name="arrow-back"
							color="#333"
							size={30}
						/>
					</TouchableOpacity>
				</View>
				<View>
					<Text
						style={{
							textAlign: 'center',
							fontSize: 30,
							// fontWeight: 'bold',
							marginTop: 30,
						}}
					>
						All Approved Products
					</Text>
					{isLoading ? (
						<Loader />
					) : (
						<View style={styles.productCard}>
							{products.products &&
								products.products.map((product) => (
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
});
