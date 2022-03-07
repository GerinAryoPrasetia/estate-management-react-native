import React, {useState, useEffect} from 'react';
import {
  View,
  Text,
  SafeAreaView,
  Image,
  StyleSheet,
  TouchableOpacity,
  ScrollView,
  TextInput,
  Modal,
} from 'react-native';

import ImgBayar from '../../../../assets/img/bayar.png';
import DropDownPicker from 'react-native-dropdown-picker';
import ModalPickerPdam from '../../../components/ModalPickerPdam';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {Picker} from '@react-native-picker/picker';

const BayarCicilan = ({navigation}) => {
  const [idPelanggan, setIdPelanggan] = useState('');
  const [missingId, setMissingId] = useState(false);
  const [cabang, setCabang] = useState([]);
  const [bearer, setBearer] = useState('');
  const [selectedCabang, setSelectedCabang] = useState('');
  const [chooseData, setChooseData] = useState('Select...');
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [refId, setRefId] = useState('');
  const [userId, setUserId] = useState('');

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
    const getDataId = async () => {
      try {
        const id = await AsyncStorage.getItem('@user_id');
        if (id !== null) {
          // value previously stored
          console.log('sync storage komplain userid', id);
          setUserId(id);
        }
      } catch (e) {
        console.log(e);
      }
    };
    const fetchData = async () => {
      try {
        const response = await fetch(
          'https://estate.sonajaya.com/api/multi-finance-list',
          {
            method: 'GET',
            headers: {
              Authorization: `Bearer ${bearer}`,
              'Content-Type': 'application/json',
            },
          },
        );
        const json = await response.json();
        console.log(json);

        setCabang(json.data.pasca);

        // console.log(json);

        // const results = json.map(pd => ({value: pd.code, text: pd.name}));
        // console.log('RESULTS', results);

        // console.log('PDAM', pdam);
      } catch (error) {
        console.log('error', error);
      }
    };
    getData();
    getDataId();
    fetchData();
  }, [userId]);
  const onChange = e => {
    setIdPelanggan(e);
    setMissingId(false);
  };
  const changeModalVisibility = bool => {
    setIsModalVisible(bool);
  };

  const setData = option => {
    setChooseData(option);
  };
  const handleSubmit = () => {
    const postData = async () => {
      try {
        const response = await fetch(
          'https://estate.sonajaya.com/api/inquiry-pdam',
          {
            method: 'POST',
            headers: {
              Authorization: `Bearer ${bearer}`,
              'Content-Type': 'application/json',
            },
            body: JSON.stringify({
              customer_id: idPelanggan,
              code: chooseData,
            }),
          },
        );
        const json = await response.json();
        console.log('Response POST air', json);
        const refIdSet = await setRefId(json.ref_id);
        if (json.message === 'INQUIRY SUCCESS') {
          if (refIdSet !== '') {
            navigation.navigate('PaymentAir', {
              name: json.tr_name,
              pdam: json.desc.pdam_name,
              refId: json.ref_id,
              price: json.price,
            });
            console.log('Navigate');
          }
        }
        // const results = json.map(pd => ({value: pd.code, text: pd.name}));
        // console.log('RESULTS', results);

        // console.log('PDAM', pdam);
      } catch (error) {
        console.log('error POST AIR', error);
      }
    };
    postData();
  };
  // console.log(idPelanggan);
  return (
    <View style={styles.container}>
      <SafeAreaView />
      <View style={styles.header}>
        <View>
          <Text style={styles.greetingText}>Bayar Air</Text>
        </View>
        <Image source={ImgBayar} />
      </View>
      <View style={styles.content}>
        <Text style={styles.title}>Masukkan ID Pelanggan</Text>
        <TextInput
          style={styles.inputView}
          value={idPelanggan}
          onChangeText={onChange}
        />
        <Text style={styles.title}>Pilih Cabang</Text>
        {/* <TouchableOpacity
          style={styles.touchableOpacity}
          onPress={() => changeModalVisibility(true)}>
          <Text style={styles.text}>{chooseData}</Text>
        </TouchableOpacity>
        <Modal
          transparent={true}
          animationType="fade"
          visible={isModalVisible}
          nRequestClose={() => changeModalVisibility(false)}>
          <ModalPickerPdam
            changeModalVisibility={changeModalVisibility}
            setData={setData}
            option={pdam}
          />
        </Modal> */}
        <View style={styles.pickerView}>
          <Picker
            selectedValue={selectedCabang}
            onValueChange={(itemValue, itemIndex) =>
              setSelectedCabang(itemValue)
            }
            mode="dropdown"
            style={styles.picker}>
            {cabang &&
              cabang.length > 0 &&
              cabang.map((jenis, idx) => {
                return (
                  <Picker.Item
                    label={jenis.name}
                    value={jenis.code}
                    key={idx}
                  />
                );
              })}
          </Picker>
        </View>
        <TouchableOpacity style={styles.reqBtn} onPress={handleSubmit}>
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

export default BayarCicilan;

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
    color: 'black',
    fontSize: 20,
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
    width: '100%',
    padding: 10,
    borderRadius: 10,
    marginTop: 20,
    marginBottom: 20,
    color: 'black',
  },
  touchableOpacity: {
    padding: 15,
    borderWidth: 1,
    borderColor: 'grey',
    width: '80%',
    borderRadius: 10,
    marginTop: 20,
  },
  text: {
    color: 'black',
  },
  picker: {
    marginVertical: 10,
    width: 300,
    padding: 10,
    borderWidth: 1,
    borderRadius: 10,
    borderColor: '#666',
    backgroundColor: 'white',
    color: 'black',
  },
  pickerItem: {
    color: 'black',
  },
  // pickerView: {
  //   borderWidth: 1,
  //   borderRadius: 10,
  //   borderColor: '#666',
  // },
});
