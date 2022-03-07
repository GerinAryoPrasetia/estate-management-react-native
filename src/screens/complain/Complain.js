import React from 'react';
import {View, Text} from 'react-native';
import {createMaterialTopTabNavigator} from '@react-navigation/material-top-tabs';
import AmbilSampah from './FormComplain';
import RiwayatAmbil from './RiwayatComplain';
import FormComplain from './FormComplain';
import RiwayatComplain from './RiwayatComplain';

const Tab = createMaterialTopTabNavigator();

const Complain = () => {
  return (
    <Tab.Navigator
      initialRouteName="Feed"
      screenOptions={{
        tabBarActiveTintColor: 'black',
        tabBarLabelStyle: {fontSize: 12},
        tabBarStyle: {backgroundColor: '#fff'},
      }}>
      <Tab.Screen name="Form Complain" component={FormComplain} />
      <Tab.Screen name="Riwayat Complain" component={RiwayatComplain} />
    </Tab.Navigator>
  );
};

export default Complain;
