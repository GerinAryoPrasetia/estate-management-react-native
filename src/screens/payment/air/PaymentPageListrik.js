import React, {useState, useEffect} from 'react';
import {
  View,
  Text,
  StyleSheet,
  SafeAreaView,
  Image,
  TextInput,
  TouchableOpacity,
  ActivityIndicator,
} from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {Picker} from '@react-native-picker/picker';
import DropDownPicker from 'react-native-dropdown-picker';
import ImgBayar from '../../../../assets/img/bayar.png';

const PaymentPageListrik = ({route, navigation}) => {
  //   const idPelanggan = navigation.getParam('idPelanggan');
  const {idPelanggan, name, refId} = route.params;
  const [refIdMethod, setRefIdMethod] = useState('');
  const [bearer, setBearer] = useState('');
  const [selectedBank, setSelectedBank] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [openOne, setOpenOne] = useState(false);
  const [openTwo, setOpenTwo] = useState(false);
  const [valueVa, setValueVa] = useState(null);

  useEffect(() => {
    const getToken = async () => {
      try {
        const value = await AsyncStorage.getItem('@storage_Key');
        if (value !== null) {
          // value previously stored
          setBearer(value);
        }
      } catch (e) {
        console.log(e);
      }
    };
    getToken();
    setRefIdMethod(refId);
  }, [refId]);

  const onSubmit = () => {
    fetch('https://estate.sonajaya.com/api/postpaid/payment-va', {
      method: 'POST',
      headers: {
        Authorization: `Bearer ${bearer}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        ref_id: refId,
      }),
    });
  };
  return (
    <View style={styles.container}>
      <SafeAreaView />
      <View style={styles.header}>
        <View>
          <Text style={styles.greetingText}>Bayar Listrik</Text>
        </View>
        <Image source={ImgBayar} />
      </View>
      <View style={styles.content}>
        <Text>ID Pelanggan Anda</Text>
        <View style={styles.idData}>
          <Text>{idPelanggan}</Text>
        </View>
        <Text style={{marginTop: 10}}>Nama Pelanggan</Text>
        <View style={styles.idData}>
          <Text>{name}</Text>
        </View>
        <TouchableOpacity
          style={styles.reqBtn}
          onPress={() => {
            setIsLoading(true);
            setRefIdMethod(refId);
            navigation.navigate('MethodListrik', {refId: refIdMethod});
          }}>
          {isLoading ? (
            <ActivityIndicator color={'white'} />
          ) : (
            <Text style={{color: 'white'}}>Bayar</Text>
          )}
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default PaymentPageListrik;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#11998E',
    paddingTop: 20,
  },
  header: {
    // flex: 1,
    flexDirection: 'row',
    justifyContent: 'space-around',
    alignItems: 'center',
  },
  content: {
    backgroundColor: 'white',
    flex: 1,
    marginTop: 30,
    width: '85%',
    borderTopRightRadius: 30,
    padding: 30,
    alignItems: 'center',
  },
  greetingText: {
    color: 'white',
    fontSize: 22,
    fontWeight: 'bold',
  },
  title: {
    color: '#11998E',
    fontSize: 20,
    marginBottom: 20,
  },
  priceContainer: {
    paddingTop: 20,
    paddingBottom: 20,
    width: '70%',
    alignItems: 'center',
    borderColor: 'black',
    borderWidth: 1,
    borderRadius: 10,
    marginBottom: 30,
  },
  priceText: {
    fontSize: 20,
  },
  dropDown: {
    marginBottom: 15,
    marginTop: 15,
    width: '80%',
  },
  reqBtn: {
    width: '80%',
    borderRadius: 25,
    height: 50,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#11998E',
    marginTop: 20,
    fontWeight: '700',
  },
  inputView: {
    backgroundColor: 'white',
    borderWidth: 1,
    borderColor: 'grey',
    width: '80%',
    padding: 10,
    borderRadius: 10,
    marginTop: 20,
  },
  idData: {
    marginTop: 10,
    backgroundColor: 'white',
    width: '80%',
    padding: 10,
    borderWidth: 1,
    borderColor: 'black',
    borderRadius: 10,
  },
});
