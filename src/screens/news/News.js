import React, {useEffect, useState} from 'react';
import {
  View,
  Text,
  SafeAreaView,
  StyleSheet,
  ScrollView,
  Pressable,
} from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import HTMLView from 'react-native-htmlview';
import NewsDetail from './NewsDetail';

const News = ({route, navigation}) => {
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
          news.data?.map((data, idx) => {
            return (
              <View key={idx} style={styles.card}>
                <Pressable
                  onPress={() =>
                    navigation.navigate('NewsDetail', {data: data})
                  }>
                  <Text style={styles.newsTitle}>{data.judul_berita}</Text>
                </Pressable>
                {/* <Text style={styles.newsTitle} key={n.id}>
                  {n.judul_berita}
                </Text>

                <Text style={styles.detail}>{n.konten_berita}</Text>
                <View
                  style={{
                    marginVertical: 10,
                    borderBottomColor: 'black',
                    borderBottomWidth: 1,
                  }}
                /> */}
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
    fontSize: 16,
  },
  detail: {
    color: '#000',
  },
  hr: {
    color: '#000',
  },
});
