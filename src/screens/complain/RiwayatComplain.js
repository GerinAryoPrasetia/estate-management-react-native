import React, {useState, useEffect} from 'react';
import {View, Text, FlatList, ScrollView, StyleSheet} from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';

const RiwayatComplain = ({route}) => {
  const success = route.params;
  const [bearer, setBearer] = useState('');
  const [keluhan, setKeluhan] = useState([]);
  const [userId, setUserId] = useState('');
  const [isSuccess, setIsSuccess] = useState(false);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    setIsSuccess(success);
    setLoading(true);
    const interval = setInterval(() => {
      const getKeluhan = async () => {
        const getToken = await AsyncStorage.getItem('@storage_bearer');
        const response = await fetch(
          'https://estate.royalsaranateknologi.com/api/keluhan',
          {
            method: 'GET',
            headers: {
              Authorization: `Bearer ${getToken}`,
              'Content-type': 'aplication/json',
            },
          },
        );
        const responseJson = await response.json();
        // console.log('response riwayat', responseJson);
        // console.log(await 'bearer', bearer);
        if (responseJson !== null) {
          setKeluhan(responseJson.data);
          setIsSuccess(false);
          setLoading(false);
        }
      };
      getKeluhan();
    }, 3000);
    return () => clearInterval(interval);
  }, [userId, success]);

  useEffect(() => {
    // const getData = async () => {
    //   try {
    //     const value = await AsyncStorage.getItem('@storage_bearer');
    //     if (value !== null) {
    //       // value previously stored
    //       console.log('sync storage komplain bearer', value);
    //       setBearer(value);
    //     }
    //   } catch (e) {
    //     console.log('riwayat komplain error', e);
    //   }
    // };
    const getDataId = async () => {
      try {
        const id = await AsyncStorage.getItem('@user_id');
        if (id !== null) {
          setUserId(id);
        }
      } catch (e) {
        console.log('error data id complain', e);
      }
    };
    // getData();
    getDataId();
    // console.log('bearer 2222', bearer);
  }, [userId]);

  if (loading) {
    return (
      <View style={styles.containerLoading}>
        <Text styles={styles.loadingText}>Loading</Text>
      </View>
    );
  }
  return (
    <View style={styles.container}>
      <ScrollView>
        {keluhan?.map((data, idx) => {
          return (
            <View style={styles.textView} key={idx}>
              <Text style={styles.text}>{data.laporan}</Text>
              <Text style={styles.subText}>Status : {data.status}</Text>
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
  containerLoading: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  loadingText: {
    color: 'black',
    fontSize: 28,
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
    fontWeight: 'bold',
  },
  subText: {
    color: 'grey',
    fontSize: 12,
  },
});
