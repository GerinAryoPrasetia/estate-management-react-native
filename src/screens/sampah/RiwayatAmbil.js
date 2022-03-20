import React, {useEffect, useState} from 'react';
import {View, Text, StyleSheet} from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';

const RiwayatAmbil = () => {
  const [bearer, setBearer] = useState('');
  const [listSampah, setListSampah] = useState('');

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
          setListSampah(responseJson);
        }
        console.log(responseJson);
        console.log('List', listSampah);
      } catch (e) {
        console.log(e);
      }
    };
    getToken();
    getList();
  }, [bearer, listSampah]);
  return (
    <View style={styles.container}>
      {/* {listSampah &&
        listSampah.date.length > 0 &&
        listSampah.date.map(sampah => {
          return (
            <View>
              <Text>{sampah.status}</Text>
            </View>
          );
        })} */}
    </View>
  );
};

export default RiwayatAmbil;

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});
