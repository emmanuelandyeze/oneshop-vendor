import {
	StyleSheet,
	Text,
	View,
	TouchableOpacity,
	Dimensions,
} from 'react-native';
import React, { useState, useEffect } from 'react';
import Header from '../components/Layout/Header';
import { DataTable } from 'react-native-paper';
import VendorList from '../components/Vendors/VendorList';
import Icon from '@expo/vector-icons/Ionicons';
import AdminPendingList from '../components/Products/AdminPendingList';
var { width } = Dimensions.get('window');
import Loader from '../components/Loader';

const AdminPendingScreen = ({ navigation }) => {
	const [isLoading, setLoading] = useState(true);
	const [products, setProducts] = useState([]);

	const fetchProducts = async () => {
		const resp = await fetch(
			`https://oneshopadmin.herokuapp.com/api/products/pending`,
		);
		const products = await resp.json();
		setProducts(products);
		setLoading(false);
	};

	useEffect(() => {
		fetchProducts();
	}, []);
	return (
		<View>
			<View style={styles.productDetailsTop}>
				<TouchableOpacity
					onPress={() => navigation.goBack()}
				>
					<Icon name="arrow-back" color="#333" size={30} />
				</TouchableOpacity>
			</View>
			<View>
				<>
					{isLoading ? (
						<Loader />
					) : (
						<Text
							style={{
								padding: 15,
								fontSize: 20,
								fontWeight: 'bold',
							}}
						>
							Total Pending Products (
							{products.products.length})
						</Text>
					)}
				</>
				<DataTable style={styles.container}>
					<DataTable.Header style={styles.tableHeader}>
						<DataTable.Title>Name</DataTable.Title>
						<DataTable.Title>Price</DataTable.Title>
						<DataTable.Title>
							Number in Stock
						</DataTable.Title>
						<DataTable.Title>Status</DataTable.Title>
					</DataTable.Header>
					<>
						{isLoading ? (
							<Text>Loading</Text>
						) : (
							<View>
								{products.products &&
									products.products.map((product) => (
										<AdminPendingList
											key={product._id}
											product={product}
											navigation={navigation}
										/>
									))}
							</View>
						)}
					</>
				</DataTable>
			</View>
		</View>
	);
};

export default AdminPendingScreen;

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
});
