import React from 'react';
import {Text, View, StyleSheet, SafeAreaView, Image} from 'react-native';
import ImgBayar from '../../../../assets/img/bayar.png';
const InvoiceListrik = ({route, navigation}) => {
  const {numberVa, price} = route.params;

  return (
    <View style={styles.container}>
      <SafeAreaView />
      <View style={styles.header}>
        <View>
          <Text style={styles.greetingText}>Bayar Listrik</Text>
        </View>
        <Image source={ImgBayar} />
      </View>
      <View style={styles.content}>
        <Text style={styles.title}>Detail Pembayaran Anda</Text>
        <Text style={(styles.title, styles.subTitle)}>
          Nomor Virtual Account
        </Text>
        <Text style={styles.detail}>{numberVa}</Text>
        <Text style={(styles.title, styles.subTitle)}>Total Biaya</Text>
        <Text style={styles.detail}>Rp {price}</Text>
      </View>
    </View>
  );
};

export default InvoiceListrik;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#11998E',
    paddingTop: 20,
  },
  header: {
    // flex: 1,
    flexDirection: 'row',
    justifyContent: 'space-around',
    alignItems: 'center',
  },
  content: {
    backgroundColor: 'white',
    flex: 1,
    marginTop: 30,
    width: '85%',
    borderTopRightRadius: 30,
    padding: 30,
    alignItems: 'center',
  },
  greetingText: {
    color: 'white',
    fontSize: 22,
    fontWeight: 'bold',
  },
  warningText: {
    color: 'red',
  },
  title: {
    color: 'black',
    fontSize: 20,
    marginBottom: 20,
  },
  subTitle: {
    fontSize: 18,
    color: 'black',
  },
  detail: {
    color: 'black',
    fontSize: 16,
    marginBottom: 10,
  },
  priceContainer: {
    paddingTop: 20,
    paddingBottom: 20,
    width: '70%',
    alignItems: 'center',
    borderColor: 'black',
    borderWidth: 1,
    borderRadius: 10,
    marginBottom: 30,
  },
  priceText: {
    fontSize: 20,
  },
  dropDown: {
    marginBottom: 15,
  },
  reqBtn: {
    width: '80%',
    borderRadius: 25,
    height: 50,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#11998E',
    marginTop: 20,
    fontWeight: '700',
    marginBottom: 10,
  },
  inputView: {
    backgroundColor: 'white',
    borderWidth: 1,
    borderColor: 'grey',
    width: '80%',
    padding: 10,
    borderRadius: 10,
    marginTop: 20,
  },
});
