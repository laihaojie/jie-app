import React from 'react'
import type { ImageSourcePropType } from 'react-native'
import { Image, StyleSheet, Text, TouchableOpacity, View } from 'react-native'

interface IProps {
  // leftIcon: React.ReactElement<{}> | React.FC<{}>,
  source: ImageSourcePropType
  title: string
  rightText?: string
  border?: boolean
  onPress?: () => void
}

export default function Cell({ source, title, rightText, border, onPress }: IProps) {
  if (typeof border === 'undefined') border = true

  return (
    <TouchableOpacity style={[styles.container, border ? { borderBottomWidth: 1, borderBottomColor: '#E5E5E5' } : null]} onPress={onPress}>
      {/* {isFunction(leftIcon) ? (leftIcon as Function)() : leftIcon} */}
      <Image style={styles.left} source={source} />
      <View style={styles.center}>

        <Text style={styles.title}>{title}</Text>
        {
          rightText ? <Text>{rightText}</Text> : null
        }
      </View>

      <Image style={styles.right} source={require('../../assets/image/right.png')} />
    </TouchableOpacity>
  )
}

const styles = StyleSheet.create({
  title: {
    marginLeft: 12,
    color: '#333333',
  },
  center: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  right: {
    width: 8,
    height: 8,
    marginLeft: 12,
  },
  left: {
    width: 22,
    height: 22,
  },
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    padding: 14,

  },
})
