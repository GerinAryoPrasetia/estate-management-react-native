import React, {useState, useEffect} from 'react';
import {
  View,
  Text,
  StyleSheet,
  TextInput,
  TouchableOpacity,
  Modal,
  Alert,
  Pressable,
  ActivityIndicator,
} from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';

const AmbilSampah = ({navigation}) => {
  const [userId, setUserId] = useState('');
  const [bearer, setBearer] = useState('');
  const [alamat, setAlamat] = useState('');
  const [modalVisible, setModalVisible] = useState(false);
  const [isLoading, setIsloading] = useState(false);

  useEffect(() => {
    const getData = async () => {
      try {
        const value = await AsyncStorage.getItem('@storage_bearer');
        if (value !== null) {
          // value previously stored
          console.log('sync storage komplain bearer', value);
          setBearer(value);
        }
      } catch (e) {
        console.log(e);
      }
    };
    const getDataId = async () => {
      try {
        const id = await AsyncStorage.getItem('@user_id');
        if (id !== null) {
          // value previously stored
          console.log('sync storage komplain userid', id);
          setUserId(id);
        }
      } catch (e) {
        console.log(e);
      }
    };
    getData();
    getDataId();
  }, [userId]);

  const handleSubmit = async () => {
    setIsloading(true);
    try {
      const response = await fetch(
        'https://estate.royalsaranateknologi.com/api/sampah',
        {
          method: 'POST',
          headers: {
            Authorization: `Bearer ${bearer}`,
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            user_id: userId,
            alamat: alamat,
          }),
        },
      );
      const responseJson = await response.json();
      console.log(responseJson);
      if (responseJson.status === 'success') {
        setModalVisible(true);
        setIsloading(false);
      }
    } catch (e) {
      console.log(e);
    }
  };
  const onChangeAlamat = e => {
    setAlamat(e);
  };
  return (
    <View style={styles.container}>
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
            <Text style={styles.modalText}>
              Request Pengambilan Berhasil Dikirim
            </Text>
            {/* <Ionicons name="check" /> */}
            <Pressable
              style={[styles.button, styles.buttonClose]}
              onPress={() => {
                setModalVisible(!modalVisible);
                navigation.navigate('RiwayatSampah', {success: true});
              }}>
              <Text style={styles.textStyle}>Tutup</Text>
            </Pressable>
          </View>
        </View>
      </Modal>
      <Text style={styles.title}>Alamat Unit</Text>
      <View style={styles.inputView}>
        <TextInput
          multiline={true}
          numberOfLines={10}
          style={{
            height: 200,
            textAlignVertical: 'top',
            backgroundColor: '#fff',
            color: 'black',
          }}
          onChangeText={onChangeAlamat}
        />
      </View>
      <TouchableOpacity style={styles.reqBtn} onPress={handleSubmit}>
        {isLoading ? (
          <ActivityIndicator color={'#fff'} />
        ) : (
          <Text style={{color: 'white'}}>Submit</Text>
        )}
      </TouchableOpacity>
    </View>
  );
};

export default AmbilSampah;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    padding: 20,
  },
  textInput: {
    width: '80%',
    backgroundColor: 'white',
    padding: 10,
    marginTop: 10,
    borderRadius: 10,
    marginBottom: 10,
    color: 'black',
  },
  title: {
    marginBottom: 10,
    color: 'black',
    fontSize: 18,
  },
  reqBtn: {
    width: '80%',
    borderRadius: 25,
    height: 50,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#11998E',
    marginTop: 20,
  },
  text: {
    color: 'black',
  },
  inputView: {
    backgroundColor: 'white',
    borderRadius: 10,
    width: '80%',
    marginBottom: 20,
    paddingLeft: 10,
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
    color: 'black',
    fontSize: 20,
  },
});
