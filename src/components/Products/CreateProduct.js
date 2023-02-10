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
import SelectPicker from 'react-native-form-select-picker';
var { width } = Dimensions.get('window');
import Icon from 'react-native-vector-icons/Ionicons';
import * as ImagePicker from 'expo-image-picker';
// import { Constants, ImagePicker } from 'expo';
import { useDispatch, useSelector } from 'react-redux';
import Header from '../Layout/Header';

const wait = (timeout) => {
	return new Promise((resolve) =>
		setTimeout(resolve, timeout),
	);
};

const options = [
	"Men's Health",
	"Women's Health",
	"Children's Health",
	'Health and Vitality',
	'Internal Health',
	'Diet and Detox',
];

const CreateProduct = ({ navigation }) => {
	const [refreshing, setRefreshing] = React.useState(false);

	const onRefresh = React.useCallback(() => {
		setRefreshing(true);
		wait(2000).then(() => setRefreshing(false));
	}, []);

	const { vendorInfo } = useSelector(
		(state) => state.vendorLogin,
	);

	const [name, setName] = useState('');
	const [brand, setBrand] = useState('');
	const [price, setPrice] = useState('');
	const [description, setDescription] = useState('');
	const [category, setCategory] = useState('');
	const [size, setSize] = useState('');
	const [countInStock, setCountInStock] = useState('');
	const [vendor, setVendor] = useState(
		`${vendorInfo.vendor._id}`,
	);
	const [image, setImage] = useState(
		'https://icon-library.com/images/add-photo-icon/add-photo-icon-19.jpg',
	);

	const submitData = () => {
		fetch(
			'https://oneshopadmin.herokuapp.com/api/products/pending',
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
					size,
				}),
			},
		)
			.then((res) => res.json())
			.then((data) => {
				navigation.navigate('Home');
			});
	};

	const pickImage = async () => {
		let result = await ImagePicker.launchImageLibraryAsync({
			allowsEditing: true,
			aspect: [1, 1],
			base64: true,
		});

		if (!result.cancelled) {
			let base64Img = `data:image/jpg;base64,${result.base64}`;

			//Add your cloud name
			let apiUrl =
				'https://api.cloudinary.com/v1_1/dg0lat2d3/image/upload';

			let data = {
				file: base64Img,
				upload_preset: 'oneshop',
			};

			fetch(apiUrl, {
				body: JSON.stringify(data),
				headers: {
					'content-type': 'application/json',
				},
				method: 'POST',
			})
				.then(async (r) => {
					let data = await r.json();
					console.log(data);
					setImage(data.secure_url);
					return data.secure_url;
				})
				.catch((err) => console.log(err));
		}
	};

	return (
		<View>
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
							<View style={styles.relative}>
								<View
									style={{
										marginTop: 0,
										flexDirection: 'row',
										alignItems: 'center',
									}}
								>
									<TouchableOpacity onPress={pickImage}>
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
							</View>
							<View style={styles.relative}>
								<TextInput
									placeholder="Name of product"
									placeholderTextColor="#333"
									style={styles.inputBox}
									value={name}
									onChangeText={setName}
								/>
							</View>
							<View style={styles.relative}>
								<TextInput
									placeholder="Brand Name"
									placeholderTextColor="#333"
									style={styles.inputBox}
									value={brand}
									onChangeText={setBrand}
								/>
							</View>
							<View style={styles.relative}>
								<TextInput
									placeholder="Size"
									placeholderTextColor="#333"
									style={styles.inputBox}
									value={size}
									onChangeText={setSize}
								/>
							</View>
							<View
								style={{
									borderWidth: 1,
									width: '97%',
									marginBottom: 5,
									borderColor: '#72B541',
									borderRadius: 5,
								}}
							>
								<SelectPicker
									onValueChange={(value) => {
										setCategory(value);
									}}
									category={category}
									placeholder="Select Category"
									placeholderStyle={{
										fontSize: 20,
										color: '#000',
										fontWeight: 'bold',
									}}
									titleText="Select Category"
								>
									{Object.values(options).map(
										(val, index) => (
											<SelectPicker.Item
												label={val}
												value={val}
												key={index}
											/>
										),
									)}
								</SelectPicker>
							</View>
							<View style={styles.relative}>
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
								<TextInput
									placeholder=""
									placeholderTextColor="#333"
									style={styles.hiddenInput}
									value={vendor}
									onChangeText={setVendor}
								/>
							</View>
							<View style={styles.relative}>
								<TextInput
									placeholder="Price"
									placeholderTextColor="#333"
									style={styles.inputBox}
									value={price}
									keyboardType="numeric"
									onChangeText={setPrice}
								/>
							</View>
							<View style={styles.relative}>
								<TextInput
									placeholder="Count in Stock"
									placeholderTextColor="#333"
									style={styles.inputBox}
									value={countInStock}
									keyboardType="numeric"
									onChangeText={setCountInStock}
								/>
							</View>
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
					</View>
				</ScrollView>
			</>
		</View>
	);
};

export default CreateProduct;

const styles = StyleSheet.create({
	container: {
		width: width * 1,
		paddingHorizontal: 20,
		backgroundColor: '#fff',
		// height: width * 3 - 100,
	},
	scrollView: {
		alignSelf: 'center',
	},
	contentContainer: {
		justifyContent: 'center',
		alignItems: 'center',
	},
	LoginHeader: {
		width: width * 1,
		paddingTop: width / 550,
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
});
