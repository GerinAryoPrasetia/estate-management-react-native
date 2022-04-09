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
  ActivityIndicator,
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
  const [isLoading, setIsLoading] = useState(false);
  const [isInvalid, setIsInvalid] = useState(false);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const token = await AsyncStorage.getItem('@storage_bearer');
        const response = await fetch(
          'https://estate.royalsaranateknologi.com/api/pdam-list',
          {
            method: 'GET',
            headers: {
              Authorization: `Bearer ${token}`,
              Accept: 'application/json',
              'Content-Type': 'application/json',
            },
          },
        );
        const json = await response.json();
        setPdam(json);
      } catch (error) {
        console.log('error', error);
      }
    };
    fetchData();
  }, []);

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
  const handleSubmit = async () => {
    setIsLoading(true);
    const token = await AsyncStorage.getItem('@storage_bearer');
    const postData = async () => {
      if (idPelanggan == '') {
        setMissingId(true);
        setIsLoading(false);
      }
      try {
        const response = await fetch(
          'https://estate.royalsaranateknologi.com/api/inquiry-pdam',
          {
            method: 'POST',
            headers: {
              Authorization: `Bearer ${token}`,
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

        if (json.message === 'INQUIRY SUCCESS') {
          navigation.navigate('PaymentAir', {
            name: json.tr_name,
            pdam: json.desc.pdam_name,
            refId: json.ref_id,
            price: json.price,
          });
          console.log('Navigate');
          setIsLoading(false);
        } else {
          setIsInvalid(true);
          setIsLoading(false);
        }
      } catch (error) {
        console.log('error POST AIR', error);
      }
    };
    postData();
  };
  // console.log(idPelanggan);
  // console.log('pdam', pdam);
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
        <View style={styles.pickerView}>
          <Picker
            selectedValue={selectedPdam}
            onValueChange={(itemValue, itemIndex) => setSelectedPdam(itemValue)}
            mode="dropdown"
            style={styles.picker}>
            {pdam &&
              pdam.length > 0 &&
              pdam.map((jenis, idx) => {
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
          {isLoading ? (
            <ActivityIndicator color={'white'} />
          ) : (
            <Text style={{color: 'white'}}>Bayar</Text>
          )}
        </TouchableOpacity>
        {missingId ? (
          <Text style={styles.warningText}>Masukkan ID Pelanggan Anda!</Text>
        ) : (
          <Text></Text>
        )}
        {isInvalid ? (
          <Text style={styles.warningText}>
            Nomor Pelanggan Tidak Ditemukan!
          </Text>
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
    borderColor: '#666',
    backgroundColor: '#fff',
    color: 'black',
  },
  pickerItem: {
    color: 'black',
  },
});
