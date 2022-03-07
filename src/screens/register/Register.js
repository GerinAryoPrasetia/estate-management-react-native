import React, {useEffect, useState} from 'react';
import {
  View,
  Image,
  Dimensions,
  StyleSheet,
  SafeAreaView,
  Text,
  TextInput,
  Button,
  TouchableOpacity,
} from 'react-native';
import LoginImage from '../../../assets/img/login.png';
import AsyncStorage from '@react-native-async-storage/async-storage';

const Register = ({navigation}) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [rePassword, setRePassword] = useState('');
  const [name, setName] = useState('');
  const [match, setMatch] = useState(false);
  const [number, setNumber] = useState('');
  const [auth, setAuth] = useState(false);
  const [isRegistraionSuccess, setIsRegistraionSuccess] = useState(false);
  const [errorText, setErrorText] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [data, setData] = useState({});
  const [deviceToken, setDeviceToken] = useState('');
  const [bearerToken, setBearerToken] = useState('');
  const [userId, setUserId] = useState('');

  useEffect(() => {
    function getRandomString(length) {
      var randomChars =
        'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
      var result = '';
      for (var i = 0; i < length; i++) {
        result += randomChars.charAt(
          Math.floor(Math.random() * randomChars.length),
        );
      }
      return result;
    }
    setDeviceToken(getRandomString(10));
    // console.log(getRandomString(20));
  }, []);

  const storeToken = async token => {
    try {
      await AsyncStorage.setItem('@storage_Key', token);
      console.log('token store' + token);
    } catch (e) {
      console.log(e);
    }
  };

  const storeId = async id => {
    try {
      await AsyncStorage.setItem('@storage_id', id);
      console.log('id store' + id);
    } catch (e) {
      console.log(e);
    }
  };

  const handleSubmit = () => {
    const requestOption = {
      method: 'POST',
      headers: {'Content-Type': 'application/json'},
      body: JSON.stringify({
        email: email,
        password: password,
        nama: name,
        device_token: deviceToken,
      }),
    };
    fetch('https://estate.sonajaya.com/api/register', requestOption)
      .then(response => response.json())
      .then(responseJson => {
        // console.log('ini response ', responseJson);
        console.log('response json', responseJson);

        // setBearerToken(responseJson.access_token);
        // AsyncStorage.setItem('@storage_Key', bearerToken);

        const storageToken = responseJson.access_token;
        const storageId = responseJson.data.id;
        setBearerToken(storageToken);
        setUserId(storageId);
        storeToken(storageToken);
        storeId(storageId);

        if (responseJson.status === 'sukses') {
          setIsRegistraionSuccess(true);
          // setBearerToken(bearer_token);
          // console.log(bearerToken + ' bearer token');
          navigation.navigate('HomeTab', {name: name});
        } else {
          setErrorText(responseJson.msg);
          console.log(errorText + 'error text');
        }
      })
      .catch(error => {
        console.error(error);
      });
  };

  const onChangeName = e => {
    setName(e);
  };
  const onChangeEmail = e => {
    setEmail(e);
  };
  const onChangePassword = e => {
    setPassword(e);
  };
  const onChangeNumber = e => {
    setNumber(e);
  };

  // console.log(email);

  return (
    <View style={styles.container}>
      <SafeAreaView />
      <View style={styles.imgContainer}>
        <Image source={LoginImage} style={styles.registerImg} />
      </View>
      <View style={styles.footer}>
        <Text style={styles.title}>Create an Account</Text>
        <View style={styles.inputView}>
          <TextInput
            placeholder="Nama"
            style={styles.textInput}
            placeholderTextColor="#666"
            onChangeText={onChangeName}
          />
        </View>
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
          <Text style={styles.loginBtn}>Have an Account?</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.registerBtn} onPress={handleSubmit}>
          <Text style={styles.loginText}>Register</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default Register;

const {height} = Dimensions.get('screen');

const imgHeight = height * 0.3;
// const loginHeight = height * 0.7;
const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#fff',
  },
  registerImg: {
    flex: 1,
    resizeMode: 'contain',
  },
  imgContainer: {
    height: imgHeight,
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
  },
});
