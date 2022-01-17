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
import TaskScreen from 'src/views/TaskScreen/TaskScreen';
import TextScreen from 'src/views/TextScreen/TextScreen';
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import React from "react";
import { BackHandler, NativeModules, StyleSheet } from "react-native";
import { SafeAreaProvider } from "react-native-safe-area-context";
import { NavigationContainer } from "@react-navigation/native";
import HomeScreen from "src/views/HomeScreen/HomeScreen";
import { routes } from "./routes";

const Tab = createBottomTabNavigator();
const Stack = createNativeStackNavigator();

export type TabParamList = {
  home: { name: string };
  task: never;
  text: never;
  product: never;
  my: never;
}
let lastBackPressed = 0;
const Routes: React.FC = function () {
  const token = useSelector(selectToken)
  const dispatch = useDispatch()
  const [isShow, setIsShow] = React.useState(false)

  const [modalVisible, setModalVisible] = React.useState(false);

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
                        tabBarActiveTintColor: '#2196F3',
                        tabBarInactiveTintColor: '#9E9E9E',
                        headerShown: false,
                      })}
                    >
                      <Tab.Screen name="home" component={HomeScreen} options={{
                        title: "首页",
                      }} />
                      <Tab.Screen name="task" component={TaskScreen} options={{
                        title: "事件代办",
                      }} />
                      <Tab.Screen name="text" component={TextScreen} options={{
                        title: "小本本",
                      }} />
                      <Tab.Screen name="test" component={TestScreen} options={{
                        title: "test"
                      }} />

                      <Tab.Screen name="my" listeners={{ "tabPress": check }} component={MyScreen} options={{
                        title: "我的"
                      }} />
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
    "home": <Icon name='meh' size={30} color={focused ? "#2196F3" : "#999999"} />,
    "test": <Icon name='lock1' size={30} color={focused ? "#2196F3" : "#999999"} />,
    "task": <Icon name='bars' size={30} color={focused ? "#2196F3" : "#999999"} />,
    "text": <Icon name='tagso' size={30} color={focused ? "#2196F3" : "#999999"} />,
    "my": <Icon name='user' size={30} color={focused ? "#2196F3" : "#999999"} />,
  }[name]
}


export default Routes
