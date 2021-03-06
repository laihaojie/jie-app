import { useFocusEffect } from '@react-navigation/native'
import type { NativeStackHeaderProps } from '@react-navigation/native-stack'
import type { FC } from 'react'
import React, { useCallback } from 'react'
import { Image, ScrollView, StyleSheet, Text, View } from 'react-native'
import { SafeAreaView } from 'react-native-safe-area-context'
import { useDispatch, useSelector } from 'react-redux'
import { Api } from 'src/api'
import Cell from 'src/components/Cell/Cell'
import actions from 'src/store/actions'
import { selectUser } from 'src/store/selectors'
import { screenWidth } from 'src/utils/constants'
import { navigate } from 'src/utils/navigationService'

const MyScreen: FC<NativeStackHeaderProps> = () => {
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  let isMounted = true
  const userInfo = useSelector(selectUser)
  const dispatch = useDispatch()
  useFocusEffect(
    useCallback(() => {
      loadData()
    }, []),
  )

  React.useEffect(() => {
    return () => { isMounted = false }
  }, [])

  const loadData = async () => {
    const res = await Api.getUserInfo()
    dispatch(actions.setUser({ ...res }))
    // if (isMounted) {
    //   setUserInfo({ ...res })
    // }
  }

  return (
    <SafeAreaView style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }} edges={['top', 'left', 'right']}>
      <ScrollView>
        <View style={styles.topBox}>
          <Image style={styles.avatar} source={{ uri: userInfo?.avatar }} />
          <Text style={styles.name}>{userInfo?.nick_name}</Text>
        </View>

        <Cell source={require('../../assets/image/setting.png')} onPress={() => navigate('TestScreen')} title="开发设置" border={false} />

      </ScrollView>
    </SafeAreaView>
  )
}

const styles = StyleSheet.create({
  name: {
    fontSize: 18,
    color: 'black',
    fontWeight: 'bold',
  },
  avatar: {
    width: 100,
    height: 100,
    borderRadius: 50,
    marginBottom: 16,
  },
  topBox: {
    width: screenWidth,
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 16,
  },
  title: {
    color: '#333',
    fontSize: 18,
    fontWeight: 'bold',
    marginLeft: 16,
    marginBottom: 10,
  },

})

export default MyScreen
