import React, {useEffect, useState} from 'react';
import {
  View,
  Text,
  StyleSheet,
  ActivityIndicator,
  TouchableOpacity,
  ScrollView,
} from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import moment from 'moment';

const HistorySos = () => {
  moment.locale('id');
  const [date, setDate] = useState('');
  const [data, setData] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [empty, setEmpty] = useState(false);

  const getHistorySos = async () => {
    const token = await AsyncStorage.getItem('@storage_bearer');
    const res = await fetch(
      'https://estate.royalsaranateknologi.com/api/sos/history',
      {
        method: 'GET',
        headers: {
          Authorization: `Bearer ${token}`,
          'Content-type': 'aplication/json',
        },
      },
    );
    const resJson = await res.json();
    if (resJson.status === 'sukses') {
      setIsLoading(false);
      setData(resJson.data);
      if (data.length === 0) {
        setEmpty(true);
      } else {
        setEmpty(false);
      }
    }
  };
  useEffect(() => {
    setIsLoading(true);
    getHistorySos();
  }, []);
  console.log(data);

  if (isLoading) {
    return (
      <View style={(styles.container, styles.horizontal)}>
        <ActivityIndicator size="large" color="#00ff00" />
      </View>
    );
  }

  if (empty) {
    return (
      <View style={styles.containerLoading}>
        <Text style={styles.text}>Tidak Ada Riwayat Transaksi</Text>
        <TouchableOpacity onPress={() => getHistorySos()} style={styles.btn}>
          <Text style={{color: 'white'}}>Reload</Text>
        </TouchableOpacity>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <ScrollView>
        {data?.map((d, idx) => {
          return (
            <View style={styles.card}>
              <Text style={styles.text}>{d.keterangan}</Text>
              <Text style={styles.contentText}>
                {moment(d.created_at).format('LLL')}
              </Text>
            </View>
          );
        })}
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 10,
  },
  containerLoading: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  horizontal: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    padding: 10,
  },
  card: {
    backgroundColor: 'white',

    paddingVertical: 20,
    paddingHorizontal: 25,
    width: '100%',
    marginTop: 20,
  },
  cardHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 10,
  },
  cardFooter: {
    marginVertical: 0,
    backgroundColor: 'white',
    paddingVertical: 20,
    paddingHorizontal: 25,
    width: '100%',
  },
  cardContent: {
    backgroundColor: 'white',
    paddingVertical: 20,
    paddingHorizontal: 25,
  },
  shadowProp: {
    shadowColor: '#171717',
    shadowOffset: {width: -2, height: 4},
    shadowOpacity: 0.2,
    shadowRadius: 3,
  },
  text: {
    color: 'black',
    fontSize: 16,
    fontWeight: 'bold',
  },
  textBtn: {
    color: 'black',
    fontSize: 16,
    fontWeight: 'bold',
  },
  textStatus: {
    color: 'green',
    fontSize: 12,
  },
  textStatusFailed: {
    color: 'red',
    fontSize: 12,
  },
  footerText: {
    textAlign: 'center',
    color: 'blue',
    textDecorationLine: 'underline',
  },
  contentText: {
    color: 'black',
    fontSize: 14,
  },
  btn: {
    width: '80%',
    borderRadius: 25,
    height: 50,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: 'green',
    marginBottom: 10,
  },
});
export default HistorySos;
