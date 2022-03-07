import React, {useState, useEffect} from 'react';
import {View, Text, FlatList, ScrollView, StyleSheet} from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';

const RiwayatComplain = () => {
  const [bearer, setBearer] = useState('');
  const [keluhan, setKeluhan] = useState([]);
  const [userId, setUserId] = useState('');

  useEffect(() => {
    const getJenisKeluhan = async () => {
      const response = await fetch('https://estate.sonajaya.com/api/keluhan', {
        headers: {
          Authorization: `Bearer ${bearer}`,
          'Content-type': 'aplication/json',
        },
      });
      const responseJson = await response.json();
      // console.log(responseJson);
      if (responseJson !== null) {
        setKeluhan(responseJson.data);
      }
    };
    const getData = async () => {
      try {
        const value = await AsyncStorage.getItem('@storage_Key');
        if (value !== null) {
          // value previously stored
          // console.log('sync storage komplain bearer', value);
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
          // console.log('sync storage komplain userid', id);
          setUserId(id);
        }
      } catch (e) {
        console.log(e);
      }
    };
    getData();
    getDataId();
    getJenisKeluhan();
  }, [keluhan]);
  // console.log('keluhan', keluhan);
  return (
    <View style={styles.container}>
      <ScrollView>
        {keluhan?.map((data, idx) => {
          return (
            <View style={styles.textView} key={idx}>
              <Text style={styles.text}>{data.laporan}</Text>
              <Text>Status : {data.status}</Text>
            </View>
          );
        })}
      </ScrollView>
    </View>
  );
};
export default RiwayatComplain;

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
