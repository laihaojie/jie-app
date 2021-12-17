
import React from "react";
import { Image, ImageBackground, StyleSheet, Text, View } from "react-native";
import { screenWidth } from "src/utils/constants";
import Icon from "react-native-vector-icons/AntDesign"

export default function EarningsCard() {

  return (

    <View style={styles.container}>
      <View style={styles.top}>
        <Text style={styles.title}>我的收益</Text>
      </View>

      <View style={styles.content}>

        <View style={styles.item}>
          <Text style={styles.name}>今日收益</Text>
          <Text style={styles.price}>8888.88</Text>
        </View>
        <View style={styles.item}>
          <Text style={styles.name}>今日收益</Text>
          <Text style={styles.price}>8888.88</Text>
        </View>
        <View style={styles.item}>
          <Text style={styles.name}>今日收益</Text>
          <Text style={styles.price}>8888.88</Text>
        </View>
        <View style={styles.item}>
          <Text style={styles.name}>今日收益</Text>
          <Text style={styles.price}>8888.88</Text>
        </View>
        <View style={styles.item}>
          <Text style={styles.name}>今日收益</Text>
          <Text style={styles.price}>8888.88</Text>
        </View>
        <View style={styles.item}>
          <Text style={styles.name}>今日收益</Text>
          <Text style={styles.price}>8888.88</Text>
        </View>
      </View>


    </View>



  )


}
const boxWidth = screenWidth - 32
const styles = StyleSheet.create({
  name: {},
  price: {},
  item: {
    width: boxWidth / 3,
    height: 80,
    alignItems: "center",
    justifyContent: "center",
  },
  content: {
    width: boxWidth,
    borderTopWidth: 1,
    borderTopColor: "#E5E5E5",
    flexWrap: "wrap",
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-around",
  },
  title: {
    fontSize: 18,
    fontWeight: "400",
    color: "#333333",
  },
  top: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    padding: 10,
  },

  container: {
    width: boxWidth,
    marginLeft: 16,
    marginRight: 16,
    borderRadius: 10,
    marginBottom: 12,
    borderWidth: 1,
    borderColor: "#E5E5E5",
    backgroundColor: "#FFFDE8",
  },
})
