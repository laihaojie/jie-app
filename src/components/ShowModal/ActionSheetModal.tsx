

import React, { useEffect, useState } from "react";
import { Modal, StatusBar, StyleSheet, Text, TouchableOpacity, View } from "react-native";
import { isEmpty } from "src/utils";
import { screenHeight, screenWidth } from "src/utils/constants";

interface IProps {
  onClose: Function,
  list: { title: string, onPress: Function, disabled?: boolean, show?: boolean }[]
  operates?: { title: string, onPress: Function }[]
}

export default function ActionSheetModal({ onClose, list, operates }: IProps) {
  const [modalVisible, setModalVisible] = useState(true);
  useEffect(() => {
    if (!modalVisible) {
      onClose(false)
    }
    return () => setModalVisible(false)
  }, [modalVisible])

  return (
    <Modal
      animationType="none"
      transparent={true}
      visible={modalVisible}
      onRequestClose={() => {
        setModalVisible(!modalVisible);
      }}
    >
      <StatusBar translucent={true} backgroundColor="rgba(0,0,0,0.7)" />

      <View style={{ flex: 1, backgroundColor: "rgba(0,0,0,0.7)", justifyContent: "flex-end", }}>
        <TouchableOpacity style={styles.topEmpty} onPress={() => setModalVisible(false)}>
        </TouchableOpacity>
        {
          list?.map((item, idx) => (
            (item.show ?? true) && <TouchableOpacity
              key={idx}
              disabled={item.disabled ?? false}
              style={[styles.item, list.length != idx - 1 && { borderBottomWidth: 1 }]}
              activeOpacity={0.8}
              onPress={() => {
                item.onPress && item.onPress()
                setModalVisible(false);
              }}
            >
              <Text style={{ color: "#333", fontSize: 16, }}>{item.title}</Text>
            </TouchableOpacity>
          ))
        }
        {!isEmpty(operates) && <View style={{ width: screenWidth, height: 4, backgroundColor: "#e5e5e5" }}></View>}
        {
          operates?.map((item, idx) => (
            <TouchableOpacity
              key={idx}
              style={[styles.item, list.length != idx - 1 && { borderBottomWidth: 1 }]}
              activeOpacity={0.8}
              onPress={() => {
                item.onPress && item.onPress()
                setModalVisible(false);
              }}
            >
              <Text style={{ color: "#333", fontSize: 16, }}>{item.title}</Text>
            </TouchableOpacity>
          ))
        }

      </View>



    </Modal >

  )
}

const styles = StyleSheet.create({
  item: {
    width: screenWidth,
    height: 60,
    backgroundColor: "white",
    alignItems: "center",
    justifyContent: "center",
    borderColor: "#e5e5e5"
  },
  box: {
    width: screenWidth,
    height: 400,
    backgroundColor: "#fff",
    borderTopLeftRadius: 10,
    borderTopRightRadius: 10,
    position: "relative",
  },
  topEmpty: {
    width: "100%",
    height: "100%",
  },
})


