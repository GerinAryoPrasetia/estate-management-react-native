import React from 'react';
import {View, Text} from 'react-native';
import {createMaterialTopTabNavigator} from '@react-navigation/material-top-tabs';
import AmbilSampah from './AmbilSampah';
import RiwayatAmbil from './RiwayatAmbil';

const Tab = createMaterialTopTabNavigator();

const Sampah = () => {
  return (
    <Tab.Navigator
      initialRouteName="Feed"
      screenOptions={{
        tabBarActiveTintColor: 'black',
        tabBarLabelStyle: {fontSize: 12},
        tabBarStyle: {backgroundColor: '#fff'},
      }}>
      <Tab.Screen name="Request Baru" component={AmbilSampah} />
      <Tab.Screen name="Riwayat Pengambilan" component={RiwayatAmbil} />
    </Tab.Navigator>
  );
};

export default Sampah;
