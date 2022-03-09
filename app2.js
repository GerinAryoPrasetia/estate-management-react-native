import React, {useEffect} from 'react';
import {NavigationContainer} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import Home from './src/screens/home/Home';
import Login from './src/screens/login/Login';
import WelcomeScreen from './src/screens/welcomeScreen/WelcomeScreen';
import Register from './src/screens/register/Register';
import Sampah from './src/screens/sampah/Sampah';
import BayarListrik from './src/screens/payment/air/BayarListrik';
import Account from './src/screens/account/Account';
import News from './src/screens/news/News';
import BayarCicilan from './src/screens/payment/cicilan/BayarCicilan';
import BayarAir from './src/screens/payment/listrik/BayarAir';
import Complain from './src/screens/complain/Complain';
import PaymentPageListrik from './src/screens/payment/air/PaymentPageListrik';
import PaymentPageAir from './src/screens/payment/listrik/PaymentPageAir';
import MethodListrik from './src/screens/payment/air/MethodListrik';
import InvoiceListrik from './src/screens/payment/air/InvoiceListrik';
import Hafalan from './src/screens/hafalan/Hafalan';
import Ionicons from 'react-native-vector-icons/Ionicons';
import InvoiceAir from './src/screens/payment/listrik/InvoiceAir';
// import {initializeApp} from 'https://www.gstatic.com/firebasejs/9.6.7/firebase-app.js';
// import {getAnalytics} from 'https://www.gstatic.com/firebasejs/9.6.7/firebase-analytics.js';

const Stack = createNativeStackNavigator();

const AccountStack = createNativeStackNavigator();
function AccountStackScreen() {
  return (
    <AccountStack.Navigator>
      <AccountStack.Screen
        name="Account Page"
        component={Account}
        options={{headerShown: false}}
      />
    </AccountStack.Navigator>
  );
}

const HomeStack = createNativeStackNavigator();
function HomeStackScreen() {
  return (
    <HomeStack.Navigator initialRouteName="Welcome">
      <HomeStack.Screen
        name="HomePage"
        component={Home}
        options={{headerShown: false}}
      />
      {/* <HomeStack.Screen
        name="Home"
        component={Home}
        options={{headerShown: false}}
      /> */}
      <HomeStack.Screen
        name="Sampah"
        component={Sampah}
        options={{
          title: 'Ambil Sampah',
          headerStyle: {backgroundColor: '#fff'},
        }}
      />
      <HomeStack.Screen
        name="BayarListrik"
        component={BayarListrik}
        options={{
          title: 'Bayar Listrik',
          headerStyle: {backgroundColor: '#fff'},
        }}
      />
      <HomeStack.Screen
        name="PaymentListrik"
        component={PaymentPageListrik}
        options={{
          title: 'Payment Page',
          headerStyle: {backgroundColor: '#fff'},
        }}
      />
      <HomeStack.Screen
        name="MethodListrik"
        component={MethodListrik}
        options={{
          title: 'Payment Method',
          headerStyle: {backgroundColor: '#fff'},
        }}
      />
      <HomeStack.Screen
        name="InvoiceListrik"
        component={InvoiceListrik}
        options={{
          title: 'Invoice',
          headerStyle: {backgroundColor: '#fff'},
        }}
      />
      <HomeStack.Screen
        name="PaymentAir"
        component={PaymentPageAir}
        options={{
          title: 'Payment Page',
          headerStyle: {backgroundColor: '#fff'},
        }}
      />
      <HomeStack.Screen
        name="BayarCicilan"
        component={BayarCicilan}
        options={{
          title: 'Bayar Cicilan',
          headerStyle: {backgroundColor: '#fff'},
        }}
      />
      <HomeStack.Screen
        name="BayarAir"
        component={BayarAir}
        options={{
          title: 'Bayar Air',
          headerStyle: {backgroundColor: '#fff'},
        }}
      />
      <HomeStack.Screen
        name="InvoiceAir"
        component={InvoiceAir}
        options={{
          title: 'Invoice',
          headerStyle: {backgroundColor: '#fff'},
        }}
      />
      <HomeStack.Screen
        name="Complain"
        component={Complain}
        options={{
          title: 'Komplain',
          headerStyle: {backgroundColor: '#fff'},
        }}
      />
      <HomeStack.Screen
        name="Hafalan"
        component={Hafalan}
        options={{
          title: 'Setor Hafalan',
          headerStyle: {backgroundColor: '#fff'},
        }}
      />
    </HomeStack.Navigator>
  );
}

const NewsStack = createNativeStackNavigator();
function NewsStackScreen() {
  return (
    <NewsStack.Navigator>
      <NewsStack.Screen
        name="News Page"
        component={News}
        options={{headerShown: false}}
      />
    </NewsStack.Navigator>
  );
}

function MainStack() {
  return (
    <Tab.Navigator
      initialRouteName="Home"
      screenOptions={({route}) => ({
        tabBarIcon: ({focused, color, size}) => {
          let iconName;

          if (route.name === 'Home') {
            iconName = focused ? 'home' : 'home';
          } else if (route.name === 'Account') {
            iconName = focused ? 'person-outline' : 'person-outline';
          } else if (route.name === 'News') {
            iconName = focused ? 'newspaper-outline' : 'newspaper-outline';
          }
          // You can return any component that you like here!
          return <Ionicons name={iconName} size={size} color={color} />;
        },
        tabBarActiveTintColor: '#11998E',
        tabBarInactiveTintColor: 'black',
      })}>
      <Tab.Screen
        name="Account"
        component={AccountStackScreen}
        options={{headerShown: false}}
      />
      <Tab.Screen
        name="Home"
        component={HomeStackScreen}
        options={{headerShown: false}}
      />
      <Tab.Screen
        name="News"
        component={NewsStackScreen}
        options={{headerShown: false}}
      />
    </Tab.Navigator>
  );
}

const Tab = createBottomTabNavigator();

const Index = () => {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="Welcome">
        <Stack.Screen
          name="Welcome"
          component={WelcomeScreen}
          options={{headerShown: false}}
        />
        <Stack.Screen
          name="Register"
          component={Register}
          options={{headerShown: false}}
        />
        <Stack.Screen
          name="Login"
          component={Login}
          options={{headerShown: false}}
        />
        <Stack.Screen
          name="HomeTab"
          component={MainStack}
          options={{headerShown: false}}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
};
export default Index;