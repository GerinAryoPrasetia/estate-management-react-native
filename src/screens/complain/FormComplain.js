/* eslint-disable react-native/no-inline-styles */
import React, {useState, useEffect} from 'react';
import {
  View,
  Text,
  StyleSheet,
  TextInput,
  TouchableOpacity,
} from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {Picker} from '@react-native-picker/picker';

const FormComplain = () => {
  const [komplainText, setKomplainText] = useState('');
  const [bearer, setBearer] = useState('');
  const [userId, setUserId] = useState('');
  const [jenisKeluhan, setJenisKeluhan] = useState([]);
  const [selectedJenis, setSelectedJenis] = useState({});

  useEffect(() => {
    const getJenisKeluhan = async () => {
      const response = await fetch(
        'https://estate.sonajaya.com/api/jenis-keluhan',
      );
      const responseJson = await response.json();
      console.log(responseJson);
      if (responseJson !== null) {
        setJenisKeluhan(responseJson);
      }
    };
    const getData = async () => {
      try {
        const value = await AsyncStorage.getItem('@storage_Key');
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
    getData();
    getDataId();
    getJenisKeluhan();
  }, [userId]);

  const onChangeKomplain = e => {
    setKomplainText(e);
  };

  const handleSubmit = () => {
    const requestOption = {
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
    };
    const postData = async () => {
      const response = await fetch(
        'https://estate.sonajaya.com/api/keluhan',
        requestOption,
      );
      const responseJson = await response.json();
      console.log(responseJson);
      // console.log(bearer);
    };
    postData();
  };
  console.log('jenis keluhan', jenisKeluhan);
  console.log('Selected', selectedJenis);
  return (
    <View style={styles.container}>
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
      <Text style={styles.title}>Catatan</Text>
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
        <Text style={{color: 'white'}}>Submit</Text>
      </TouchableOpacity>
    </View>
  );
};

export default FormComplain;

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
});
