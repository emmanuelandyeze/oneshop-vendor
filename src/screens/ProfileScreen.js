import {
	StyleSheet,
	Text,
	View,
	Image,
	ScrollView,
	TouchableOpacity,
	Dimensions,
	TextInput,
} from 'react-native';
import React, { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import Icon from '@expo/vector-icons/Ionicons';
import AsyncStorage from '@react-native-async-storage/async-storage';
var { width } = Dimensions.get('window');
import { logout } from '../../Redux/actions/vendorActions';

const ProfileScreen = ({ navigation }) => {
	const dispatch = useDispatch();

	const { vendorInfo } = useSelector(
		(state) => state.vendorLogin,
	);

	const logoutHandler = async () => {
		// await AsyncStorage.removeItem('vendorInfo');
		navigation.navigate('Login');
	};

	const [name, setName] = useState(vendorInfo.vendor.name);
	const [email, setEmail] = useState(
		vendorInfo.vendor.email,
	);
	const [password, setPassword] = useState('');
	const [id, setId] = useState(vendorInfo.vendor._id);
	const [category, setCategory] = useState(
		vendorInfo.vendor.category,
	);
	const [phoneNumber, setPhoneNumber] = useState(
		vendorInfo.vendor.phoneNumber,
	);
	const [bankName, setBankName] = useState(
		vendorInfo.vendor.bankName,
	);
	const [accountNumber, setAccountNumber] = useState(
		vendorInfo.vendor.accountNumber,
	);
	const [accountName, setAccountName] = useState(
		vendorInfo.vendor.accountName,
	);

	const submitData = () => {
		fetch(
			`https://oneshopadmin.herokuapp.com/api/vendors/profile/${vendorInfo.vendor._id}`,
			{
				method: 'put',
				headers: {
					Authorization: `Bearer ${vendorInfo.token}`,
					'Content-Type': 'application/json',
				},
				body: JSON.stringify({
					name,
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
				alert('Profile Updated');
			});
	};

	const submitPassword = () => {
		fetch(
			`https://oneshopadmin.herokuapp.com/api/vendors/profile/${vendorInfo.vendor._id}`,
			{
				method: 'put',
				headers: {
					Authorization: `Bearer ${vendorInfo.token}`,
					'Content-Type': 'application/json',
				},
				body: JSON.stringify({
					password,
				}),
			},
		)
			.then((res) => res.json())
			.then((data) => {
				alert('Password Updated');
			});
	};

	return (
		<View>
			<ScrollView
				style={styles.scrollView}
				contentContainerStyle={styles.contentContainer}
				showsVerticalScrollIndicator={false}
				showsHorizontalScrollIndicator={false}
			>
				<View style={styles.LoginBox}>
					<View
						style={{
							display: 'flex',
							flexDirection: 'row',
							justifyContent: 'space-between',
							alignItems: 'center',
						}}
					>
						<Text
							style={{ fontWeight: 'bold', fontSize: 25 }}
						>
							Edit My Profile
						</Text>
						<TouchableOpacity onPress={logoutHandler}>
							<Text
								style={{
									backgroundColor: 'red',
									padding: 10,
									color: '#fff',
									fontSize: 16,
									borderRadius: 8,
									fontWeight: 'bold',
								}}
							>
								Logout
							</Text>
						</TouchableOpacity>
					</View>
					<Text
						style={{ fontSize: 18, fontWeight: 'bold' }}
					>
						Name
					</Text>
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
					<Text
						style={{ fontSize: 18, fontWeight: 'bold' }}
					>
						Email Address
					</Text>
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
					<Text
						style={{ fontSize: 18, fontWeight: 'bold' }}
					>
						Category
					</Text>
					<View style={styles.relative}>
						<Icon
							name="options-outline"
							size={25}
							style={styles.icon}
						/>
						<TextInput
							placeholder="Category"
							placeholderTextColor="#333"
							value={category}
							onChangeText={setCategory}
							style={styles.inputBox}
						/>
					</View>
					<Text
						style={{ fontSize: 18, fontWeight: 'bold' }}
					>
						Phone Number
					</Text>
					<View style={styles.relative}>
						<TextInput
							placeholder="Id"
							placeholderTextColor="#333"
							value={id}
							onChangeText={setId}
							style={styles.hideInput}
						/>
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
					<Text
						style={{ fontSize: 18, fontWeight: 'bold' }}
					>
						Account Name
					</Text>
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
					<Text
						style={{ fontSize: 18, fontWeight: 'bold' }}
					>
						Bank Name
					</Text>
					<View style={styles.relative}>
						<Icon
							name="briefcase-outline"
							size={25}
							style={styles.icon}
						/>
						<TextInput
							placeholder="Bank Name"
							placeholderTextColor="#333"
							value={bankName}
							onChangeText={setBankName}
							style={styles.inputBox}
						/>
					</View>
					<Text
						style={{ fontSize: 18, fontWeight: 'bold' }}
					>
						Account Number
					</Text>
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
									Update Profile
								</Text>
							</View>
						</TouchableOpacity>
					</View>
					<View>
						<View style={styles.relative}>
							<Icon
								name="lock-closed-outline"
								size={25}
								style={styles.passwordIcon}
							/>
							<TextInput
								placeholder="New Password"
								placeholderTextColor="red"
								value={password}
								onChangeText={setPassword}
								style={styles.passwordInputBox}
								secureTextEntry
							/>
						</View>
						<View style={styles.relative}>
							<TouchableOpacity onPress={submitPassword}>
								<View style={styles.passwordButton}>
									<Text
										style={{ color: '#fff', fontSize: 18 }}
									>
										Update Password
									</Text>
								</View>
							</TouchableOpacity>
						</View>
					</View>
				</View>
			</ScrollView>
		</View>
	);
};

export default ProfileScreen;

const styles = StyleSheet.create({
	scrollView: {
		alignSelf: 'center',
	},
	contentContainer: {
		justifyContent: 'center',
		alignItems: 'center',
	},
	LoginHeader: {
		width: width * 1,
		paddingTop: width / 50,
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
	passwordInputBox: {
		width: width * 1 - 50,
		borderWidth: 1,
		borderRadius: 5,
		borderColor: 'red',
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
	passwordIcon: {
		position: 'absolute',
		top: 20,
		left: 10,
		zIndex: 10,
		color: 'red',
	},
	LoginBox: {
		marginTop: width / 20,
		paddingLeft: 0,
	},
	Button: {
		width: width * 1 - 50,
		height: 50,
		borderRadius: 5,
		backgroundColor: '#72B541',
		alignItems: 'center',
		justifyContent: 'center',
		marginTop: 20,
	},
	passwordButton: {
		width: width * 1 - 50,
		height: 50,
		borderRadius: 5,
		backgroundColor: 'red',
		alignItems: 'center',
		justifyContent: 'center',
		marginTop: 0,
	},
	hideInput: {
		width: 0,
		height: 0,
	},
});
