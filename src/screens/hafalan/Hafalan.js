import React, {useEffect, useState} from 'react';
import {
  View,
  StyleSheet,
  Text,
  Pressable,
  TextInput,
  TouchableOpacity,
  ActivityIndicator,
} from 'react-native';
import {Platform} from 'react-native';
import {PermissionsAndroid} from 'react-native';
import AudioRecorderPlayer, {
  AVEncoderAudioQualityIOSType,
  AVEncodingOption,
  AudioEncoderAndroidType,
  AudioSet,
  AudioSourceAndroidType,
} from 'react-native-audio-recorder-player';
import {Picker} from '@react-native-picker/picker';
import AsyncStorage from '@react-native-async-storage/async-storage';
import RNFetchBlob from 'rn-fetch-blob';
import DocumentPicker from 'react-native-document-picker';
import Ionicons from 'react-native-vector-icons/Ionicons';

const JUZ = [
  '1',
  '2',
  '3',
  '4',
  '5',
  '6',
  '7',
  '8',
  '9',
  '10',
  '11',
  '12',
  '13',
  '14',
  '15',
  '16',
  '17',
  '18',
  '19',
  '20',
  '21',
  '22',
  '23',
  '24',
  '25',
  '26',
  '27',
  '28',
  '29',
  '30',
];

