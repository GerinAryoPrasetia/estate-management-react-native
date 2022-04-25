import AsyncStorage from '@react-native-async-storage/async-storage';
import React, {useEffect, useState} from 'react';
import {
  View,
  StyleSheet,
  Text,
  Pressable,
  TextInput,
  TouchableOpacity,
  ActivityIndicator,
  SafeAreaView,
} from 'react-native';
const EditProfile = ({navigation}) => {
  const [alamat, setAlamat] = useState('');
  const [phone, setPhone] = useState('');
  const [bearer, setBearer] = useState('');

  useEffect(() => {
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
    getToken();
  }, [bearer]);

  const handleSubmit = async () => {
    // const token = await AsyncStorage.getItem('@storage_bearer');
    try {
      await fetch('https://estate.royalsaranateknologi.com/api/user', {
        method: 'POST',
        headers: {
          Authorization: `Bearer ${bearer}`,
          'Content-Type': 'application/json',
          //   Accept: 'application/json',
        },
        body: JSON.stringify({
          no_hp: phone,
          alamat: alamat,
        }),
      })
        .then(response => response.json())
        .then(data => {
          console.log(data);
          if (data.status === 'sukses') {
            alert('Profile Berhasil Diubah');
          }
        });
    } catch (error) {
      console.log(error);
    }
  };

  const handleBack = () => {
    navigation.navigate('HomePage');
  };

  const onChangeAlamat = e => {
    setAlamat(e);
    console.log(alamat);
  };
  const onChangePhone = e => {
    setPhone(e);
    console.log(phone);
  };
  return (
    <View style={styles.container}>
      <SafeAreaView />
      {/* modal name*/}
      <Text style={styles.title}>Edit Profil Anda</Text>
      <View style={styles.content}>
        <View style={styles.containerContent}>
          <Text style={styles.text}>Alamat</Text>
          <TextInput
            style={styles.inputView}
            value={alamat}
            onChangeText={onChangeAlamat}
          />
          <Text style={styles.text}>Nomor Handphone</Text>
          <TextInput
            style={styles.inputView}
            value={phone}
            onChangeText={onChangePhone}
          />
          <TouchableOpacity
            style={styles.registerBtn}
            activeOpacity={0.5}
            onPress={handleSubmit}>
            <Text style={styles.buttonTextStyle}>Simpan</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={styles.registerBtn}
            activeOpacity={0.5}
            onPress={handleBack}>
            <Text style={styles.buttonTextStyle}>Kembali ke Home</Text>
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );
};

export default EditProfile;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    padding: 10,
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
    marginBottom: 20,
  },
  pickerItem: {
    color: 'black',
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
  recordBtn: {
    alignItems: 'center',
    backgroundColor: '#11998E',
    paddingVertical: 10,
    width: 80,
    borderRadius: 10,
  },
  stopBtn: {
    marginVertical: 10,
    alignItems: 'center',
    backgroundColor: 'white',
    paddingVertical: 10,
    width: 80,
    borderRadius: 10,
    borderWidth: 1,
    borderColor: 'red',
  },
  title: {
    fontSize: 20,
    fontWeight: 'bold',
    color: 'black',
    marginBottom: 16,
  },
  buttonStyle: {
    backgroundColor: '#307ecc',
    borderWidth: 0,
    color: '#FFFFFF',
    borderColor: '#307ecc',
    height: 40,
    alignItems: 'center',
    borderRadius: 30,
    marginLeft: 35,
    marginRight: 35,
    marginTop: 15,
  },
  buttonTextStyle: {
    color: '#FFFFFF',
    paddingVertical: 10,
    fontSize: 16,
  },
  textStyle: {
    color: 'black',
    fontSize: 15,
    marginTop: 16,
    marginLeft: 35,
    marginRight: 35,
    textAlign: 'center',
  },
  registerBtn: {
    width: '100%',
    borderRadius: 25,
    height: 50,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#11998E',
    marginBottom: 10,
  },
});
