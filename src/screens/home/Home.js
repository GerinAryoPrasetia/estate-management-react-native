import React, {useEffect, useState} from 'react';
import {
  Text,
  SafeAreaView,
  View,
  StyleSheet,
  Image,
  TouchableOpacity,
  Alert,
  Modal,
  Pressable,
} from 'react-native';
import {Col, Row, Grid} from 'react-native-easy-grid';
import HomeImage from '../../../assets/img/imgHome.png';
import Listrik from '../../../assets/img/icons8_electrical.png';
import Masjid from '../../../assets/img/icons8_mosque.png';
import Air from '../../../assets/img/icons8_water_2.png';
import Sampah from '../../../assets/img/icons8_trash.png';
import Cicilan from '../../../assets/img/icons8_money.png';
import Komplain from '../../../assets/img/icons8_complaint.png';
import {Button} from 'react-native-elements/dist/buttons/Button';
import AsyncStorage from '@react-native-async-storage/async-storage';

// import ModalSos from './ModalSos';

const Home = ({route, navigation}) => {
  // const {name} = route.params;
  const [modalVisible, setModalVisible] = useState(false);
  const [bearer, setBearer] = useState('');
  const [data, setData] = useState({});
  const [userId, setUserId] = useState('');
  const [name, setName] = useState('');

  useEffect(() => {
    // const getData = async () => {
    //   try {
    //     const value = await AsyncStorage.getItem('@storage_Key');
    //     console.log('masuk getData');
    //     if (value !== null) {
    //       // value previously stored
    //       console.log('sync storage home', value);
    //     }
    //   } catch (e) {
    //     // error reading value
    //     console.log(e);
    //   }
    // };
    const storeId = async user_id => {
      try {
        await AsyncStorage.setItem('@user_id', user_id);
        console.log('id store' + user_id);
      } catch (e) {
        console.log(e);
      }
    };
    const getToken = async () => {
      try {
        const value = await AsyncStorage.getItem('@storage_Key');
        if (value !== null) {
          // value previously stored
          console.log('sync storage HOMEPAGE', value);
          setBearer(value);
        }
      } catch (e) {
        console.log(e);
      }
    };
    getToken();
    const getUserData = async () => {
      try {
        const response = await fetch('https://estate.sonajaya.com/api/user', {
          headers: {
            Authorization: `Bearer ${bearer}`,
            'Content-Type': 'application/json',
          },
        });
        const responseJson = await response.json();
        console.log('Home', responseJson);
        if (responseJson.status === 'success') {
          setUserId(responseJson.data.id);
          storeId(responseJson.data.id);
          setName(responseJson.data.name);
        }
      } catch (e) {
        console.log('error home', e);
      }
    };
    getUserData();
    console.log(userId);
  }, [bearer, data]);

  return (
    <View style={styles.container}>
      <SafeAreaView />
      {/* Modal */}
      <Modal
        animationType="slide"
        transparent={true}
        visible={modalVisible}
        onRequestClose={() => {
          Alert.alert('Modal has been closed.');
          setModalVisible(!modalVisible);
        }}>
        <View style={styles.centeredView}>
          <View style={styles.modalView}>
            <Text style={styles.modalText}>SOS</Text>
            <Text style={styles.text}>Ingin Melakukan SOS Sekarang?</Text>
            <Pressable style={[styles.button, styles.buttonSos]}>
              <Text style={styles.textStyle}>SOS</Text>
            </Pressable>
            <Pressable
              style={[styles.button, styles.buttonClose]}
              onPress={() => setModalVisible(!modalVisible)}>
              <Text style={styles.textStyle}>Cancel SOS</Text>
            </Pressable>
          </View>
        </View>
      </Modal>
      <View style={styles.header}>
        <View>
          <Text style={styles.greetingText}>Welcome Back, </Text>
          <Text style={styles.greetingText}>{name}</Text>
        </View>
        <Image source={HomeImage} />
      </View>
      <View style={styles.content}>
        <Text style={styles.title}>Ada yang bisa dibantu?</Text>
        {/* <View> */}
        <Grid>
          <Col>
            <Row>
              <TouchableOpacity
                style={styles.card}
                onPress={() => navigation.navigate('BayarListrik')}>
                <Image
                  style={styles.image}
                  source={Listrik}
                  resizeMode={'center'}
                />
                <Text style={styles.cardTitle}>Bayar Listrik</Text>
              </TouchableOpacity>
            </Row>
            <Row>
              <TouchableOpacity
                style={styles.card}
                onPress={() => navigation.navigate('Hafalan')}>
                <Image source={Masjid} resizeMode={'center'} />
                <Text style={styles.cardTitle}>Setor Hafalan</Text>
              </TouchableOpacity>
            </Row>
            <Row>
              <TouchableOpacity
                style={styles.card}
                onPress={() => navigation.navigate('BayarAir')}>
                <Image source={Air} resizeMode={'center'} />
                <Text style={styles.cardTitle}>Bayar Air</Text>
              </TouchableOpacity>
            </Row>
          </Col>
          <Col>
            <Row>
              <TouchableOpacity
                style={styles.card}
                onPress={() => navigation.navigate('BayarCicilan')}>
                <Image source={Cicilan} resizeMode={'center'} />
                <Text style={styles.cardTitle}>Bayar Cicilan</Text>
              </TouchableOpacity>
            </Row>
            <Row>
              <TouchableOpacity
                style={styles.card}
                onPress={() => navigation.navigate('Complain')}>
                <Image source={Komplain} resizeMode={'center'} />
                <Text style={styles.cardTitle}>Form Komplain</Text>
              </TouchableOpacity>
            </Row>
            <Row>
              <TouchableOpacity
                style={styles.card}
                onPress={() => navigation.navigate('Sampah')}>
                <Image source={Sampah} resizeMode={'center'} />
                <Text style={styles.cardTitle}>Ambil Sampah</Text>
              </TouchableOpacity>
            </Row>
          </Col>
        </Grid>
        <TouchableOpacity
          style={styles.sosBtn}
          onPress={() => setModalVisible(true)}>
          <Text style={{color: 'white'}}>SOS</Text>
        </TouchableOpacity>
        {/* </View> */}
      </View>
    </View>
  );
};

