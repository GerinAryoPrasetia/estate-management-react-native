import AsyncStorage from '@react-native-async-storage/async-storage';
import React, {useEffect, useState} from 'react';
import {
  View,
  Text,
  StyleSheet,
  SafeAreaView,
  Image,
  TouchableOpacity,
  TextInput,
  Pressable,
  Alert,
  Modal,
  KeyboardAwareScrollView,
} from 'react-native';

const Account = ({navigation}) => {
  const [modalNameVisible, setModalNameVisible] = useState(false);
  const [modalUnitVisible, setModalUnitVisible] = useState(false);
  const [modalAddressVisible, setModalAddressVisible] = useState(false);
  const [bearer, setBearer] = useState('');
  const [name, setName] = useState('');
  const [unit, setUnit] = useState('');
  const [address, setAddress] = useState('');
  const [email, setEmail] = useState('');
  const [data, setData] = useState({});
  const [isLoading, setIsLoading] = useState(false);
  const [phone, setPhone] = useState('');
  // const [bearer, setBearer] = useState('');

  useEffect(() => {
    const interval = setInterval(() => {
      const getToken = async () => {
        try {
          const value = await AsyncStorage.getItem('@storage_bearer');
          if (value !== null) {
            // value previously stored
            console.log('sync storage HOMEPAGE', value);
            setBearer(value);
          }
        } catch (e) {
          console.log(e);
        }
      };
      const getUserData = async () => {
        try {
          const response = await fetch(
            'https://estate.royalsaranateknologi.com/api/user',
            {
              headers: {
                Authorization: `Bearer ${bearer}`,
                'Content-Type': 'application/json',
              },
            },
          );
          const responseJson = await response.json();
          if (responseJson.status === 'success') {
            setName(responseJson.data.name);
            setUnit(responseJson.data.alamat);
            setPhone(responseJson.data.no_hp);
          }
        } catch (e) {
          console.log('error home', e);
        }
      };
      getToken();
      getUserData();
    }, 3000);
    return () => clearInterval(interval);
  }, [bearer, data]);
  // console.log(data, 'data outside');
  // console.log(name);
  const removeToken = async () => {
    try {
      await AsyncStorage.removeItem('@storage_bearer');
      navigation.navigate('Welcome');
    } catch (e) {
      console.log(e);
    }
  };
  const handleSubmit = () => {
    navigation.navigate('EditProfile');
  };
  const handleChangeUnit = e => {
    setUnit(e);
  };
  const handleUpdateUnit = () => {
    setModalUnitVisible(!modalUnitVisible);
    setUnit(unit);
    console.log('unit');
  };
  return (
    <View style={styles.container}>
      <SafeAreaView />
      {/* modal name*/}
      <Modal
        animationType="slide"
        transparent={true}
        visible={modalNameVisible}
        onRequestClose={() => {
          Alert.alert('Modal has been closed.');
          setModalNameVisible(!modalNameVisible);
        }}>
        <View style={styles.centeredView}>
          <View style={styles.modalView}>
            <Text style={styles.modalText}>Edit Data</Text>
            <Text>Masukkan Data Nama Baru Dibawah Ini</Text>
            <TextInput
              style={styles.inputView}
              onChangeText={handleChangeUnit}
            />
            <Pressable
              style={[styles.button, styles.buttonClose]}
              onPress={handleUpdateUnit}>
              <Text style={styles.textStyle}>Simpan</Text>
            </Pressable>
          </View>
        </View>
      </Modal>
      {/* modal unit*/}
      <Modal
        animationType="slide"
        transparent={true}
        visible={modalUnitVisible}
        onRequestClose={() => {
          Alert.alert('Modal has been closed.');
          setModalUnitVisible(!modalUnitVisible);
        }}>
        <View style={styles.centeredView}>
          <View style={styles.modalView}>
            <Text style={styles.modalText}>Edit Data</Text>
            <Text>Masukkan Data Unit Dibawah Ini</Text>
            <TextInput style={styles.inputView} />
            <Pressable
              style={[styles.button, styles.buttonClose]}
              onPress={() => {
                setModalUnitVisible(!modalUnitVisible);
                handleChangeUnit();
              }}>
              <Text style={styles.textStyle}>Simpan</Text>
            </Pressable>
            <Pressable
              style={[styles.button, styles.buttonClose]}
              onPress={() => {
                setModalUnitVisible(!modalUnitVisible);
                handleUpdateUnit();
              }}>
              <Text style={styles.textStyle}>Batal</Text>
            </Pressable>
          </View>
        </View>
      </Modal>
      {/* modal address*/}
      <Modal
        animationType="slide"
        transparent={true}
        visible={modalNameVisible}
        onRequestClose={() => {
          Alert.alert('Modal has been closed.');
          setModalAddressVisible(!modalAddressVisible);
        }}>
        <View style={styles.centeredView}>
          <View style={styles.modalView}>
            <Text style={styles.modalText}>Edit Data</Text>
            <Text>Masukkan Data Alamat Baru DIbawah Ini</Text>
            <TextInput style={styles.inputView} />
            <Pressable
              style={[styles.button, styles.buttonClose]}
              onPress={() => setModalAddressVisible(!modalAddressVisible)}>
              <Text style={styles.textStyle}>Simpan</Text>
            </Pressable>
          </View>
        </View>
      </Modal>
      <View style={styles.header}>
        <View>
          <Text style={styles.greetingText}>Profil Anda</Text>
        </View>
      </View>
      <View style={styles.content}>
        <Text>Nama Lengkap</Text>
        <View style={styles.data}>
          <View style={styles.dataView}>
            <Text style={styles.text}>{name}</Text>
          </View>
        </View>
        <Text style={styles.dataTitle}>Alamat</Text>
        <View style={styles.data}>
          <View style={styles.dataView}>
            <Text style={styles.text}>{unit}</Text>
          </View>
        </View>
        <Text style={styles.dataTitle}>Nomor Handphone</Text>
        <View style={styles.data}>
          <View style={styles.dataView}>
            <Text style={styles.text}>{phone}</Text>
          </View>
        </View>
        <View style={{alignItems: 'center'}}>
          <Pressable style={styles.button} onPress={handleSubmit}>
            <Text style={{color: 'white'}}>Edit Profile</Text>
          </Pressable>
          <Pressable style={styles.buttonLogut} onPress={removeToken}>
            <Text style={{color: 'black'}}>Logout</Text>
          </Pressable>
        </View>
      </View>
    </View>
  );
};

