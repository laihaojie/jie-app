/* eslint-disable no-console */
import Icon from 'react-native-vector-icons/AntDesign'
import SplashScreen from 'react-native-splash-screen'
import MyScreen from 'src/views/MyScreen/MyScreen'
import { goBack, navRef, navigate } from 'src/utils/navigationService'
import { useDispatch, useSelector } from 'react-redux'
import { selectToken, selectVersion } from 'src/store/selectors'
import actions from 'src/store/actions'
import Toast from 'react-native-simple-toast'
import LoginScreen from 'src/views/LoginScreen/LoginScreen'
import TaskScreen from 'src/views/TaskScreen/TaskScreen'
import TextScreen from 'src/views/TextScreen/TextScreen'
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs'
import { createNativeStackNavigator } from '@react-navigation/native-stack'
import React, { useRef, useState } from 'react'
import { Alert, BackHandler, NativeModules } from 'react-native'
import { SafeAreaProvider } from 'react-native-safe-area-context'
import { NavigationContainer } from '@react-navigation/native'
import HomeScreen from 'src/views/HomeScreen/HomeScreen'
import { isEmpty } from '@djie/utils'
import UpdateAPK from 'jie-rn-update-apk'
import ProgressModal from 'src/components/ShowModal/ProgressModal'
import { routes } from './routes'

const Tab = createBottomTabNavigator()
const Stack = createNativeStackNavigator()

export interface TabParamList {
  HomeScreen: { name: string }
  TaskScreen: never
  TextScreen: never
  MyScreen: never
}
let lastBackPressed = 0
const Routes: React.FC = function () {
  const token = useSelector(selectToken)
  const dispatch = useDispatch()
  const [isShow, setIsShow] = React.useState(false)

  React.useEffect(() => {
    SplashScreen.hide()
    BackHandler.addEventListener('hardwareBackPress', onBackPress)
    return () => {
      BackHandler.removeEventListener('hardwareBackPress', onBackPress)
    }
  }, [])

  const updater = useRef<any>(null)
  const version = useSelector(selectVersion)
  const [progress, setProgress] = useState(0)

  React.useEffect(() => {
    console.log(version)
  }, [version])
  React.useEffect(() => {
    updater.current.checkUpdate()
  }, [])
  // console.log(token);

  updater.current = new UpdateAPK({

    apkVersionUrl: 'https://api.laihaojie.com/api/public/androidVersion',
    devVersion: version,
    apkVersionOptions: {
      method: 'GET',
      headers: {},
    },

    apkOptions: {
      headers: {},
    },
    fileProviderAuthority: 'com.jieapp.fileprovider',

    needUpdateApp: (performUpdate) => {
      console.log('开发更新版本号=================', version)
      Alert.alert(
        '有一个新的版本',
        '新版本发布',
        [
          { text: '取消', onPress: () => { } },
          {
            text: '更新',
            onPress: () => {
              performUpdate(true)
            },
          },
        ])
    },

    forceUpdateApp: () => {
      console.log('forceUpdateApp callback called')
    },

    notNeedUpdateApp: ({ devVersion }) => {
      dispatch(actions.setVersion(devVersion))
    },
    downloadApkStart: () => {
      setProgressModalVisible(true)
      // console.log("开发更新版本号=================", version);
    },

    downloadApkProgress: (progress) => {
      setProgress(progress)
    },

    // This is called prior to the update. If you throw it will abort the update
    downloadApkEnd: ({ devVersion }) => {
      setProgressModalVisible(false)
      dispatch(actions.setVersion(devVersion))
    },

    onError: (err) => {
      console.log('onError callback called', err)
      Alert.alert('There was an error', err.message)
    },
  })

  const [progressModalVisible, setProgressModalVisible] = useState(false)

  React.useEffect(() => {
    (async function () {
      const res = await NativeModules.RNToolsManager.promiseMethod('22')
      dispatch(actions.setNativeData({ aa: '122211111' }))
      SplashScreen.hide()
      setIsShow(true)
      console.log(res)
    })()
  }, [])

  const check = (e) => {
    const target = e.target.replace(/(\w+?)[-](.+)/, '$1')
    if (isEmpty(token))
      navigate('LoginScreen')
    else
      navigate(target)

    e.preventDefault()
  }

  // 安卓返回键关闭APP
  const onBackPress = () => {
    const stack = navRef.current?.getState()?.routes
    console.log(stack)

    if (!stack || stack.length === 1) {
      const now = new Date().getTime()
      if (now - lastBackPressed < 2000)
        return false

      lastBackPressed = now
      Toast.show('再按一次返回键 退出APP')
      return true
    }
    goBack()
    return true
  }

  return (
    <SafeAreaProvider>
      {
        isShow
        && <NavigationContainer ref={navRef}>
          {
            progressModalVisible && <ProgressModal onClose={setProgressModalVisible} progress={progress}></ProgressModal>
          }
          {

            isEmpty(token)
              ? <Stack.Navigator screenOptions={{ headerTitleAlign: 'center', headerShown: false }} >
                <Stack.Screen name="LoginScreen" component={LoginScreen} />
              </Stack.Navigator>

              : <Stack.Navigator screenOptions={{ headerTitleAlign: 'center', headerShown: false }} >
                <Stack.Screen name="TableScreen" options={{ headerShown: false }} >
                  {() => (
                    <Tab.Navigator
                      initialRouteName="Analitics"
                      screenOptions={({ route }) => ({
                        headerTitleAlign: 'center',
                        tabBarIcon: ({ focused }) => getIcon(focused, route.name),
                        tabBarActiveTintColor: '#2196F3',
                        tabBarInactiveTintColor: '#9E9E9E',
                        headerShown: false,
                      })}
                    >
                      <Tab.Screen name="HomeScreen" component={HomeScreen} options={{
                        title: '首页',
                      }} />
                      <Tab.Screen name="TaskScreen" component={TaskScreen} options={{
                        title: '事件代办',
                      }} />
                      <Tab.Screen name="TextScreen" component={TextScreen} options={{
                        title: '小本本',
                      }} />

                      <Tab.Screen name="MyScreen" listeners={{ tabPress: check }} component={MyScreen} options={{
                        title: '我的',
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
    </SafeAreaProvider >
  )
}

function getIcon(focused: boolean, name: string) {
  return {
    HomeScreen: <Icon name="home" size={30} color={focused ? '#2196F3' : '#999999'} />,
    TaskScreen: <Icon name="bars" size={30} color={focused ? '#2196F3' : '#999999'} />,
    TextScreen: <Icon name="tagso" size={30} color={focused ? '#2196F3' : '#999999'} />,
    MyScreen: <Icon name="user" size={30} color={focused ? '#2196F3' : '#999999'} />,
  }[name]
}

export default Routes
