import {
	StyleSheet,
	Text,
	View,
	TouchableOpacity,
} from 'react-native';
import React from 'react';
import { DataTable } from 'react-native-paper';

const VendorList = ({ vendor, navigation }) => {
	return (
		<View>
			<TouchableOpacity
				onPress={() =>
					navigation.navigate('VendorDetails', {
						vendor: vendor,
					})
				}
			>
				<DataTable.Row>
					<DataTable.Cell>{vendor.name}</DataTable.Cell>
					<DataTable.Cell>{vendor.email}</DataTable.Cell>
					<DataTable.Cell>
						{vendor.phoneNumber}
					</DataTable.Cell>
				</DataTable.Row>
			</TouchableOpacity>
		</View>
	);
};

export default VendorList;

const styles = StyleSheet.create({});
