import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { NavigationContainer, NavigationContainerRef } from '@react-navigation/native'
import { createNativeStackNavigator } from '@react-navigation/native-stack'
import React, { useState } from 'react'
import { routes } from './routes'
import HomeScreen from "../views/HomeScreen/HomeScreen"
import TaskScreen from 'src/views/TaskScreen/TaskScreen';

import { SafeAreaProvider, SafeAreaView } from 'react-native-safe-area-context';
import { ScreensParamList } from 'src/typings/router';
import { Alert, Image, StyleSheet, ToastAndroid } from 'react-native';
import Icon from "react-native-vector-icons/AntDesign"

import SplashScreen from 'react-native-splash-screen';
import ProductScreen from 'src/views/ProductScreen/ProductScreen';
import MyScreen from 'src/views/MyScreen/MyScreen';
import HelpScreen from 'src/views/HelpScreen/HelpScreen';
import { navigate, navRef } from 'src/utils/navigationService';
import { useSelector } from 'react-redux';
import { selectToken } from 'src/store/selectors';
import { isEmpty } from 'src/utils';
import TestScreen from 'src/views/test';
import FirstHongBao from 'src/components/ShowModal/FirstHongBao';

const Tab = createBottomTabNavigator();
const Stack = createNativeStackNavigator();



export type TabParamList = {
  home: { name: string };
  task: never;
  help: never;
  product: never;
  my: never;
}

const Routes: React.FC = function () {
  React.useEffect(() => SplashScreen.hide(), []);
  const token = useSelector(selectToken)

  const [modalVisible, setModalVisible] = useState(false);
  const check = (e) => {
    if (isEmpty(token)) {
      navigate("LoginScreen")
    } else {
      navigate("my")
    }
    e.preventDefault();
  }
  const showHelp = (e) => {
    setModalVisible(true)
    e.preventDefault();
  }
  return (
    <SafeAreaProvider>

      <NavigationContainer ref={navRef}>
        <Stack.Navigator screenOptions={{ headerTitleAlign: "center", headerShown: false }} >
          <Stack.Screen name="Home" options={{ headerShown: false }} >
            {() => (
              <Tab.Navigator
                initialRouteName="Analitics"
                screenOptions={({ route }) => ({
                  headerTitleAlign: "center",
                  tabBarIcon: ({ focused, color, size }) => getIcon(focused, route.name),
                  tabBarActiveTintColor: '#58C2F0',
                  tabBarInactiveTintColor: '#9E9E9E',
                  headerShown: false,
                })}
              >
                <Tab.Screen name="home" component={HomeScreen} options={{
                  title: "首页",
                }} />
                <Tab.Screen name="test" component={TestScreen} options={{
                  title: "test"
                }} />
                <Tab.Screen name="task" component={TaskScreen} />
                <Tab.Screen name="help" listeners={{ "tabPress": showHelp }} component={HelpScreen} options={{
                  title: "",
                  tabBarIcon: ({ focused, color, size }) => (
                    <Image style={{ width: 50, height: 50, marginBottom: 10, }} source={require('../assets/image/tasklogo.png')} />
                  ),
                }} />
                <Tab.Screen name="product" component={ProductScreen} />
                <Tab.Screen name="my" listeners={{ "tabPress": check }} component={MyScreen} />
              </Tab.Navigator>
            )}
          </Stack.Screen>
          {routes.map(item => (
            <Stack.Screen {...item} key={item.name} />
          ))}

        </Stack.Navigator>
      </NavigationContainer>


      {
        modalVisible && <FirstHongBao onClose={setModalVisible}></FirstHongBao>
      }

    </SafeAreaProvider>
  )
}

const styles = StyleSheet.create({
  container: {
    paddingTop: 50,
  },
  tinyLogo: {
    width: 50,
    height: 50,
  },
  logo: {
    width: 66,
    height: 58,
  },
  icon: {
    width: 26,
    height: 26,
  }
});

function getIcon(focused: boolean, name: string) {
  return {
    "home": focused ? <Image style={styles.icon} source={require('../assets/image/activehome.png')} /> :
      <Image style={styles.icon} source={require('../assets/image/home.png')} />,
    "test": focused ? <Image style={styles.icon} source={require('../assets/image/activehome.png')} /> :
      <Image style={styles.icon} source={require('../assets/image/home.png')} />,
    "task": focused ? <Image style={styles.icon} source={require('../assets/image/activetask.png')} /> :
      <Image style={styles.icon} source={require('../assets/image/task.png')} />,
    "help": focused ? <Image style={styles.icon} source={require('../assets/image/activehelp.png')} /> :
      <Image style={styles.icon} source={require('../assets/image/help.png')} />,
    "product": focused ? <Image style={styles.icon} source={require('../assets/image/activeproduct.png')} /> :
      <Image style={styles.icon} source={require('../assets/image/product.png')} />,
    "my": focused ? <Image style={styles.icon} source={require('../assets/image/activemy.png')} /> :
      <Image style={styles.icon} source={require('../assets/image/my.png')} />,
  }[name]
}


export default Routes