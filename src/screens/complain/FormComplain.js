/* eslint-disable react-native/no-inline-styles */
import React, {useState, useEffect} from 'react';
import {
  View,
  Text,
  StyleSheet,
  TextInput,
  TouchableOpacity,
  Modal,
  Pressable,
  Alert,
  ActivityIndicator,
} from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {Picker} from '@react-native-picker/picker';
import Ionicons from 'react-native-vector-icons/Ionicons';

const FormComplain = () => {
  const [komplainText, setKomplainText] = useState('');
  const [bearer, setBearer] = useState('');
  const [userId, setUserId] = useState('');
  const [jenisKeluhan, setJenisKeluhan] = useState([]);
  const [selectedJenis, setSelectedJenis] = useState({});
  const [modalVisible, setModalVisible] = useState(false);
  const [change, setChange] = useState(true);
  const [isLoading, setIsLoading] = useState(false);

  const getJenisKeluhan = async () => {
    const response = await fetch(
      'https://estate.royalsaranateknologi.com/api/jenis-keluhan',
    );
    const responseJson = await response.json();
    console.log(responseJson);
    if (responseJson !== null) {
      setJenisKeluhan(responseJson);
    }
  };
  useEffect(() => {
    getJenisKeluhan();
  }, []);
  const getData = async () => {
    try {
      const value = await AsyncStorage.getItem('@storage_bearer');
      if (value !== null) {
        // value previously stored
        console.log('sync storage komplain bearer', value);
        setBearer(value);
      }
    } catch (e) {
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
  useEffect(() => {
    getData();
    getDataId();
    // getJenisKeluhan();
  }, [userId, bearer]);

  const onChangeKomplain = e => {
    setKomplainText(e);
  };

  const handleSubmit = () => {
    // const requestOption = ;
    setIsLoading(true);
    const postData = async () => {
      const response = await fetch(
        'https://estate.royalsaranateknologi.com/api/keluhan',
        {
          method: 'POST',
          headers: {
            Authorization: `Bearer ${bearer}`,
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            user_id: userId,
            unit_id: 1,
            jenis_keluhan_id: selectedJenis,
            laporan: komplainText,
          }),
        },
      );
      const responseJson = await response.json();
      console.log(responseJson);
      // console.log(bearer);
      if (responseJson.status === 'success') {
        setModalVisible(true);
        setIsLoading(false);
      }
    };
    postData();
  };
  // console.log('jenis keluhan', jenisKeluhan);
  console.log('Selected', selectedJenis);
  return (
    <View style={styles.container}>
      <Modal
        animationType="slide"
        transparent={true}
        visible={modalVisible}
        onRequestClose={() => {
          Alert.alert('Modal has been closed.');
          setModalVisible(!modalVisible);
        }}>
        <View style={styles.centeredView}>
          <View style={styles.modalView}>
            <Text style={styles.modalText}>Keluhan Berhasil Dikirim</Text>
            {/* <Ionicons name="check" /> */}
            <Pressable
              style={[styles.button, styles.buttonClose]}
              onPress={() => setModalVisible(!modalVisible)}>
              <Text style={styles.textStyle}>Tutup</Text>
            </Pressable>
          </View>
        </View>
      </Modal>
      <Text style={styles.title}>Jenis Complain</Text>
      <Picker
        selectedValue={selectedJenis}
        onValueChange={(itemValue, itemIndex) => setSelectedJenis(itemValue)}
        mode="dropdown"
        style={styles.picker}>
        {jenisKeluhan.map((jenis, idx) => {
          return <Picker.Item label={jenis.name} value={jenis.id} key={idx} />;
        })}
      </Picker>
      <Text style={styles.title}>Keluhan</Text>
      <View style={styles.inputView}>
        <TextInput
          multiline={true}
          numberOfLines={10}
          style={{
            height: 200,
            textAlignVertical: 'top',
            backgroundColor: '#fff',
            color: 'black',
          }}
          onChangeText={onChangeKomplain}
        />
      </View>
      <TouchableOpacity style={styles.reqBtn} onPress={handleSubmit}>
        {isLoading ? (
          <ActivityIndicator color={'#fff'} />
        ) : (
          <Text style={{color: 'white'}}>Submit</Text>
        )}
        <Text style={{color: 'white'}}>Submit</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    padding: 20,
  },
  inputView: {
    backgroundColor: 'white',
    borderRadius: 10,
    width: '80%',
    marginBottom: 20,
    paddingLeft: 10,
  },
  textInput: {
    height: 50,
    backgroundColor: '#fff',
    color: 'black',
  },
  title: {
    marginBottom: 10,
    color: 'black',
  },
  reqBtn: {
    width: '80%',
    borderRadius: 25,
    height: 50,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#11998E',
    marginTop: 20,
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
  button: {
    borderRadius: 20,
    padding: 10,
    elevation: 2,
    width: 150,
    marginTop: 10,
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
    color: 'black',
    fontSize: 20,
  },
});

export default FormComplain;
