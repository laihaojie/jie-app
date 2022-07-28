import React, { useEffect, useState } from 'react'
import { Modal, StatusBar, StyleSheet, Text, View } from 'react-native'
import { screenHeight, screenWidth } from 'src/utils/constants'

interface IProps {
  onClose: Function
  progress: number
}
const progressWidth = screenWidth - 32 - 30 - 40
export default function ProgressModal({ onClose, progress }: IProps) {
  const [modalVisible, setModalVisible] = useState(true)
  useEffect(() => {
    if (!modalVisible || progress >= 100)
      onClose(false)
  }, [modalVisible, progress])

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
      <View style={styles.modalView}>
        <View style={styles.box}>
          <Text style={styles.title}>下载进度</Text>
          <View style={styles.lineBox}>
            <View style={{ height: 5, width: progressWidth, backgroundColor: '#ccc', borderRadius: 2 }}>
              <View style={{ height: 5, backgroundColor: '#027AFF', borderRadius: 2, width: (progress / 100) * progressWidth }}></View>
            </View>
            {/* <LinearProgress style={styles.line} color="primary" variant="determinate" trackColor="#ccc" value={progress / 100} /> */}
            <Text style={styles.number}>{progress}%</Text>
          </View>

        </View>

      </View>
    </Modal >

  )
}

const styles = StyleSheet.create({
  number: {
    fontWeight: 'bold',
    fontSize: 16,
    color: '#333',
    marginLeft: 10,
  },
  line: {
    // marginRight: 10,
    // marginLeft: 10,
    flex: 1,
  },
  title: {
    fontWeight: 'bold',
    fontSize: 16,
    color: '#333',
    // marginLeft: 10,
    // marginTop: 10,
  },
  lineBox: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 10,
  },
  box: {
    width: screenWidth - 32,
    backgroundColor: '#fff',
    borderRadius: 10,
    paddingTop: 20,
    paddingLeft: 15,
    paddingBottom: 20,
    paddingRight: 15,
  },
  modalView: {
    width: screenWidth,
    height: screenHeight,
    backgroundColor: 'rgba(0,0,0,0.7)',
    alignItems: 'center',
    justifyContent: 'center',
  },
})
