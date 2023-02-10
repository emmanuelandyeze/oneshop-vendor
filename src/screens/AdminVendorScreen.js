import {
	StyleSheet,
	Text,
	View,
	TouchableOpacity,
	Dimensions,
} from 'react-native';
import React, { useState, useEffect } from 'react';
import { useSelector } from 'react-redux';
import Header from '../components/Layout/Header';
import { DataTable } from 'react-native-paper';
import VendorList from '../components/Vendors/VendorList';
import Icon from '@expo/vector-icons/Ionicons';
var { width } = Dimensions.get('window');
import Loader from '../components/Loader';

const AdminVendorScreen = ({ navigation }) => {
	const [isLoading, setLoading] = useState(true);
	const [vendors, setVendors] = useState([]);
	const { vendorInfo } = useSelector(
		(state) => state.vendorLogin,
	);

	const fetchVendors = async () => {
		const resp = await fetch(
			`https://oneshopadmin.herokuapp.com/api/vendors`,
			{
				method: 'get',
				headers: {
					Authorization: `Bearer ${vendorInfo.token}`,
					'Content-Type': 'application/json',
				},
			},
		);
		const vendors = await resp.json();
		console.log(vendors);
		setVendors(vendors);
		setLoading(false);
	};

	useEffect(() => {
		fetchVendors();
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
							Total Vendors ({vendors.length})
						</Text>
					)}
				</>
				<DataTable style={styles.container}>
					<DataTable.Header style={styles.tableHeader}>
						<DataTable.Title>Name</DataTable.Title>
						<DataTable.Title>Email address</DataTable.Title>
						<DataTable.Title>Phone Number</DataTable.Title>
					</DataTable.Header>
					<>
						{isLoading ? (
							<Text>Loading</Text>
						) : (
							<View>
								{vendors &&
									vendors.map((vendor) => (
										<VendorList
											key={vendor._id}
											vendor={vendor}
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

export default AdminVendorScreen;

const styles = StyleSheet.create({
	container: {
		padding: 15,
	},
	tableHeader: {
		backgroundColor: '#DCDCDC',
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
