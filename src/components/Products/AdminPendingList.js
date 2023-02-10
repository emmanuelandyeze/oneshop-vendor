import {
	StyleSheet,
	Text,
	View,
	TouchableOpacity,
} from 'react-native';
import React from 'react';
import { DataTable } from 'react-native-paper';

const AdminPendingList = ({ product, navigation }) => {
	return (
		<View>
			<TouchableOpacity
				onPress={() =>
					navigation.navigate('AdminPendingDetails', {
						product: product,
					})
				}
			>
				<DataTable.Row>
					<DataTable.Cell>{product.name}</DataTable.Cell>
					<DataTable.Cell>₦{product.price}</DataTable.Cell>
					<DataTable.Cell>{product.Stock}</DataTable.Cell>
					{product.approved === 'true' ? (
						<DataTable.Cell
							style={{
								backgroundColor: '#72B541',
								alignItems: 'center',
								justifyContent: 'center',
							}}
						>
							<Text style={{ color: '#fff' }}>
								Approved
							</Text>
						</DataTable.Cell>
					) : (
						<DataTable.Cell
							style={{
								backgroundColor: 'gold',
								alignItems: 'center',
								justifyContent: 'center',
							}}
						>
							Pending
						</DataTable.Cell>
					)}
				</DataTable.Row>
			</TouchableOpacity>
		</View>
	);
};

export default AdminPendingList;

const styles = StyleSheet.create({});
