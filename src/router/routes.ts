import { createNativeStackNavigator } from '@react-navigation/native-stack'
import TestScreen from 'src/views/test'
import type { RouteProps } from '../typings/router'
import DetailScreen from '../views/DetailScreen/DetailScreen'

// eslint-disable-next-line @typescript-eslint/no-unused-vars
const Stack = createNativeStackNavigator()

export interface MainStackParamList {
  DetailScreen: never
  LoginScreen: never
  TestScreen: never
}

export const routes = <RouteProps[]>[
  { name: 'DetailScreen', component: DetailScreen },
  { name: 'TestScreen', component: TestScreen },
  // { name: "LoginScreen", component: LoginScreen },

]

export const tabs = <RouteProps[]>[

]
