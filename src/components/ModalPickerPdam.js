import React, {useEffect, useState} from 'react';
import {
  View,
  StyleSheet,
  Text,
  TouchableOpacity,
  Dimensions,
  ScrollView,
} from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';

const WIDTH = Dimensions.get('window').width;
const HEIGHT = Dimensions.get('window').height;
const ModalPickerPdam = props => {
  const [pdam, setPdam] = useState([]);
  const [bearer, setBearer] = useState('');
  const [selectedPdam, setSelectedPdam] = useState('');

  const pdamData = props.option;
  console.log('OPTION MODAL PICKER PDAM', pdamData);

  const onPressItem = option => {
    props.changeModalVisibility(false);
    props.setData(option);
  };
  const option = pdamData.map((item, index) => {
    return (
      <TouchableOpacity
        style={styles.option}
        key={index}
        onPress={() => onPressItem(item.code)}>
        <Text style={styles.text}>{item.name}</Text>
      </TouchableOpacity>
    );
  });
  return (
    <TouchableOpacity
      onPress={() => props.changeModalVisibility(false)}
      style={styles.container}>
      <View style={[styles.modal, {width: WIDTH - 20, height: HEIGHT / 2}]}>
        <ScrollView>{option}</ScrollView>
      </View>
    </TouchableOpacity>
  );
};

export default ModalPickerPdam;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  modal: {
    backgroundColor: 'white',
    borderRadius: 10,
  },
  option: {
    alignItems: 'flex-start',
  },
  text: {
    margin: 20,
    color: 'black',
    fontWeight: 'bold',
    fontSize: 16,
  },
});
