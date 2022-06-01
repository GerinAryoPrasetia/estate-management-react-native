import React, {useEffect, useState} from 'react';
import {
  View,
  Text,
  StyleSheet,
  ActivityIndicator,
  ScrollView,
  Touchable,
  TouchableOpacity,
  SectionList,
} from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import Accordion from 'react-native-collapsible/Accordion';

const HistoryPembayaran = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [history, setHistory] = useState([]);
  const [empty, setEmpty] = useState(false);
  const [activeSections, setActiveSections] = useState([]);

  const getHistoryPembayaran = async () => {
    const token = await AsyncStorage.getItem('@storage_bearer');
    const res = await fetch(
      'https://estate.royalsaranateknologi.com/api/history-transaksi',
      {
        method: 'GET',
        headers: {
          Authorization: `Bearer ${token}`,
          'Content-type': 'aplication/json',
        },
      },
    );
    const resJson = await res.json();
    if (resJson.status === 'success') {
      setIsLoading(false);
      setHistory(resJson.data);
      if (history.length === 0) {
        setEmpty(true);
      } else {
        setEmpty(false);
      }
    }
  };
  useEffect(() => {
    setIsLoading(true);
    getHistoryPembayaran();
  }, []);

  const _renderSectionTitle = section => {
    return (
      <View style={[styles.card]}>
        <View style={styles.cardHeader}>
          <Text style={styles.text}>{section.code}</Text>
          <Text style={styles.textStatus}>{section.message}</Text>
        </View>
        <Text>{section.name}</Text>
      </View>
    );
  };
  const _renderHeader = section => {
    return (
      <View style={[styles.cardFooter]}>
        <Text style={styles.footerText}>Detail</Text>
      </View>
    );
  };
  const _renderContent = section => {
    const paymentUpper = section.payment_method.toUpperCase();
    return (
      <View style={styles.cardContent}>
        <Text style={styles.contentText}>Nama Pelanggan : {section.name}</Text>
        <Text style={styles.contentText}>
          Metode Pembayaran : {paymentUpper}
        </Text>
        <Text style={styles.contentText}>
          ID Pelanggan : {section.id_pelanggan}
        </Text>
        <Text style={styles.contentText}>Total Biaya : Rp {section.total}</Text>
        <Text style={styles.contentText}>
          Status Pembayaran : {section.message}
        </Text>
      </View>
    );
  };

  const _updateSections = activeSections => {
    setActiveSections(activeSections);
  };

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
        <TouchableOpacity
          onPress={() => getHistoryPembayaran()}
          style={styles.btn}>
          <Text style={{color: 'white'}}>Reload</Text>
        </TouchableOpacity>
      </View>
    );
  }
  return (
    <View style={styles.container}>
      <ScrollView>
        <View>
          <Accordion
            sections={history}
            activeSections={activeSections}
            renderSectionTitle={_renderSectionTitle}
            renderHeader={_renderHeader}
            renderContent={_renderContent}
            onChange={_updateSections}
          />
        </View>
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

export default HistoryPembayaran;
