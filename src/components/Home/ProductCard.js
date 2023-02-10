import {
	StyleSheet,
	Text,
	View,
	Dimensions,
	Image,
	TouchableOpacity,
} from 'react-native';
import React from 'react';
import Icon from '@expo/vector-icons/Ionicons';

var { width } = Dimensions.get('window');

const ProductCard = ({ product }) => {
	return (
		<View style={styles.productCard}>
			<Image
				source={{ uri: product.image }}
				style={styles.image}
			/>
			<View
				style={{
					display: 'flex',
					flexDirection: 'column',
					alignItems: 'center',
				}}
			>
				<Text style={{ color: '#333', paddingVertical: 5 }}>
					{product.name}
				</Text>
				<View
					style={{
						display: 'flex',
						flexDirection: 'row',
						alignItems: 'center',
						justifyContent: 'space-between',
					}}
				>
					<Text
						style={{
							color: '#333',
							fontWeight: 'bold',
							marginRight: 20,
						}}
					>
						₦{product.price}
					</Text>
					{product.countInStock >= 1 ? (
						<Text
							style={{
								color: '#fff',
								fontSize: 10,
								backgroundColor: '#72B541',
								padding: 3,
								borderRadius: 3,
							}}
						>
							In Stock: {product.countInStock}
						</Text>
					) : (
						<Text
							style={{
								color: '#fff',
								fontSize: 10,
								backgroundColor: 'red',
								padding: 3,
								borderRadius: 3,
							}}
						>
							Out of Stock
						</Text>
					)}
				</View>
			</View>
		</View>
	);
};

export default ProductCard;

const styles = StyleSheet.create({
	productCard: {
		width: width / 2 - 30,
		height: width / 2,
		borderRadius: 10,
		elevation: 8,
		backgroundColor: '#e5e5e5',
		flexDirection: 'row',
		flexWrap: 'wrap',
		margin: 10,
		justifyContent: 'center',
		alignItems: 'center',
	},
	image: {
		width: '100%',
		height: width / 2 - 60,
		resizeMode: 'cover',
		borderTopRightRadius: 10,
		borderTopLeftRadius: 10,
	},
	wrapper: {
		justifyContent: 'center',
		alignItems: 'center',
	},
});
