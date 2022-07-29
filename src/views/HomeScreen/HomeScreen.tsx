/* eslint-disable @typescript-eslint/no-unused-vars */
import type { NativeStackHeaderProps } from '@react-navigation/native-stack'
import React from 'react'
import { ScrollView, StyleSheet, Text } from 'react-native'
import { useSelector } from 'react-redux'
import { selectToken } from 'src/store/selectors'
import { SafeAreaView } from 'react-native-safe-area-context'
import { screenHeight, screenWidth } from 'src/utils/constants'

const HomeScreen: React.FC<NativeStackHeaderProps> = () => {
  const token = useSelector(selectToken)

  return (

    <SafeAreaView style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }} edges={['top', 'left', 'right']}>
      <ScrollView>

        <Text>首页</Text>

      </ScrollView>
    </SafeAreaView>

  )
}

export default React.memo(HomeScreen)

const styles = StyleSheet.create({

  modalView: {
    width: screenWidth,
    height: screenHeight,
    backgroundColor: 'rgba(0,0,0,0.3)',
    alignItems: 'center',
  },

})
