import {
	StyleSheet,
	Text,
	View,
	Dimensions,
	TouchableOpacity,
	TextInput,
	Image,
	RefreshControl,
	Alert,
	ScrollView,
} from 'react-native';
import React, { useEffect, useState } from 'react';
var { width } = Dimensions.get('window');
import Icon from 'react-native-vector-icons/Ionicons';
import * as ImagePicker from 'expo-image-picker';
import { useDispatch, useSelector } from 'react-redux';
import Header from '../Layout/Header';

const wait = (timeout) => {
	return new Promise((resolve) =>
		setTimeout(resolve, timeout),
	);
};

const AdminPendingDetails = ({ route, navigation }) => {
	const [refreshing, setRefreshing] = React.useState(false);

	const onRefresh = React.useCallback(() => {
		setRefreshing(true);
		wait(2000).then(() => setRefreshing(false));
	}, []);

	const { vendorInfo } = useSelector(
		(state) => state.vendorLogin,
	);

	const [name, setName] = useState(
		route.params?.product.name,
	);
	const [price, setPrice] = useState(
		route.params?.product.price * 1 + 0,
	);
	const [description, setDescription] = useState(
		route.params?.product.description,
	);
	const [category, setCategory] = useState(
		route.params?.product.category,
	);
	const [countInStock, setCountInStock] = useState(
		route.params?.product.countInStock,
	);
	const [vendor, setVendor] = useState(
		route.params?.product.vendor,
	);
	const [brand, setBrand] = useState(
		route.params?.product.brand,
	);
	const [size, setSize] = useState(
		route.params?.product.size,
	);
	const [image, setImage] = useState(
		route.params?.product.image,
	);
	const [pendingProduct, setPendingProduct] = useState(
		route.params?.product._id,
	);
	const [approved, setApproved] = useState('true');

	const submitData = () => {
		fetch(
			'https://oneshopadmin.herokuapp.com/api/products',
			{
				method: 'post',
				headers: {
					Authorization: `Bearer ${vendorInfo.token}`,
					'Content-Type': 'application/json',
				},
				body: JSON.stringify({
					name,
					price,
					description,
					category,
					countInStock,
					image,
					brand,
					vendor,
					pendingProduct,
					size,
				}),
			},
		)
			.then((res) => res.json())
			.then((data) => {
				alert('Product Uploaded Succesfully');
				navigation.navigate('Home');
			});
	};

	// const updateData = () => {
	// 	fetch(
	// 		`https://apponeshop.herokuapp.com/api/v2/product/${route.params?.product._id}`,
	// 		{
	// 			method: 'PUT',
	// 			headers: {
	// 				'Content-Type': 'application/json',
	// 			},
	// 			body: JSON.stringify({
	// 				approved,
	// 			}),
	// 		},
	// 	)
	// 		.then((response) => response.json())
	// 		.then((data) => {
	// 			alert('Product Approved Succesfully');
	// 			console.log(data);
	// 		})
	// 		.catch((error) => {
	// 			console.error('Error:', error);
	// 		});
	// };

	const uploadImage = async () => {
		// No permissions request is necessary for launching the image library
		let result = await ImagePicker.launchImageLibraryAsync({
			mediaTypes: ImagePicker.MediaTypeOptions.All,
			allowsEditing: true,
			aspect: [4, 3],
			quality: 1,
		});

		console.log(result);

		if (!result.cancelled) {
			setImage(result.uri);
		}
	};

	return (
		<View style={{ paddingBottom: 50 }}>
			<View style={styles.productDetailsTop}>
				<TouchableOpacity
					onPress={() => navigation.goBack()}
				>
					<Icon name="arrow-back" color="#333" size={30} />
				</TouchableOpacity>
			</View>
			<>
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
					<View style={styles.container}>
						<View style={styles.LoginBox}>
							<View
								style={{
									marginTop: 0,
									flexDirection: 'row',
									alignItems: 'center',
								}}
							>
								<TouchableOpacity onPress={uploadImage}>
									<View
										style={{
											marginLeft: 0,
											height: 250,
											width: width - 50,
											backgroundColor: '#f5f5f5',
											textAlign: 'center',
											justifyContent: 'center',
											alignItems: 'center',
											borderRadius: 10,
										}}
									>
										<Image
											source={{
												uri: image,
											}}
											style={{
												width: '100%',
												height: '100%',
												borderRadius: 5,
												resizeMode: 'contain',
												borderWidth: 1,
												borderColor: '#999',
											}}
										/>
									</View>
								</TouchableOpacity>
							</View>
							<View style={styles.relative}>
								<Text>Name of Product</Text>
								<TextInput
									placeholder="Name of product"
									placeholderTextColor="#333"
									style={styles.inputBox}
									value={name}
									onChangeText={setName}
								/>
							</View>
							<View style={styles.relative}>
								<Text>Product Brand Name</Text>
								<TextInput
									placeholder="Brand Name"
									placeholderTextColor="#333"
									style={styles.inputBox}
									value={brand}
									onChangeText={setBrand}
								/>
							</View>
							<View style={styles.relative}>
								<Text>Product Size</Text>
								<TextInput
									placeholder="Size"
									placeholderTextColor="#333"
									style={styles.inputBox}
									value={size}
									onChangeText={setSize}
								/>
							</View>
							<View style={styles.relative}>
								<TextInput
									placeholder=""
									placeholderTextColor="#333"
									style={styles.hiddenInput}
									value={pendingProduct}
									onChangeText={setPendingProduct}
								/>
							</View>
							<View style={styles.relative}>
								<TextInput
									placeholder=""
									placeholderTextColor="#333"
									style={styles.hiddenInput}
									value={vendor}
									onChangeText={setVendor}
								/>
							</View>
							<View style={styles.relative}>
								<Text>Price</Text>
								<TextInput
									placeholder="Price"
									placeholderTextColor="#333"
									style={styles.inputBox}
									value={price.toString()}
									onChangeText={setPrice}
								/>
							</View>
							<View style={styles.relative}>
								<Text>Product Description</Text>
								<TextInput
									placeholder="Description"
									placeholderTextColor="#333"
									style={styles.descriptionBox}
									value={description}
									multiline={true}
									numberOfLines={4}
									onChangeText={setDescription}
								/>
							</View>
							<View style={styles.relative}>
								<Text>Category</Text>
								<TextInput
									placeholder="Category"
									placeholderTextColor="#333"
									style={styles.inputBox}
									value={category}
									onChangeText={setCategory}
								/>
							</View>
							<View style={styles.relative}>
								<Text>Count in Stock</Text>
								<TextInput
									placeholder="Count in Stock"
									placeholderTextColor="#333"
									style={styles.inputBox}
									value={countInStock.toString()}
									onChangeText={setCountInStock}
								/>
							</View>
							<View>
								<View style={styles.relative}>
									<TextInput
										placeholder=""
										placeholderTextColor="#333"
										style={styles.hiddenInput}
										value={approved}
										onChangeText={setApproved}
									/>
								</View>
							</View>
							<View style={styles.relative}>
								<TouchableOpacity onPress={submitData}>
									<View style={styles.Button}>
										<Text
											style={{
												color: '#fff',
												fontSize: 18,
											}}
										>
											Upload
										</Text>
									</View>
								</TouchableOpacity>
							</View>

							<View>
								<TouchableOpacity
									onPress={() => navigation.goBack()}
								>
									<View
										style={{
											width: width * 1 - 50,
											height: 50,
											borderRadius: 5,
											backgroundColor: 'red',
											alignItems: 'center',
											justifyContent: 'center',
											marginTop: 50,
										}}
									>
										<Text
											style={{
												color: '#fff',
												fontSize: 18,
											}}
										>
											Reject
										</Text>
									</View>
								</TouchableOpacity>
							</View>
						</View>
					</View>
				</ScrollView>
			</>
		</View>
	);
};

