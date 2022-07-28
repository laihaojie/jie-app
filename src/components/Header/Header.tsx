import { useFocusEffect } from '@react-navigation/native'
import React, { useCallback, useState } from 'react'
import { StatusBar, StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import Icon from 'react-native-vector-icons/AntDesign'
import { goBack } from 'src/utils/navigationService'

interface IProps {
  title: string
  right?: string
  color?: string
  backgroundColor?: string
}

export default function Header({ title, backgroundColor, color, right }: IProps) {
  const [statusBar, setStatusBar] = useState(true)
  useFocusEffect(
    useCallback(() => {
      setStatusBar(true)
      return () => {
        setStatusBar(false)
      }
    }, []),
  )

  return (
    <View style={[styles.container, { backgroundColor: backgroundColor || '#2196F3' }]}>
      {statusBar ? <StatusBar translucent={false} backgroundColor={backgroundColor || '#2196F3'} /> : null}
      {/* {isFunction(leftIcon) ? (leftIcon as Function)() : leftIcon} */}
      <TouchableOpacity style={styles.left} onPress={() => goBack()}>
        <Icon name="left" size={20} color="#fff" />
      </TouchableOpacity>

      <View style={styles.center}>

        <Text style={[styles.title, { color: color || '#fff' }]}>{title}</Text>
      </View>

      <View style={styles.right}>
        {right ? <Text style={styles.title}>right</Text> : null}
      </View>

    </View>
  )
}

const styles = StyleSheet.create({
  title: {
    marginLeft: 12,
    color: 'red',
  },
  center: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    // backgroundColor: "red",
  },
  right: {
    width: 49,
    height: 49,
    justifyContent: 'center',
    alignItems: 'center',
  },
  left: {
    width: 49,
    height: 49,
    justifyContent: 'center',
    alignItems: 'center',
  },
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    height: 49,
  },
})
