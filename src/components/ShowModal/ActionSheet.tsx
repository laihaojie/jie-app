

import React, { FC, useEffect, useState } from "react";
import { Image, ImageBackground, Modal, StatusBar, StyleSheet, Text, TouchableOpacity, View } from "react-native";
import { LinearProgress } from "react-native-elements";
import Icon from "react-native-vector-icons/AntDesign";
import { screenHeight, screenWidth } from "src/utils/constants";
import { navigate } from "src/utils/navigationService";

interface IProps {
  onClose: Function,
  list: { title: string, onPress: Function }[]
}

export default function ActionSheet({ onClose, list }: IProps) {
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
        {
          list?.map((item, idx) => (
            <TouchableOpacity
              key={idx}
              style={[styles.item, list.length != idx - 1 && { borderBottomWidth: 1 }]}
              activeOpacity={0.8}
              onPress={() => item.onPress()}
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
  modalView: {
    width: screenWidth,
    height: screenHeight,
    backgroundColor: "rgba(0,0,0,0.7)",
    alignItems: "center",
    justifyContent: "center",
  },
})


