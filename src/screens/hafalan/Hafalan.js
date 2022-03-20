import React, {useEffect, useState} from 'react';
import {View, StyleSheet, Text, Pressable, TextInput} from 'react-native';
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
  const [recordSecs, setrecordSecs] = useState(0);
  const [recordTime, setRecordTime] = useState('00:00:00');
  const [currentPositionSec, setCurrentPositionSec] = useState(0);
  const [currentDurationSec, setcurrentDurationSec] = useState(0);
  const [playTime, setPlayTime] = useState('00:00:00');
  const [duration, setDuration] = useState('00:00:00');
  const [userId, setUserId] = useState('');
  const [selectedJuz, setSelectedJuz] = useState('');
  const [selectedSurah, setSelectedSurah] = useState('');
  const [selectedAyat, setSelectedAyat] = useState('');
  // const [juz, setJuz] = useState('');
  const [surah, setSurah] = useState([]);
  const [ayat, setAyat] = useState('');

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
    audioRecorderPlayer.setSubscriptionDuration(0.09);
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
    getSurah();
    setSelectedAyat();
    getDataId();
    // console.log('SURAH', surah);
  }, [userId]);

  const onStartRecord = async () => {
    const path = 'hello.m4a';
    const audioSet = {
      AudioEncoderAndroid: AudioEncoderAndroidType.AAC,
      AudioSourceAndroid: AudioSourceAndroidType.MIC,
      AVEncoderAudioQualityKeyIOS: AVEncoderAudioQualityIOSType.high,
      AVNumberOfChannelsKeyIOS: 2,
      AVFormatIDKeyIOS: AVEncodingOption.aac,
    };
    console.log('audioSet', audioSet);
    const uri = await audioRecorderPlayer.startRecorder(path, audioSet);
    audioRecorderPlayer.addRecordBackListener(e => {
      const record_time = audioRecorderPlayer.mmssss(
        Math.floor(e.currentPosition),
      );
      setRecordTime(record_time);
      setrecordSecs(e.currentPosition);
    });
    console.log(`uri: ${uri}`);
    console.log('URI', uri);
  };
  const onStopRecord = async () => {
    const result = await audioRecorderPlayer.stopRecorder();
    audioRecorderPlayer.removeRecordBackListener();
    setrecordSecs(0);
    console.log(result);
  };
  const onChangeAyat = e => {
    setAyat(e);
  };
  console.log(selectedJuz);
  return (
    <View style={styles.container}>
      {/* <Text>Hafalan</Text>
      <Pressable onPress={onStartRecord}>
        <Text>Record</Text>
      </Pressable>
      <Text></Text>
      <Pressable onPress={onStopRecord}>
        <Text>STOP</Text>
      </Pressable> */}
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
      />
      <Pressable onPress={onStartRecord} style={styles.recordBtn}>
        <Text style={{color: 'white'}}>Record</Text>
      </Pressable>
      <Text style={{color: 'black'}}>{recordTime}</Text>
      <Pressable onPress={onStopRecord} style={styles.stopBtn}>
        <Text style={{color: 'black'}}>Stop</Text>
      </Pressable>
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
});
