import React, {useState, useEffect} from 'react';
import {
  SafeAreaView,
  Text,
  View,
  StyleSheet,
  Image,
  Dimensions,
} from 'react-native';
import Logo from '../../../assets/img/logo.png';
import AsyncStorage from '@react-native-async-storage/async-storage';

const WelcomeScreen = ({navigation}) => {
  const [authLoaded, setAuthLoaded] = useState(false);
  const [isLogin, setIsLogin] = useState(false);
  const [isBearer, setIsBearer] = useState(false);
  // const getTokenLogin = async () => {
  //   try {
  //     const value = await AsyncStorage.getItem('@user_id');
  //     console.log('token LOGIN SPLASH', value);
  //     if (value !== null) {
  //       setIsLogin(true);
  //     }
  //   } catch (e) {
  //     console.log(e);
  //   }
  // };

  const getBearer = async () => {
    try {
      const value = await AsyncStorage.getItem('@storage_bearer');
      console.log('bearer LOGIN SPLASH', value);
      if (value !== null) {
        setIsLogin(true);
      }
    } catch (e) {
      console.log(e);
    }
  };

  useEffect(() => {
    setTimeout(() => {
      setAuthLoaded(true);
    }, 2500);
  }, [authLoaded]);

  useEffect(() => {
    // getTokenLogin();
    getBearer();
    if (authLoaded && isLogin === false) {
      navigation.navigate('Register');
    } else if (isLogin) {
      navigation.navigate('HomeTab');
    }
  }, [authLoaded, isLogin]);

  // useEffect(() => {
  //   getTokenLogin();
  //   if (authLoaded) {
  //     navigation.navigate('Register');
  //   }
  // }, [authLoaded]);

  return (
    <View style={styles.container}>
      <Image source={Logo} style={styles.logo} />
      <Text style={styles.title}>Estate Management</Text>
    </View>
  );
};

const ScreenHeight = Dimensions.get('window').height;
const logoHeight = ScreenHeight * 0.3;
const styles = StyleSheet.create({
  container: {
    height: ScreenHeight,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#11998E',
  },
  title: {
    paddingTop: 20,
    fontSize: 26,
    color: 'white',
  },
  logo: {
    height: logoHeight,
    width: logoHeight,
  },
});

export default WelcomeScreen;
