import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { NavigationContainer, NavigationContainerRef } from '@react-navigation/native'
import { createNativeStackNavigator } from '@react-navigation/native-stack'
import React, { useState } from 'react'
import { routes } from './routes'
import HomeScreen from "../views/HomeScreen/HomeScreen"

import { SafeAreaProvider, SafeAreaView } from 'react-native-safe-area-context';
import { ScreensParamList } from 'src/typings/router';
import { Alert, BackHandler, Image, NativeModules, StyleSheet, ToastAndroid } from 'react-native';
import Icon from "react-native-vector-icons/AntDesign"

import SplashScreen from 'react-native-splash-screen';
import MyScreen from 'src/views/MyScreen/MyScreen';
import { goBack, navigate, navRef } from 'src/utils/navigationService';
import { useDispatch, useSelector } from 'react-redux';
import { selectToken } from 'src/store/selectors';
import { isEmpty } from 'src/utils';
import TestScreen from 'src/views/test';
import actions from 'src/store/actions';
import Toast from 'react-native-simple-toast';
import LoginScreen from 'src/views/LoginScreen/LoginScreen';

const Tab = createBottomTabNavigator();
const Stack = createNativeStackNavigator();

export type TabParamList = {
  home: { name: string };
  task: never;
  help: never;
  product: never;
  my: never;
}
let lastBackPressed = 0;
const Routes: React.FC = function () {
  const token = useSelector(selectToken)
  const dispatch = useDispatch()
  const [isShow, setIsShow] = useState(false)

  const [modalVisible, setModalVisible] = useState(false);

  React.useEffect(() => {

    SplashScreen.hide()
    BackHandler.addEventListener("hardwareBackPress", onBackPress)
    return () => {
      BackHandler.removeEventListener("hardwareBackPress", onBackPress)
    }
  }, []);

  React.useEffect(() => {
    (async function () {
      const res = await NativeModules.RNToolsManager.promiseMethod("22")
      dispatch(actions.setNativeData({ aa: "122211111" }))
      SplashScreen.hide();
      setIsShow(true)
      console.log(res);
    })()
  }, []);


  const check = (e) => {
    const target = e.target.replace(/(\w+?)[-](.+)/, '$1')
    if (isEmpty(token)) {
      navigate("LoginScreen")
    } else {
      navigate(target)
    }
    e.preventDefault();
  }


  //安卓返回键关闭APP
  const onBackPress = () => {
    let stack = navRef.current?.getState()?.routes
    console.log(stack);

    if (!stack || stack.length == 1) {
      let now = new Date().getTime();
      if (now - lastBackPressed < 2000) {
        return false;
      }
      lastBackPressed = now;
      Toast.show("再按一次返回键 退出APP");
      return true;
    }
    goBack()
    return true
  };


  return (
    <SafeAreaProvider>
      {
        isShow &&
        <NavigationContainer ref={navRef}>

          {
            isEmpty(token) ?
              <Stack.Navigator screenOptions={{ headerTitleAlign: "center", headerShown: false }}  >
                <Stack.Screen name="LoginScreen" component={LoginScreen} />
              </Stack.Navigator> :

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

                      <Tab.Screen name="my" listeners={{ "tabPress": check }} component={MyScreen} />
                    </Tab.Navigator>
                  )}
                </Stack.Screen>
                {routes.map(item => (
                  <Stack.Screen {...item} key={item.name} />
                ))}

              </Stack.Navigator>
          }
        </NavigationContainer>
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
