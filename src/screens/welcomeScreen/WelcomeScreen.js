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

const WelcomeScreen = props => {
  const [authLoaded, setAuthLoaded] = useState(false);

  useEffect(() => {
    setTimeout(() => {
      setAuthLoaded(true);
    }, 2500);
  }, []);

  useEffect(() => {
    if (authLoaded) {
      props.navigation.replace('Register');
    }
  }, [authLoaded, props.navigation]);

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