export default AdminPendingDetails;

const styles = StyleSheet.create({
	scrollView: {
		alignSelf: 'center',
	},
	contentContainer: {
		justifyContent: 'center',
		alignItems: 'center',
	},
	container: {
		width: width * 1,
		padding: 20,
		backgroundColor: '#fff',
		// height: width * 2,
	},
	LoginHeader: {
		width: width * 1,
		paddingTop: width / 150,
		paddingLeft: 10,
	},
	inputBox: {
		width: width * 1 - 50,
		borderWidth: 1,
		borderRadius: 5,
		borderColor: '#72B541',
		paddingLeft: 10,
		paddingVertical: 10,
		fontSize: 20,
		fontWeight: 'bold',
		color: '#333',
		marginVertical: 10,
	},
	relative: {
		position: 'relative',
	},
	icon: {
		position: 'absolute',
		top: 20,
		left: 10,
		zIndex: 10,
		color: '#72B541',
	},
	LoginBox: {
		marginTop: width / 14,
		height: '100%',
	},
	Button: {
		width: width * 1 - 50,
		height: 50,
		borderRadius: 5,
		backgroundColor: '#72B541',
		alignItems: 'center',
		justifyContent: 'center',
		marginTop: 50,
	},
	productDetailsTop: {
		width: width * 1,
		flexDirection: 'row',
		alignItems: 'center',
		height: width / 6,
		paddingHorizontal: 10,
		elevation: 8,
		backgroundColor: '#fff',
	},
	hiddenInput: {
		width: 0,
		height: 0,
	},
	descriptionBox: {
		width: width * 1 - 50,
		borderWidth: 1,
		borderRadius: 5,
		borderColor: '#72B541',
		paddingLeft: 10,
		paddingVertical: 10,
		fontSize: 20,
		fontWeight: 'bold',
		color: '#333',
		marginVertical: 1,
	},
});
