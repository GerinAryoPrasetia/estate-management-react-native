import React, {useEffect, useState} from 'react';
import {View, Text, StyleSheet} from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';

const RiwayatAmbil = () => {
  const [bearer, setBearer] = useState('');
  const [listSampah, setListSampah] = useState([]);

  const getList = async () => {
    try {
      const response = await fetch(
        'https://estate.royalsaranateknologi.com/api/sampah',
        {
          method: 'GET',
          headers: {
            Authorization: `Bearer ${bearer}`,
            'Content-type': 'application/json',
          },
        },
      );
      const responseJson = await response.json();
      if (responseJson.status === 'sukses') {
        setListSampah(responseJson.date);
      }
      // console.log(responseJson);
      console.log('List', listSampah);
    } catch (e) {
      console.log(e);
    }
  };

  useEffect(() => {
    const getToken = async () => {
      try {
        const value = await AsyncStorage.getItem('@storage_bearer');
        if (value !== null) {
          // value previously stored
          // console.log('sync storage news', value);
          setBearer(value);
          console.log('bearer riwayat sampah', bearer);
        }
      } catch (e) {
        console.log(e);
      }
    };
    getToken();
    getList();
  }, [bearer]);
  return (
    <View style={styles.container}>
      {listSampah &&
        listSampah.map((sampah, idx) => {
          return (
            <View key={idx} style={styles.textView}>
              <Text style={styles.text}>{sampah.status}</Text>
              <Text>Kode Tiket : {sampah.kode_tiket}</Text>
              <Text>Alamat Unit: {sampah.alamat}</Text>
            </View>
          );
        })}
    </View>
  );
};

export default RiwayatAmbil;

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  textView: {
    padding: 10,
    borderWidth: 1,
    borderColor: 'black',
    marginVertical: 10,
  },
  text: {
    color: 'black',
    fontSize: 16,
  },
  subText: {
    color: 'grey',
    fontSize: 12,
  },
});