const Hafalan = () => {
  const [isLoggingIn, setIsLoggingIn] = useState(false);
  const [currentPositionSec, setCurrentPositionSec] = useState(0);
  const [currentDurationSec, setcurrentDurationSec] = useState(0);
  const [userId, setUserId] = useState('');
  const [selectedJuz, setSelectedJuz] = useState('1');
  const [selectedSurah, setSelectedSurah] = useState('Al-Fatihah');
  const [selectedAyat, setSelectedAyat] = useState('');
  // const [juz, setJuz] = useState('');
  const [surah, setSurah] = useState([]);
  const [ayat, setAyat] = useState('');
  const [singleFile, setSingleFile] = useState(null);
  const [loading, setLoading] = useState(false);
  const [data, setData] = useState({});
  const [bearer, setBearer] = useState('');

  const audioRecorderPlayer = new AudioRecorderPlayer();

  const grantsPermission = async () => {
    if (Platform.OS === 'android') {
      try {
        const grants = await PermissionsAndroid.requestMultiple([
          PermissionsAndroid.PERMISSIONS.WRITE_EXTERNAL_STORAGE,
          PermissionsAndroid.PERMISSIONS.READ_EXTERNAL_STORAGE,
          PermissionsAndroid.PERMISSIONS.RECORD_AUDIO,
        ]);

        console.log('write external stroage', grants);

        if (
          grants['android.permission.WRITE_EXTERNAL_STORAGE'] ===
            PermissionsAndroid.RESULTS.GRANTED &&
          grants['android.permission.READ_EXTERNAL_STORAGE'] ===
            PermissionsAndroid.RESULTS.GRANTED &&
          grants['android.permission.RECORD_AUDIO'] ===
            PermissionsAndroid.RESULTS.GRANTED
        ) {
          console.log('Permissions granted');
        } else {
          console.log('All required permissions not granted');
          return;
        }
      } catch (err) {
        console.warn(err);
        return;
      }
    }
  };
  useEffect(() => {
    grantsPermission();
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
    const getSurah = async () => {
      const response = await fetch('https://api.quran.sutanlab.id/surah');
      const responseJson = await response.json();
      // console.log('Surah', responseJson);
      // console.log(responseJson.data[0].name.transliteration.id);
      if (responseJson !== null) {
        setSurah(responseJson.data);
      }
    };
    // const getAyat = async () => {
    //   const response = await fetch(`https://api.quran.sutanlab.id/surah/${}`)
    // };
    const getToken = async () => {
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
    getSurah();
    setSelectedAyat();
    getDataId();
    getToken();
    // console.log('SURAH', surah);
  }, [userId]);

  const uploadImage = async () => {
    // Check if any file is selected or not
    setLoading(true);

    if (singleFile != null) {
      // If file selected then create FormData
      const fileToUpload = singleFile;
      const fd = new FormData();
      fd.append('user_id', userId);
      fd.append('juz', selectedJuz);
      fd.append('surat', selectedSurah);
      fd.append('ayat', ayat);
      fd.append('file', fileToUpload);
      // Please change file upload URL

      let res = await fetch(
        'https://estate.royalsaranateknologi.com/api/hafalan',
        {
          method: 'POST',
          body: fd,
          headers: {
            Authorization: `Bearer ${bearer}`,
            'Content-Type': 'multipart/form-data',
          },
        },
      );
      let responseJson = await res.json();
      if (responseJson.status === 'sukses') {
        alert('Hafalan Berhasil Dikirim!');
        setLoading(false);
      }
    } else {
      // If no file selected the show alert
      alert('Please Select File first');
    }
  };

  const selectFile = async () => {
    // Opening Document Picker to select one file
    try {
      const res = await DocumentPicker.pickSingle({
        // Provide which type of file you want user to pick
        type: [DocumentPicker.types.allFiles],
        // There can me more options as well
        // DocumentPicker.types.allFiles
        // DocumentPicker.types.images
        // DocumentPicker.types.plainText
        // DocumentPicker.types.audio
        // DocumentPicker.types.pdf
      });
      // Printing the log realted to the file
      console.log('res : ' + JSON.stringify(res));
      // Setting the state to show single file attributes
      setSingleFile(res);
    } catch (err) {
      setSingleFile(null);
      // Handling any exception (If any)
      if (DocumentPicker.isCancel(err)) {
        // If user canceled the document selection
        alert('Canceled');
      } else {
        // For Unknown Error
        alert('Unknown Error: ' + JSON.stringify(err));
        throw err;
      }
    }
  };

  const onChangeAyat = e => {
    setAyat(e);
  };
  console.log(selectedJuz);
  return (
    <View style={styles.container}>
      <Text style={styles.text}>Pilih Juz</Text>
      <Picker
        selectedValue={selectedJuz}
        onValueChange={(itemValue, itemIndex) => setSelectedJuz(itemValue)}
        mode="dropdown"
        style={styles.picker}>
        {JUZ &&
          JUZ.length > 0 &&
          JUZ.map((j, idx) => {
            return <Picker.Item label={j} value={idx + 1} key={idx} />;
          })}
      </Picker>
      <Text style={styles.text}>Pilih Surat</Text>
      <Picker
        selectedValue={selectedSurah}
        onValueChange={(itemValue, itemIndex) => setSelectedSurah(itemValue)}
        mode="dropdown"
        style={styles.picker}>
        {surah &&
          surah.length > 0 &&
          surah.map((s, idx) => {
            return (
              <Picker.Item
                label={s.name.transliteration.id}
                value={s.name.transliteration.id}
                key={idx}
              />
            );
          })}
      </Picker>
      <Text style={styles.text}>Pilih Ayat</Text>
      <TextInput
        style={styles.inputView}
        value={ayat}
        onChangeText={onChangeAyat}
        placeholder="Masukkan Ayat"
      />
      <Text style={styles.text}>Upload Rekaman Hafalan</Text>
      <Pressable onPress={selectFile}>
        <View style={styles.passwordContainer}>
          {singleFile != null ? (
            <Text style={{color: "black"}}>{singleFile.name ? singleFile.name : ''}</Text>
          ) : (
            <Text style={{color: "grey"}}>Pilih File</Text>
          )}
          <Text style={styles.inputStyle}></Text>
          <Ionicons name={'cloud-upload'} size={17} color={'#000'} />
        </View>
      </Pressable>
      <Text style={{color: "grey"}}>*Pilih file rekaman hafalan</Text>
      <Text style={{color: "grey"}}>yang sudah dibuat sebelumnya</Text>
      {/*Showing the data of selected Single file*/}
      {singleFile != null ? (
        <Text style={styles.textStyle}>
          Type: {singleFile.type ? singleFile.type : ''}
          {'\n'}
          File Size: {singleFile.size
            ? Math.floor(singleFile.size / 1000)
            : ''}{' '}
          kb
          {'\n'}
          {/* URI: {singleFile.uri ? singleFile.uri : ''}
          {'\n'} */}
        </Text>
      ) : null}
      <TouchableOpacity
        style={styles.registerBtn}
        activeOpacity={0.5}
        onPress={uploadImage}>
        {loading ? (
          <ActivityIndicator color={'white'} />
        ) : (
          <Text style={styles.buttonTextStyle}>Kirim Hafalan</Text>
        )}
      </TouchableOpacity>
    </View>
  );
};

export default Hafalan;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    padding: 10,
  },
  text: {
    color: 'black',
  },
  picker: {
    marginVertical: 10,
    width: 300,
    padding: 10,
    borderWidth: 1,
    borderColor: '#666',
    backgroundColor: '#fff',
    color: 'black',
    marginBottom: 20,
  },
  pickerItem: {
    color: 'black',
  },
  inputView: {
    backgroundColor: 'white',
    borderWidth: 1,
    borderColor: 'grey',
    width: '80%',
    padding: 10,
    borderRadius: 10,
    marginTop: 20,
    marginBottom: 20,
    color: 'black',
  },
  recordBtn: {
    alignItems: 'center',
    backgroundColor: '#11998E',
    paddingVertical: 10,
    width: 80,
    borderRadius: 10,
  },
  stopBtn: {
    marginVertical: 10,
    alignItems: 'center',
    backgroundColor: 'white',
    paddingVertical: 10,
    width: 80,
    borderRadius: 10,
    borderWidth: 1,
    borderColor: 'red',
  },
  buttonStyle: {
    backgroundColor: '#307ecc',
    borderWidth: 0,
    color: '#FFFFFF',
    borderColor: '#307ecc',
    height: 40,
    alignItems: 'center',
    borderRadius: 30,
    marginLeft: 35,
    marginRight: 35,
    marginTop: 15,
  },
  buttonTextStyle: {
    color: '#FFFFFF',
    paddingVertical: 10,
    fontSize: 16,
  },
  textStyle: {
    color: 'black',
    fontSize: 15,
    marginTop: 16,
    marginLeft: 35,
    marginRight: 35,
    textAlign: 'center',
  },
  registerBtn: {
    width: '80%',
    borderRadius: 25,
    height: 50,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#11998E',
    marginBottom: 10,
  },
  passwordContainer: {
    flexDirection: 'row',
    borderBottomWidth: 1,
    borderColor: '#000',
    backgroundColor: 'white',
    borderWidth: 1,
    borderColor: 'grey',
    width: '80%',
    padding: 15,
    borderRadius: 10,
    marginTop: 20,
    color: 'black',
  },
  inputStyle: {
    flex: 1,
    alignItems: 'center',
  },
});
