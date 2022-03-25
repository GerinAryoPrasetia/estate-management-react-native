import React, {useState, useEffect} from 'react';
import {
  View,
  Text,
  StyleSheet,
  SafeAreaView,
  TouchableOpacity,
  Image,
  ScrollView,
  Modal,
} from 'react-native';
import ImgBayar from '../../../../assets/img/bayar.png';
import AsyncStorage from '@react-native-async-storage/async-storage';
import ModalPicker from '../../../components/ModalPicker';

const PaymentPageCicilan = ({route, navigation}) => {
  const {name, product, refId, price} = route.params;
  const [refIdMethod, setRefIdMethod] = useState('');
  const [bearer, setBearer] = useState('');
  const [numberVa, setNumberVa] = useState('');
  const [amount, setAmount] = useState('');
  const [chooseData, setChooseData] = useState('Select Bank...');
  const [isModalVisible, setIsModalVisible] = useState(false);

  useEffect(() => {
    const getData = async () => {
      try {
        const value = await AsyncStorage.getItem('@storage_Key');
        // console.log('masuk getData');
        if (value !== null) {
          // value previously stored
          console.log('sync storage pdam', value);
          setBearer(value);
        }
      } catch (e) {
        // error reading value
        console.log(e);
      }
    };
    getData();
  }, []);

  const handleSubmit = () => {
    const postData = async () => {
      try {
        const response = await fetch(
          'https://estate.royalsaranateknologi.com/api/postpaid/payment-va',
          {
            method: 'POST',
            headers: {
              Authorization: `Bearer ${bearer}`,
              'Content-Type': 'application/json',
            },
            body: JSON.stringify({
              ref_id: refId,
              bank: chooseData,
            }),
          },
        );
        const responseJson = await response.json();
        console.log(responseJson);
        setNumberVa(responseJson.va_numbers[0].va_number);
        setAmount(responseJson.gross_amount);
        if (responseJson.status_code === '201') {
          navigation.navigate('InvoiceAir', {
            numberVa: numberVa,
            amount: amount,
          });
          console.log('Navigate');
        }
      } catch (e) {
        console.log('error bayar pdam', e);
      }
    };
    postData();
  };
  const changeModalVisibility = bool => {
    setIsModalVisible(bool);
  };

  const setData = option => {
    setChooseData(option);
  };
  console.log(chooseData);
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
        {/* <Text>ID Pelanggan Anda</Text>
        <View style={styles.idData}>
          <Text>{idPelanggan}</Text>
        </View> */}
        <Text style={styles.title}>Nama Pelanggan</Text>
        <View style={styles.idData}>
          <Text style={styles.text}>{name}</Text>
        </View>
        <Text style={styles.title}>Product Cicilan</Text>
        <View style={styles.idData}>
          <Text style={styles.text}>{product}</Text>
        </View>
        <Text style={styles.title}>Biaya</Text>
        <View style={styles.idData}>
          <Text style={styles.text}>Rp {price}</Text>
        </View>
        <TouchableOpacity
          style={styles.touchableOpacity}
          onPress={() => changeModalVisibility(true)}>
          <Text style={styles.text}>{chooseData}</Text>
        </TouchableOpacity>
        <Modal
          transparent={true}
          animationType="fade"
          visible={isModalVisible}
          nRequestClose={() => changeModalVisibility(false)}>
          <ModalPicker
            changeModalVisibility={changeModalVisibility}
            setData={setData}
          />
        </Modal>
        <TouchableOpacity style={styles.reqBtn} onPress={handleSubmit}>
          <Text style={{color: 'white'}}>Bayar</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default PaymentPageCicilan;

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
    color: 'black',
    fontSize: 16,
    marginTop: 5,
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
  text: {
    color: 'black',
  },
});