export default Home;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#11998E',
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
  },
  greetingText: {
    color: 'white',
    fontSize: 22,
    fontWeight: 'bold',
  },
  title: {
    color: '#11998E',
    fontSize: 20,
    marginBottom: 20,
  },
  card: {
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: 1,
    borderRadius: 20,
    borderColor: '#11998E',
    margin: 20,
    padding: 0,
    flex: 1,
  },
  cardTitle: {
    textAlign: 'center',
    marginTop: 5,
    color: 'black',
  },
  sosBtn: {
    position: 'absolute',
    bottom: 60,
    right: -40,
    backgroundColor: 'red',
    width: 75,
    height: 75,
    borderRadius: 100,
    justifyContent: 'center',
    alignItems: 'center',
  },
  centeredView: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 22,
  },
  modalView: {
    margin: 20,
    backgroundColor: 'white',
    borderRadius: 20,
    padding: 35,
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5,
  },
  button: {
    borderRadius: 20,
    padding: 10,
    elevation: 2,
    width: 150,
    marginTop: 10,
  },
  buttonOpen: {
    backgroundColor: '#F194FF',
  },
  buttonClose: {
    backgroundColor: 'white',
    borderWidth: 1,
    borderColor: 'red',
  },
  textStyle: {
    color: 'black',
    fontWeight: 'bold',
    textAlign: 'center',
  },
  modalText: {
    marginBottom: 15,
    textAlign: 'center',
    fontWeight: '700',
    color: 'red',
    fontSize: 42,
  },
  buttonSos: {
    backgroundColor: 'red',
  },
  text: {
    color: 'black',
  },
  image: {width: '100%'},
});
