import React from "react";
import { StyleSheet, Text, View } from "react-native";
import Icon from "react-native-vector-icons/AntDesign";

export default function BillItem() {
  return (
    <View style={styles.item} >
      <Icon color="red" name="alipay-square" size={23} />
      <View style={styles.center}>
        <Text style={styles.name}>充值服务</Text>
        <Text style={styles.time}>2020.08.08  16:26:08</Text>
      </View>
      <Text style={styles.number}>-10000.00</Text>
    </View>
  )
}

const styles = StyleSheet.create({
  name: {
    color: "#333333",
    fontSize: 18,
  },
  time: {
    color: "#999999",
    fontSize: 13,
  },
  center: {
    flex: 1,
    marginLeft: 10,
  },
  number: {
    color: "#333333",
    fontSize: 18,
  },
  item: {
    borderTopWidth: 1,
    borderTopColor: "#E5E5E5",
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    padding: 15,
  },

})

