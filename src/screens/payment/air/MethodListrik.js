import React, {useState, useEffect} from 'react';
import {
  View,
  Text,
  StyleSheet,
  SafeAreaView,
  Image,
  TouchableOpacity,
  Modal,
} from 'react-native';
import ImgBayar from '../../../../assets/img/bayar.png';
import SelectDropdown from 'react-native-select-dropdown';
import AsyncStorage from '@react-native-async-storage/async-storage';
import ModalPicker from '../../../components/ModalPicker';
import {Picker} from '@react-native-picker/picker';
import {color} from 'react-native-elements/dist/helpers';

const MethodListrik = ({route, navigation}) => {
  const [bearer, setBearer] = useState('');
  const [numberVa, setNumberVa] = useState('');
  const [price, setPrice] = useState('');
  const [chooseData, setChooseData] = useState('Select Bank...');
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [isLoading, setIsloading] = useState(false);
  const [selectedBank, setSelectedBank] = useState('bni');
  const OPTIONS = [
    {text: 'BNI VA', value: 'bni'},
    {text: 'BCA VA', value: 'bca'},
    {text: 'MANDIRI VA', value: 'mandiri'},
    {text: 'BRI VA', value: 'bri'},
  ];

  const {refId} = route.params;
  console.log('refIdMethod', refId);
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
  });
  const handleSubmit = async () => {
    try {
      await fetch(
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
      )
        .then(response => response.json())
        .then(responseJson => {
          console.log(responseJson);
          if (
            responseJson.status_message ===
            'Success, Bank Transfer transaction is created'
          ) {
            navigation.navigate('InvoiceListrik', {
              numberVa: responseJson.va_numbers[0].va_number,
              price: responseJson.gross_amount,
            });
          }
        });
    } catch (e) {
      console.log('error ', e);
    }
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
        <Text style={styles.titleBlack}>Pilih Metode Pembayaran</Text>
        <Picker
          selectedValue={selectedBank}
          onValueChange={(itemValue, itemIndex) => setSelectedBank(itemValue)}
          mode="dropdown"
          style={styles.picker}>
          {OPTIONS &&
            OPTIONS.length > 0 &&
            OPTIONS.map((b, idx) => {
              return <Picker.Item label={b.text} value={b.value} key={idx} />;
            })}
        </Picker>
        <TouchableOpacity style={styles.reqBtn} onPress={handleSubmit}>
          <Text style={{color: 'white'}}>Bayar</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default MethodListrik;

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
  warningText: {
    color: 'red',
  },
  title: {
    color: '#11998E',
    fontSize: 26,
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
    marginBottom: 10,
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
  text: {
    marginVertical: 20,
    fontSize: 16,
  },
  touchableOpacity: {
    alignSelf: 'stretch',
    backgroundColor: 'white',
    borderRadius: 10,
    borderWidth: 1,
    borderColor: 'black',
    paddingHorizontal: 20,
    marginHorizontal: 20,
    marginVertical: 20,
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
  titleBlack: {
    color: 'black',
    fontSize: 18,
  },
});
