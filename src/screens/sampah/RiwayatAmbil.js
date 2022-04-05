import React, {useEffect, useState} from 'react';
import {View, Text, StyleSheet, ScrollView} from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';

const RiwayatAmbil = ({route}) => {
  const success = route.params;
  const [bearer, setBearer] = useState('');
  const [listSampah, setListSampah] = useState([]);
  const [isSuccess, setIsSuccess] = useState(false);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    setLoading(true);
    const interval = setInterval(() => {
      const getList = async () => {
        setIsSuccess(success);
        try {
          const token = await AsyncStorage.getItem('@storage_bearer');
          const response = await fetch(
            'https://estate.royalsaranateknologi.com/api/sampah',
            {
              method: 'GET',
              headers: {
                Authorization: `Bearer ${token}`,
                'Content-type': 'application/json',
              },
            },
          );
          const responseJson = await response.json();
          if (responseJson.status === 'sukses') {
            setListSampah(responseJson.date);
            setIsSuccess(false);
            setLoading(false);
          }
          // console.log(responseJson);
        } catch (e) {
          console.log(e);
        }
      };
      // getToken();
      getList();
    }, 3000);
    return () => clearInterval(interval);
  }, [success]);

  if (loading) {
    return (
      <View style={styles.containerLoading}>
        <Text style={styles.loadingText}>Loading</Text>
      </View>
    );
  }
  return (
    <View style={styles.container}>
      <ScrollView>
        {listSampah &&
          listSampah.map((sampah, idx) => {
            return (
              <View key={idx} style={styles.textView}>
                <Text style={styles.text}>{sampah.status}</Text>
                <Text style={styles.subText}>
                  Kode Tiket : {sampah.kode_tiket}
                </Text>
                <Text style={styles.subText}>Alamat Unit: {sampah.alamat}</Text>
              </View>
            );
          })}
      </ScrollView>
    </View>
  );
};

export default RiwayatAmbil;

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  containerLoading: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
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
  },
  subText: {
    color: 'grey',
    fontSize: 12,
  },
});
