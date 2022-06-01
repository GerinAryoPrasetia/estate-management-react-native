import React, {useEffect, useState} from 'react';
import {View, SafeAreaView, StyleSheet, ScrollView, Text} from 'react-native';

const NewsDetail = ({route, navigation}) => {
  const {data} = route.params;
  return (
    <View style={styles.container}>
      <SafeAreaView />
      <Text style={styles.newsTitle} key={data.id}>
        {data.judul_berita}
      </Text>
      {/* <HTMLView value={n.konten_berita} stylesheet={styles} /> */}
      <Text style={styles.detail}>{data.konten_berita}</Text>
    </View>
  );
};

export default NewsDetail;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 10,
  },

  newsTitle: {
    fontWeight: 'bold',
    color: 'black',
    fontSize: 16,
    textAlign: 'center',
    marginBottom: 10,
  },
  detail: {
    color: '#000',
  },
  hr: {
    color: '#000',
  },
});
