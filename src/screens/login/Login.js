import React, {useEffect, useState} from 'react';
import {
  SafeAreaView,
  View,
  Text,
  StyleSheet,
  Image,
  Dimensions,
  TouchableOpacity,
  TextInput,
  KeyboardAvoidingView,
  ActivityIndicator,
} from 'react-native';
import LoginImg from '../../../assets/img/loginImg.png';
import AsyncStorage from '@react-native-async-storage/async-storage';

const Login = ({navigation}) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [deviceToken, setDeviceToken] = useState('');
  const [errorText, setErrorText] = useState('');
  const [bearerToken, setBearerToken] = useState('');
  const [userId, setUserId] = useState('');
  const [deviceTokenStorage, setDeviceTokenStorage] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [tokenLogin, setTokenLogin] = useState('');
  useEffect(() => {
    async function readValue() {
      const token = await AsyncStorage.getItem('@token');

      return token;
    }
    console.log(readValue());
    setDeviceToken(readValue());
  }, []);

  const storeBearer = async bearer => {
    try {
      await AsyncStorage.setItem('@storage_bearer', bearer);
      console.log('bearer store' + bearer);
    } catch (e) {
      console.log(e);
    }
  };
  const storeTokenLogin = async login_token => {
    try {
      await AsyncStorage.setItem('@user_id', login_token);
      console.log('id store' + login_token);
    } catch (e) {
      console.log(e);
    }
  };
  const handleSubmit = () => {
    setIsLoading(true);
    const reqOption = {
      method: 'POST',
      headers: {
        // Authorization: 'Token',
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        email: email,
        password: password,
        device_token: deviceToken._W,
      }),
    };
    fetch('https://estate.royalsaranateknologi.com/api/login', reqOption)
      .then(response => response.json())
      .then(data => {
        // console.log('ini response ', responseJson);
        console.log('response json', data);
        console.log('token json', data.access_token);
        // setBearerToken(responseJson.access_token);
        // AsyncStorage.setItem('@storage_Key', bearerToken);

        const storageToken = data.access_token;
        // storeBearer(storageToken);
        // storeToken(storageToken);
        // storeId(data.user_id);
        console.log('bearer token', bearerToken);
        storeTokenLogin(data.access_token);
        console.log(storageToken);
        if (data.message === 'sukses') {
          setIsLoading(false);
          storeBearer(storageToken);
          navigation.navigate('HomeTab');
        } else {
          setErrorText(data.msg);
          console.log(errorText + 'error text');
        }
      });
  };

  const onChangeEmail = e => {
    setEmail(e);
  };

  const onChangePassword = e => {
    setPassword(e);
  };

  return (
    <View style={styles.container}>
      <ActivityIndicator color={'#fff'} />
      <SafeAreaView />
      <View style={styles.imgContainer}>
        <Image source={LoginImg} style={styles.LoginImg} />
      </View>
      <View style={styles.footer}>
        <Text style={styles.title}>Login</Text>
        <View style={styles.inputView}>
          <TextInput
            placeholder="Email"
            style={styles.textInput}
            placeholderTextColor="#666"
            onChangeText={onChangeEmail}
          />
        </View>
        <View style={styles.inputView}>
          <TextInput
            placeholder="Password"
            style={styles.textInput}
            placeholderTextColor="#666"
            secureTextEntry={true}
            onChangeText={onChangePassword}
          />
        </View>
        <TouchableOpacity onPress={() => navigation.navigate('Login')}>
          <Text style={styles.loginBtn}>Forgot Password?</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.registerBtn} onPress={handleSubmit}>
          {isLoading ? (
            <ActivityIndicator color={'#fff'} />
          ) : (
            <Text style={styles.loginText}>Register</Text>
          )}
        </TouchableOpacity>
        <TouchableOpacity onPress={() => navigation.navigate('Register')}>
          <Text style={styles.loginBtn}>Create Account</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};
export default Login;

const {height} = Dimensions.get('screen');

const imgHeight = height * 0.3;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    // justifyContent: 'center',
  },
  imgContainer: {
    height: imgHeight,
  },
  LoginImg: {
    flex: 1,
    resizeMode: 'contain',
  },
  title: {
    fontSize: 22,
    color: 'white',
    fontWeight: '600',
    marginBottom: 30,
  },
  footer: {
    flex: 1,
    // justifyContent: 'center',
    padding: 30,
    alignItems: 'center',
    marginTop: 40,
    width: '100%',
    backgroundColor: '#11998E',
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
  },
  inputView: {
    backgroundColor: 'white',
    borderRadius: 20,
    width: '80%',
    height: 45,
    marginBottom: 20,
    alignItems: 'center',
  },
  textInput: {
    height: 50,
    flex: 1,
    padding: 10,
    color: 'black',
  },
  loginBtn: {
    height: 30,
    marginBottom: 15,
    color: 'white',
  },
  registerBtn: {
    width: '80%',
    borderRadius: 25,
    height: 50,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#F58686',
    marginBottom: 10,
  },
  loginText: {
    color: 'white',
  },
});
