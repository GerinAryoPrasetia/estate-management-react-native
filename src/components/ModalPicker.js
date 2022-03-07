import React from 'react';
import {
  View,
  StyleSheet,
  Text,
  TouchableOpacity,
  Dimensions,
  ScrollView,
} from 'react-native';

// const OPTIONS = ['bni', 'bca', 'mandiri', 'bri'];
const OPTIONS = [
  {text: 'BNI VA', value: 'bni'},
  {text: 'BCA VA', value: 'bca'},
  {text: 'MANDIRI VA', value: 'mandiri'},
  {text: 'BRI VA', value: 'bri'},
];
const WIDTH = Dimensions.get('window').width;
const HEIGHT = Dimensions.get('window').height;
const ModalPicker = props => {
  const onPressItem = option => {
    props.changeModalVisibility(false);
    props.setData(option);
  };
  const option = OPTIONS.map((item, index) => {
    return (
      <TouchableOpacity
        style={styles.option}
        key={index}
        onPress={() => onPressItem(item.value)}>
        <Text style={styles.text}>{item.text}</Text>
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

export default ModalPicker;

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
    fontSize: 24,
  },
});
