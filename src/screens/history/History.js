/* eslint-disable prettier/prettier */
import React from 'react';
import {View} from 'react-native';
import {createMaterialTopTabNavigator} from '@react-navigation/material-top-tabs';
import HistoryPembayaran from './HistoryPembayaran';
import HistorySos from './HistorySos';

const Tab = createMaterialTopTabNavigator();

const History = () => {
  return (
    <Tab.Navigator
      initialRouteName="Feed"
      screenOptions={{
        tabBarActiveTintColor: 'black',
        tabBarLabelStyle: {fontSize: 12},
        tabBarStyle: {backgroundColor: '#fff'},
      }}>
      <Tab.Screen name="History Pembayaran" component={HistoryPembayaran} />
      <Tab.Screen name="History SOS" component={HistorySos} />
    </Tab.Navigator>
  );
};

export default History;
