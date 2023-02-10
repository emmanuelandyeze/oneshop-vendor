import {
	StyleSheet,
	Text,
	View,
	Dimensions,
	ScrollView,
	TouchableOpacity,
} from 'react-native';

import ProductCard from '../Home/ProductCard';
import Icon from '@expo/vector-icons/Ionicons';

var { width } = Dimensions.get('window');

const HomeProduct = ({
	products,
	navigation,
	pendingProducts,
	sum,
}) => {
	return (
		<>
			<View
				style={{
					display: 'flex',
					flexDirection: 'row',
					width: '90%',
					justifyContent: 'space-between',
					alignSelf: 'center',
					marginTop: 10,
				}}
			>
				<TouchableOpacity
					style={{
						height: 100,
						width: '48%',
						backgroundColor: 'green',
						alignSelf: 'center',
						borderRadius: 10,
					}}
				>
					<View
						style={{
							display: 'flex',
							flexDirection: 'row',
							alignItems: 'center',
							justifyContent: 'center',
							paddingTop: 5,
						}}
					>
						<Text
							style={{
								fontSize: 30,
								textAlign: 'center',
								alignItems: 'center',
								paddingTop: 10,
								color: '#fff',
								fontWeight: 'bold',
								paddingBottom: 10,
							}}
						>
							{products.length}
						</Text>
					</View>
					<Text
						style={{
							fontSize: 15,
							textAlign: 'center',
							color: '#fff',
						}}
					>
						Approved Products
					</Text>
				</TouchableOpacity>
				<TouchableOpacity
					style={{
						height: 100,
						width: '48%',
						backgroundColor: 'orange',
						alignSelf: 'center',
						borderRadius: 10,
					}}
					onPress={() =>
						navigation.navigate('CreateProduct')
					}
				>
					<View>
						<Text
							style={{
								fontSize: 50,
								textAlign: 'center',
								alignItems: 'center',
								color: '#fff',
								fontWeight: 'bold',
							}}
						>
							+
						</Text>
						<Text
							style={{
								fontSize: 15,
								textAlign: 'center',
								color: '#fff',
							}}
						>
							New Product
						</Text>
					</View>
				</TouchableOpacity>
			</View>
			<View
				style={{
					display: 'flex',
					flexDirection: 'row',
					width: '90%',
					justifyContent: 'space-between',
					alignSelf: 'center',
					marginTop: 10,
				}}
			>
				<TouchableOpacity
					style={{
						height: 100,
						width: '48%',
						backgroundColor: 'blue',
						alignSelf: 'center',
						borderRadius: 10,
					}}
				>
					<View
						style={{
							display: 'flex',
							flexDirection: 'row',
							alignItems: 'center',
							justifyContent: 'center',
							paddingTop: 5,
						}}
					>
						<Text
							style={{
								fontSize: 25,
								textAlign: 'center',
								alignItems: 'center',
								paddingTop: 10,
								color: '#fff',
								fontWeight: 'bold',
								paddingBottom: 10,
							}}
						>
							₦{sum}
						</Text>
					</View>
					<Text
						style={{
							fontSize: 15,
							textAlign: 'center',
							color: '#fff',
						}}
					>
						Total Earnings
					</Text>
				</TouchableOpacity>
				<TouchableOpacity
					style={{
						height: 100,
						width: '48%',
						backgroundColor: 'red',
						alignSelf: 'center',
						borderRadius: 10,
					}}
					onPress={() =>
						navigation.navigate('CreatePending')
					}
				>
					<View>
						<Text
							style={{
								fontSize: 30,
								textAlign: 'center',
								alignItems: 'center',
								paddingTop: 10,
								color: '#fff',
								fontWeight: 'bold',
								paddingBottom: 10,
							}}
						>
							{pendingProducts.length}
						</Text>
						<Text
							style={{
								fontSize: 15,
								textAlign: 'center',
								color: '#fff',
							}}
						>
							Pending Products
						</Text>
					</View>
				</TouchableOpacity>
			</View>
			<View>
				<Text
					style={{
						textAlign: 'center',
						fontSize: 20,
						fontWeight: 'bold',
						marginTop: 10,
					}}
				>
					Your Approved Products
				</Text>

				<View style={styles.productCard}>
					{products &&
						products.map((product) => (
							<ProductCard
								key={product._id}
								product={product}
							/>
						))}
				</View>
			</View>
		</>
	);
};

export default HomeProduct;

const styles = StyleSheet.create({
	productCard: {
		width: width * 1 - 10,
		flexDirection: 'row',
		flexWrap: 'wrap',
		justifyContent: 'center',
		alignItems: 'center',
	},
});
