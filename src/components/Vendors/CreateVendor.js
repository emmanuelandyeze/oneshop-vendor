import {
	StyleSheet,
	Text,
	View,
	Dimensions,
	TouchableOpacity,
	TextInput,
	Image,
	ScrollView,
} from 'react-native';
import React, { useEffect, useState } from 'react';
var { width } = Dimensions.get('window');
import * as ImagePicker from 'expo-image-picker';
import SelectPicker from 'react-native-form-select-picker';
import Icon from '@expo/vector-icons/Ionicons';
import { useDispatch, useSelector } from 'react-redux';

const CreateVendor = ({ navigation }) => {
	const dispatch = useDispatch();

	const { vendorInfo } = useSelector(
		(state) => state.vendorLogin,
	);

	const options = ['Individual', 'Company'];
	const banks = [
		'Access Bank Plc',
		'Citibank Nigeria Limited',
		'Ecobank Nigeria',
		'Fidelity Bank Plc',
		'First City Monument Bank Limited',
		'First Bank of Nigeria Limited',
		'Guaranty Trust Holding Company Plc',
		'Heritage Bank Plc',
		'Keystone Bank Limited',
		'Kuda Bank',
		'Polaris Bank Limited',
		'Stanbic IBTC Bank Plc',
		'Standard Chartered',
		'Sterling Bank Plc',
		'Titan Trust Bank Limited',
		'Unity Bank Plc',
		'Union Bank of Nigeria Plc',
		'United Bank for Africa Plc',
		'VFD Microfinance Bank',
		'Wema Bank Plc',
		'Zenith Bank Plc',
	];

	const [name, setName] = useState('');
	const [email, setEmail] = useState('');
	const [password, setPassword] = useState('12345678');
	const [category, setCategory] = useState('');
	const [phoneNumber, setPhoneNumber] = useState('');
	const [bankName, setBankName] = useState('');
	const [accountNumber, setAccountNumber] = useState('');
	const [accountName, setAccountName] = useState('');
	const [avatar, setAvatar] = useState(
		'https://mern-nest-ecommerce.herokuapp.com/profile.png',
	);

	const uploadImage = async () => {
		let image = await ImagePicker.launchImageLibraryAsync({
			mediaTypes: ImagePicker.MediaTypeOptions.All,
			allowsEditing: true,
			aspect: [4, 3],
			quality: 1,
		}).then((image) => {
			setAvatar(image.uri);
		});
	};

	console.log(vendorInfo.token);

	const submitData = () => {
		fetch(
			'https://oneshopadmin.herokuapp.com/api/vendors',
			{
				method: 'post',
				headers: {
					Authorization: `Bearer ${vendorInfo.token}`,
					'Content-Type': 'application/json',
				},
				body: JSON.stringify({
					name,
					avatar,
					password,
					email,
					category,
					phoneNumber,
					bankName,
					accountNumber,
					accountName,
				}),
			},
		)
			.then((res) => res.json())
			.then((data) => {
				navigation.navigate('AdminVendor');
				console.log(data);
			});
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

			<ScrollView
				style={styles.scrollView}
				contentContainerStyle={styles.contentContainer}
				showsVerticalScrollIndicator={false}
				showsHorizontalScrollIndicator={false}
			>
				<View style={styles.LoginBox}>
					<View>
						<Text
							style={{ fontWeight: 'bold', fontSize: 25 }}
						>
							Register a new Vendor
						</Text>
					</View>
					<View style={styles.relative}>
						<Icon
							name="person-circle-outline"
							size={25}
							style={styles.icon}
						/>
						<TextInput
							placeholder="Vendor's Name"
							placeholderTextColor="#333"
							style={styles.inputBox}
							value={name}
							onChangeText={setName}
							textContentType="name"
						/>
					</View>
					<View style={styles.relative}>
						<Icon
							name="mail-open-outline"
							size={25}
							style={styles.icon}
						/>
						<TextInput
							placeholder="Vendor's Email"
							placeholderTextColor="#333"
							style={styles.inputBox}
							value={email}
							onChangeText={setEmail}
							textContentType="emailAddress"
							keyboardType="email-address"
						/>
					</View>
					<View style={styles.relative}>
						<Icon
							name="lock-closed-outline"
							size={25}
							style={{ display: 'none' }}
						/>
						<TextInput
							placeholder="Vendor's Password (Default - 12345678)"
							placeholderTextColor="#333"
							value={password}
							onChangeText={setPassword}
							style={{ display: 'none' }}
							textContentType="password"
							secureTextEntry={true}
						/>
					</View>
					<View
						style={{
							borderWidth: 1,
							width: '92%',
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
								fontSize: 15,
								color: '#000',
								fontWeight: 'bold',
								paddingVertical: 10,
							}}
							titleText="Select Category"
						>
							{Object.values(options).map((val, index) => (
								<SelectPicker.Item
									label={val}
									value={val}
									key={index}
								/>
							))}
						</SelectPicker>
					</View>
					<View style={styles.relative}>
						<Icon
							name="call-outline"
							size={25}
							style={styles.icon}
						/>
						<TextInput
							placeholder="Phone Number"
							placeholderTextColor="#333"
							value={phoneNumber}
							onChangeText={setPhoneNumber}
							style={styles.inputBox}
						/>
					</View>
					<View
						style={{
							borderWidth: 1,
							width: '92%',
							marginBottom: 5,
							borderColor: '#72B541',
							borderRadius: 5,
						}}
					>
						<SelectPicker
							onValueChange={(value) => {
								setBankName(value);
							}}
							bankName={bankName}
							placeholder="Choose Bank"
							placeholderStyle={{
								fontSize: 15,
								color: '#000',
								fontWeight: 'bold',
								paddingVertical: 5,
							}}
							titleText="Select Bank"
						>
							{Object.values(banks).map((val, index) => (
								<SelectPicker.Item
									label={val}
									value={val}
									key={index}
								/>
							))}
						</SelectPicker>
					</View>
					<View style={styles.relative}>
						<Icon
							name="briefcase-outline"
							size={25}
							style={styles.icon}
						/>
						<TextInput
							placeholder="Account Name"
							placeholderTextColor="#333"
							value={accountName}
							onChangeText={setAccountName}
							style={styles.inputBox}
						/>
					</View>
					<View style={styles.relative}>
						<Icon
							name="briefcase-outline"
							size={25}
							style={styles.icon}
						/>
						<TextInput
							placeholder="Account Number"
							placeholderTextColor="#333"
							value={accountNumber}
							onChangeText={setAccountNumber}
							style={styles.inputBox}
						/>
					</View>
					<View style={styles.relative}>
						<TouchableOpacity onPress={submitData}>
							<View style={styles.Button}>
								<Text
									style={{ color: '#fff', fontSize: 18 }}
								>
									Sign Up
								</Text>
							</View>
						</TouchableOpacity>
					</View>
				</View>
			</ScrollView>
		</View>
	);
};

export default CreateVendor;

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
	LoginHeader: {
		width: width * 1,
		paddingTop: width / 5,
		paddingLeft: 10,
	},
	inputBox: {
		width: width * 1 - 50,
		borderWidth: 1,
		borderRadius: 5,
		borderColor: '#72B541',
		paddingLeft: 45,
		paddingVertical: 10,
		fontSize: 15,
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
		marginTop: width / 4,
		paddingLeft: 20,
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
});
