import { Dimensions } from 'react-native'

const { width: screenWidth, height: screenHeight } = Dimensions.get('window')
export { screenHeight, screenWidth }
export const baseUrl = 'https://api.laihaojie.com'
export const socketUrl = 'wss://wss.laihaojie.com' // webSocket 域名
export const white = '#DEF3FC'

