import React, { useEffect, useState } from 'react'
import { Modal, StatusBar, StyleSheet, TouchableOpacity } from 'react-native'
import { screenHeight, screenWidth } from 'src/utils/constants'

interface IProps {
  onClose: Function
  children?: React.ReactChild
}

export default function ShowModal({ children, onClose }: IProps) {
  const [modalVisible, setModalVisible] = useState(true)
  useEffect(() => {
    if (!modalVisible)
      onClose(false)
  }, [modalVisible])

  return (
    <Modal
      animationType="none"
      transparent={true}
      visible={modalVisible}
      onRequestClose={() => {
        setModalVisible(!modalVisible)
      }}
    >
      <StatusBar translucent={true} backgroundColor="rgba(0,0,0,0.7)" />
      <TouchableOpacity style={styles.modalView} onPress={() => setModalVisible(!modalVisible)}>
        {children}
      </TouchableOpacity>
    </Modal >

  )
}

const styles = StyleSheet.create({
  modalView: {
    width: screenWidth,
    height: screenHeight,
    backgroundColor: 'rgba(0,0,0,0.7)',
    alignItems: 'center',
  },
})
