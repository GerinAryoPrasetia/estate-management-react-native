import React, {useState, useEffect} from 'react';
import {
  View,
  Text,
  StyleSheet,
  TextInput,
  TouchableOpacity,
} from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';

const AmbilSampah = () => {
  const [userId, setUserId] = useState('');
  const [bearer, setBearer] = useState('');
  const [alamat, setAlamat] = useState('');
  useEffect(() => {
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
  }, [userId]);

  const handleSubmit = async () => {
    try {
      const response = await fetch('https://estate.sonajaya.com/api/sampah', {
        method: 'POST',
        headers: {
          Authorization: `Bearer ${bearer}`,
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          user_id: userId,
          alamat: alamat,
        }),
      });
      const responseJson = await response.json();
      console.log(responseJson);
    } catch (e) {
      console.log(e);
    }
  };
  const onChangeAlamat = e => {
    setAlamat(e);
  };
  return (
    <View style={styles.container}>
      <Text style={styles.title}>Alamat Unit</Text>
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
          onChangeText={onChangeAlamat}
        />
      </View>
      <TouchableOpacity style={styles.reqBtn} onPress={handleSubmit}>
        <Text style={{color: 'white'}}>Submit</Text>
      </TouchableOpacity>
    </View>
  );
};

export default AmbilSampah;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    padding: 20,
  },
  textInput: {
    width: '80%',
    backgroundColor: 'white',
    padding: 10,
    marginTop: 10,
    borderRadius: 10,
    marginBottom: 10,
    color: 'black',
  },
  title: {
    marginBottom: 10,
    color: 'black',
    fontSize: 18,
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
  text: {
    color: 'black',
  },
  inputView: {
    backgroundColor: 'white',
    borderRadius: 10,
    width: '80%',
    marginBottom: 20,
    paddingLeft: 10,
  },
});
