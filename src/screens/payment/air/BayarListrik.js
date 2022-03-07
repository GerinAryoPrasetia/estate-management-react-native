/* eslint-disable no-lone-blocks */
import React, {useState, useEffect} from 'react';
import {
  View,
  Text,
  SafeAreaView,
  Image,
  StyleSheet,
  TouchableOpacity,
  TextInput,
  Button,
} from 'react-native';

import ImgBayar from '../../../../assets/img/bayar.png';
import DropDownPicker from 'react-native-dropdown-picker';
import AsyncStorage from '@react-native-async-storage/async-storage';

const BayarListrik = ({navigation}) => {
  const [idPelanggan, setIdPelanggan] = useState('');
  const [missingId, setMissingId] = useState(false);
  const [bearer, setBearer] = useState('');
  const [name, setName] = useState('');
  const [refId, setRefId] = useState('');

  useEffect(() => {
    const getToken = async () => {
      try {
        const value = await AsyncStorage.getItem('@storage_Key');
        if (value !== null) {
          // value previously stored
          console.log('sync storage account', value);
          setBearer(value);
        }
      } catch (e) {
        console.log(e);
      }
    };
    getToken();
  });

  const onChange = e => {
    setIdPelanggan(e);
    setMissingId(false);
  };
  const submitId = () => {
    //TODO: Cek id pelanggan via API
    // if (idPelanggan != '') {
    //   navigation.navigate('PaymentListrik', {idPelanggan: idPelanggan});
    // } else {
    //   setMissingId(true);
    // }
    fetch('https://estate.sonajaya.com/api/inquiry-postpaid-pln', {
      method: 'POST',
      headers: {
        Authorization: `Bearer ${bearer}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        customer_id: idPelanggan,
      }),
    })
      .then(response => response.json())
      .then(responseJson => {
        console.log(responseJson, 'data pln inquiry');
        setName(responseJson.data.tr_name);
        setRefId(responseJson.data.ref_id);
        if (
          responseJson.data.message === 'INQUIRY SUCCESS' &&
          name !== undefined &&
          refId !== undefined &&
          name !== '' &&
          refId !== ''
        ) {
          console.log('ifname', name);
          console.log('ref', refId);
          navigation.navigate('PaymentListrik', {
            idPelanggan: idPelanggan,
            name: name,
            refId: refId,
          });
        }
      })
      .catch(e => {
        console.log('error inquiry', e);
      });
  };
  // console.log(idPelanggan);
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
        <Text style={styles.text}>Masukkan ID Pelanggan</Text>
        <TextInput
          style={styles.inputView}
          value={idPelanggan}
          onChangeText={onChange}
        />
        <TouchableOpacity style={styles.reqBtn} onPress={submitId}>
          <Text style={{color: 'white'}}>Bayar</Text>
        </TouchableOpacity>
        {missingId ? (
          <Text style={styles.warningText}>Masukkan ID Pelanggan Anda!</Text>
        ) : (
          <Text></Text>
        )}
      </View>
    </View>
  );
};

export default BayarListrik;

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
    color: 'black',
  },
  text: {
    color: 'black',
  },
});

{
  /* <DropDownPicker
          open={openOne}
          value={valueVa}
          items={virtualAccount}
          setOpen={setOpenOne}
          setValue={setValueVa}
          setItems={setVirtualAccount}
          placeholder="Virtual Account"
          zIndex={3000}
          zIndexInverse={1000}
          style={styles.dropDown}
        />

        <DropDownPicker
          open={openTwo}
          value={valueTransfer}
          items={transferBank}
          setOpen={setOpenTwo}
          setValue={setValueTransfer}
          setItems={setTransferBank}
          placeholder="Transfer Bank"
          zIndex={2000}
          zIndexInverse={2000}
          style={styles.dropDown}
        /> */
}
