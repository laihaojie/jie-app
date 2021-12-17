
import React from "react";
import { Image, ImageBackground, StyleSheet, Text, TouchableOpacity, View } from "react-native";
import { screenWidth } from "src/utils/constants";
import Icon from "react-native-vector-icons/AntDesign"
import { LinearProgress } from "react-native-elements";
import { navigate } from "src/utils/navigationService";

export default function SuperMarket() {

  return (

    <TouchableOpacity style={styles.container} activeOpacity={1} onPress={() => navigate("ProductDetailScreen")}>
      <View style={styles.top}>
        <Text style={styles.title}>孟买云樱路超市</Text>
        <Text style={styles.topRight}>正在认筹 </Text>
      </View>
      <Text style={styles.date}>发布日期：19：18·21  Dec 21</Text>

      <View style={styles.info}>
        <Image style={styles.cover} resizeMode="stretch" source={require('../../assets/image/market.png')} />

        <View style={styles.content}>
          <View style={{ flexDirection: "row", flex: 1, }}>
            <View style={styles.item}>
              <Text style={styles.text}>单价</Text>
              <Text style={styles.num}>$100</Text>
            </View>
            <View style={styles.item}>
              <Text style={styles.text}>总回报率</Text>
              <Text style={styles.num}>80%</Text>
            </View>
          </View>
          <View style={{ flexDirection: "row", flex: 1, }}>
            <View style={styles.item}>
              <Text style={styles.text}>总回报金额</Text>
              <Text style={styles.num}>100</Text>
            </View>
            <View style={styles.item}>
              <Text style={styles.text}>认购周期</Text>
              <Text style={styles.num}>100</Text>
            </View>
          </View>
          <Text style={{ fontSize: 13, color: "#999" }}>结算方式：<Text style={{ fontSize: 13, color: "#333" }}>每日结算奖励，到期结算本金</Text></Text>
        </View>
      </View>

      <View style={styles.bottomBox}>
        <View style={styles.bLeft}>
          <Text style={{ fontSize: 13, color: "#999", marginBottom: 5, }}>总份数：<Text style={{ color: "#FF0000" }}>22</Text></Text>
          <View style={{ flexDirection: "row", width: 120, alignItems: "center", }}>
            <Text>已筹认</Text>
            <LinearProgress style={{ flex: 1, borderRadius: 2 }} color="#55C1F0" variant="determinate" value={0.7} />
            <Text>70</Text>
          </View>
        </View>

        <View style={styles.bRight}>
          <TouchableOpacity style={styles.btnL} >
            <Text style={{ color: "#fff", fontSize: 13 }}>立即购买</Text>
          </TouchableOpacity>
          {/* <TouchableOpacity style={styles.btnR} >
            <Text style={{ color: "#333333", fontSize: 13 }}>查看详情</Text>
          </TouchableOpacity> */}
        </View>
      </View>


    </TouchableOpacity>



  )


}

const styles = StyleSheet.create({
  btnL: {
    borderWidth: 1,
    borderColor: "#F76600",
    backgroundColor: "#F76600",
    height: 26,
    borderRadius: 13,
    alignItems: "center",
    justifyContent: "center",
    paddingLeft: 40,
    paddingRight: 40,
    marginRight: 30,
  },
  btnR: {
    borderWidth: 1,
    borderColor: "#333333",
    height: 26,
    borderRadius: 13,
    alignItems: "center",
    justifyContent: "center",
    paddingLeft: 10,
    paddingRight: 10,
    marginLeft: 20,
  },
  bRight: {
    flex: 1,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "flex-end",
  },
  bLeft: {
    flex: 1,

  },
  bottomBox: {
    flexDirection: "row",
    marginTop: 10,
  },
  item: {
    flex: 1,
    alignItems: "flex-start",
  },
  text: {
    color: "#999",
  },
  num: {
    color: "#FF0000",
  },
  content: {
    flex: 1,
    paddingLeft: 20,
  },
  cover: {
    width: 110,
    height: 110,
    borderRadius: 10,
  },
  info: {
    flexDirection: "row",
    marginTop: 10,
    height: 130,
  },
  date: {
    color: "#999999",
    fontSize: 13,
    marginTop: 5,
  },
  topRight: {
    color: "#55C1F0",
  },
  title: {
    fontSize: 18,
    fontWeight: "bold",
    color: "#333333",
  },
  top: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",

  },

  container: {
    width: screenWidth - 32,
    marginLeft: 16,
    marginRight: 16,
    borderRadius: 10,
    marginBottom: 12,
    borderWidth: 1,
    padding: 10,
    borderColor: "#E5E5E5",
  },
})
