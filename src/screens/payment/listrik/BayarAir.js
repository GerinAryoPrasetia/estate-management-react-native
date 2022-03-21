import React, {useState, useEffect} from 'react';
import {
  View,
  Text,
  SafeAreaView,
  Image,
  StyleSheet,
  TouchableOpacity,
  TextInput,
  Modal,
} from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import ImgBayar from '../../../../assets/img/bayar.png';
// import DropDownPicker from 'react-native-dropdown-picker';
// import SelectDropdown from 'react-native-select-dropdown';
import ModalPickerPdam from '../../../components/ModalPickerPdam';
import {Picker} from '@react-native-picker/picker';

const BayarAir = ({navigation}) => {
  const [idPelanggan, setIdPelanggan] = useState('');
  const [missingId, setMissingId] = useState(false);
  const [pdam, setPdam] = useState([]);
  const [bearer, setBearer] = useState('');
  const [selectedPdam, setSelectedPdam] = useState('');
  const [chooseData, setChooseData] = useState('Select...');
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [refId, setRefId] = useState('');
  const [userId, setUserId] = useState('');

  const fetchData = async () => {
    try {
      const response = await fetch(
        'https://estate.royalsaranateknologi.com/api/pdam-list',
        {
          method: 'GET',
          headers: {
            Authorization: `Bearer ${bearer}`,
            Accept: 'application/json',
            'Content-Type': 'application/json',
          },
        },
      );
      const json = await response.json();
      console.log(json);

      setPdam(json);

      // console.log(json);

      // const results = json.map(pd => ({value: pd.code, text: pd.name}));
      // console.log('RESULTS', results);

      // console.log('PDAM', pdam);
    } catch (error) {
      console.log('error', error);
    }
  };

  useEffect(() => {
    const getData = async () => {
      try {
        const value = await AsyncStorage.getItem('@storage_bearer');
        // console.log('masuk getData');
        if (value !== null || value !== undefined) {
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

    getData();
    getDataId();
    fetchData();
  }, [userId, bearer]);
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
          'https://estate.royalsaranateknologi.com/api/inquiry-pdam',
          {
            method: 'POST',
            headers: {
              Authorization: `Bearer ${bearer}`,
              'Content-Type': 'application/json',
            },
            body: JSON.stringify({
              customer_id: idPelanggan,
              code: selectedPdam,
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
  console.log('pdam', pdam);
  console.log(selectedPdam);
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
        </TouchableOpacity> */}
        {/* <Modal
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
        <Picker
          selectedValue={selectedPdam}
          onValueChange={(itemValue, itemIndex) => setSelectedPdam(itemValue)}
          mode="dropdown"
          style={styles.picker}>
          {pdam &&
            pdam.length > 0 &&
            pdam.map((jenis, idx) => {
              return (
                <Picker.Item label={jenis.name} value={jenis.code} key={idx} />
              );
            })}
        </Picker>
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

export default BayarAir;

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
    width: '80%',
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
    borderColor: '#666',
    backgroundColor: '#fff',
    color: 'black',
  },
  pickerItem: {
    color: 'black',
  },
});
