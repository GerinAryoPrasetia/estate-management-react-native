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
  ActivityIndicator,
} from 'react-native';
import ImgBayar from '../../../../assets/img/bayar.png';
import AsyncStorage from '@react-native-async-storage/async-storage';
import ModalPicker from '../../../components/ModalPicker';
import {Picker} from '@react-native-picker/picker';

const PaymentPageAir = ({route, navigation}) => {
  const {name, pdam, refId, price} = route.params;
  const [refIdMethod, setRefIdMethod] = useState('');
  const [bearer, setBearer] = useState('');
  const [numberVa, setNumberVa] = useState('');
  const [amount, setAmount] = useState('');
  const [chooseData, setChooseData] = useState('Select Bank...');
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [selectedBank, setSelectedBank] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const bank = [
    {text: 'BNI VA', value: 'bni'},
    {text: 'BCA VA', value: 'bca'},
    {text: 'MANDIRI VA', value: 'mandiri'},
    {text: 'BRI VA', value: 'bri'},
  ];
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
        // error reading valuew
        console.log(e);
      }
    };
    getData();
  }, []);

  const handleSubmit = () => {
    setIsLoading(true);
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
              bank: selectedBank,
            }),
          },
        );
        const responseJson = await response.json();
        console.log(responseJson);
        // setNumberVa();
        if (responseJson.status_code === '201') {
          setIsLoading(false);
          navigation.navigate('InvoiceAir', {
            numberVa: responseJson.va_numbers[0].va_number,
            amount: responseJson.gross_amount,
          });
          console.log('Navigate');
        }
      } catch (e) {
        console.log('error bayar pdam', e);
      }
    };
    postData();
  };
  console.log(selectedBank);
  return (
    <View style={styles.container}>
      <ScrollView>
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
          <Text style={styles.title}>Cabang PDAM</Text>
          <View style={styles.idData}>
            <Text style={styles.text}>{pdam}</Text>
          </View>
          <Text style={styles.title}>Biaya</Text>
          <View style={styles.idData}>
            <Text style={styles.text}>Rp {price}</Text>
          </View>
          <Text style={styles.textBank}>Select Bank</Text>
          <View style={styles.pickerView}>
            <Picker
              selectedValue={selectedBank}
              onValueChange={(itemValue, itemIndex) =>
                setSelectedBank(itemValue)
              }
              mode="dropdown"
              style={styles.picker}>
              {bank &&
                bank.length > 0 &&
                bank.map((b, idx) => {
                  return (
                    <Picker.Item label={b.text} value={b.value} key={idx} />
                  );
                })}
            </Picker>
          </View>
          <TouchableOpacity style={styles.reqBtn} onPress={handleSubmit}>
            {isLoading ? (
              <ActivityIndicator color={'white'} />
            ) : (
              <Text style={{color: 'white'}}>Bayar</Text>
            )}
          </TouchableOpacity>
        </View>
      </ScrollView>
    </View>
  );
};

export default PaymentPageAir;

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
    width: '100%',
    padding: 10,
    borderWidth: 1,
    borderColor: 'black',
    borderRadius: 10,
  },
  text: {
    color: 'black',
  },
  textBank: {
    color: 'black',
    marginTop: 10,
  },
  picker: {
    marginVertical: 10,
    width: 300,
    padding: 10,
    borderWidth: 1,
    borderColor: '#666',
    backgroundColor: '#fff',
    color: 'black',
  },
  pickerItem: {
    color: 'black',
  },
});