export default Account;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#11998E',
  },
  header: {
    // flex: 1,
    flexDirection: 'row',
    justifyContent: 'space-around',
    alignItems: 'center',
    padding: 30,
  },
  content: {
    backgroundColor: 'white',
    flex: 1,
    marginTop: 30,
    width: '85%',
    borderTopRightRadius: 30,
    padding: 30,
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
  data: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  dataView: {
    backgroundColor: 'white',
    borderColor: 'black',
    borderWidth: 1,
    padding: 10,
    borderRadius: 10,
    marginTop: 10,
    flex: 1,
  },
  dataTitle: {
    marginTop: 10,
  },
  button: {
    borderWidth: 1,
    padding: 10,
    width: '70%',
    alignItems: 'center',
    marginTop: 20,
    borderRadius: 10,
    backgroundColor: '#11998E',
    borderColor: '#11998E',
  },
  centeredView: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 22,
  },
  modalView: {
    margin: 20,
    backgroundColor: 'white',
    borderRadius: 20,
    padding: 35,
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5,
  },

  buttonOpen: {
    backgroundColor: '#F194FF',
  },
  buttonClose: {
    backgroundColor: 'white',
    borderWidth: 1,
    borderColor: 'red',
  },
  textStyle: {
    color: 'black',
    fontWeight: 'bold',
    textAlign: 'center',
  },
  modalText: {
    marginBottom: 15,
    textAlign: 'center',
    fontWeight: '700',
    color: 'red',
    fontSize: 42,
  },
  buttonSos: {
    backgroundColor: 'red',
  },
  inputView: {
    backgroundColor: 'white',
    borderColor: 'black',
    borderWidth: 1,
    borderRadius: 10,
    width: 150,
    marginTop: 10,
    padding: 10,
  },
  text: {
    color: 'black',
  },
  buttonLogut: {
    borderWidth: 1,
    padding: 10,
    width: '70%',
    alignItems: 'center',
    marginTop: 20,
    borderRadius: 10,
    backgroundColor: 'white',
    borderColor: 'red',
  },
});
