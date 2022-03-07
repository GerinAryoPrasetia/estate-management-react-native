import React, {useEffect, useState} from 'react';
import {View, Text, SafeAreaView, StyleSheet} from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';

const News = () => {
  const [news, setNews] = useState([]);
  const [bearer, setBearer] = useState('');

  const getNews = async () => {
    try {
      const response = await fetch('https://estate.sonajaya.com/api/berita', {
        method: 'GET',
        headers: {
          Authorization: `Bearer ${bearer}`,
          'Content-Type': 'application/json',
        },
      });
      const responseJson = await response.json();
      setNews(responseJson);
    } catch (e) {
      console.log(e);
    }
  };
  useEffect(() => {
    const getToken = async () => {
      try {
        const value = await AsyncStorage.getItem('@storage_Key');
        if (value !== null) {
          // value previously stored
          // console.log('sync storage news', value);
          setBearer(value);
          console.log('bearer News', bearer);
        }
      } catch (e) {
        console.log(e);
      }
    };
    const getNews = async () => {
      try {
        const response = await fetch('https://estate.sonajaya.com/api/berita', {
          method: 'GET',
          headers: {
            Authorization: `Bearer ${bearer}`,
            'Content-Type': 'application/json',
          },
        });
        const responseJson = await response.json();
        setNews(responseJson);
      } catch (e) {
        console.log(e);
      }
    };
    getToken();
    getNews();
  }, [bearer]);
  console.log(news);
  return (
    <View style={styles.container}>
      <SafeAreaView />
      <Text>{news.status}</Text>
      {news.data?.map(n => {
        return (
          <Text style={{color: 'black'}} key={n.id}>
            {n.judul_berita}
          </Text>
        );
      })}
    </View>
  );
};

export default News;

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
  },
  title: {
    fontWeight: 'bold',
    fontSize: 18,
  },
});
