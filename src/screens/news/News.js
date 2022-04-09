import React, {useEffect, useState} from 'react';
import {View, Text, SafeAreaView, StyleSheet, ScrollView} from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import HTMLView from 'react-native-htmlview';

const News = () => {
  const [news, setNews] = useState([]);
  const [bearer, setBearer] = useState('');
  const [detail, setDetail] = useState([]);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    setIsLoading(true);
    const getNews = async () => {
      try {
        const value = await AsyncStorage.getItem('@storage_bearer');
        const response = await fetch(
          'https://estate.royalsaranateknologi.com/api/berita',
          {
            method: 'GET',
            headers: {
              Authorization: `Bearer ${value}`,
              'Content-Type': 'application/json',
            },
          },
        );
        const responseJson = await response.json();
        setNews(responseJson);
        setDetail(responseJson.data);
        if (responseJson.status === 'success') {
          setIsLoading(false);
        }
      } catch (e) {
        console.log(e);
      }
    };
    // const getToken = async () => {
    //   try {

    //     if (value !== null) {
    //       // value previously stored
    //       // console.log('sync storage news', value);
    //       setBearer(value);
    //       console.log('bearer News', bearer);
    //     }
    //   } catch (e) {
    //     console.log(e);
    //   }
    // };
    // getToken();
    getNews();
  }, [bearer]);
  console.log(news);

  if (!news && isLoading) {
    return (
      <View>
        <Text>Belum Ada Berita Terbaru Hari Ini</Text>
      </View>
    );
  }
  return (
    <ScrollView>
      <View style={styles.container}>
        <SafeAreaView />
        {detail.length === 0 ? (
          <Text style={styles.title}>Belum Ada Berita Terbaru Hari Ini</Text>
        ) : (
          news.data?.map((n, idx) => {
            return (
              <View key={idx}>
                <Text style={styles.newsTitle} key={n.id}>
                  {n.judul_berita}
                </Text>
                {/* <HTMLView value={n.konten_berita} stylesheet={styles} /> */}
                <Text style={styles.detail}>{n.konten_berita}</Text>
                <View
                  style={{
                    marginVertical: 10,
                    borderBottomColor: 'black',
                    borderBottomWidth: 1,
                  }}
                />
              </View>
            );
          })
        )}
      </View>
    </ScrollView>
  );
};

export default News;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 10,
  },
  title: {
    fontWeight: 'bold',
    color: 'black',
    fontSize: 18,
  },
  newsTitle: {
    fontWeight: 'bold',
    color: 'black',
    fontSize: 20,
    marginBottom: 10,
  },
  detail: {
    color: '#000',
  },
  hr: {
    color: '#000',
  },
});
