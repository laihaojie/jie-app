import React from "react";
import { Image, StyleSheet, Text, View } from "react-native";
import { screenWidth } from "src/utils/constants";

interface Iprops {
  isShowMessage?: boolean
}

export default function AlreadyLoggedCard({ isShowMessage }: Iprops) {




  return (
    <View style={[styles.container, { marginBottom: isShowMessage ? 0 : 12 }]}>
      <View style={styles.user}>
        <Image
          style={styles.avatar}
          source={{ uri: "https://s.lingman.tech/dev/uploadfiles/20210329/in7XKDtn5GaFPFArytwNxYj6QPAWdNyd.png" }}
        />
        <Text style={styles.mobile}>138****1216</Text>
        <Image
          style={styles.level}
          source={require("../../assets/image/level10.png")}
        />
        {
          isShowMessage ?
            <Image
              style={styles.message}
              source={require("../../assets/image/message.png")}
            /> : null
        }

      </View>

      <View style={styles.info}>
        <View style={styles.left}>
          <Text style={styles.top}>Total assets</Text>
          <Text style={styles.money}>Rs 34000</Text>
        </View>
        <View style={styles.right}>
          <Text style={styles.top}>Yesterday's Earnings</Text>
          <Text style={styles.money}>Rs +340</Text>
        </View>
      </View>

    </View>
  )
}

const styles = StyleSheet.create({
  message: {
    position: "absolute",
    width: 25,
    height: 25,
    right: 20,
  },
  top: {
    color: "#DEF3FC",
    fontSize: 13,
  },
  money: {
    color: "#F8FDFE",
    fontSize: 22,
  },
  left: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
  },
  right: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
  },
  info: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-around",
    marginBottom: 10,
  },
  level: {
    width: 38,
    height: 18,
  },
  mobile: {
    fontSize: 22,
    color: "#FBFDFE",
    marginLeft: 7,
    marginRight: 12,
  },
  avatar: {
    width: 33,
    height: 33,
  },
  user: {
    flexDirection: "row",
    alignItems: "center",
    width: "100%",
    paddingLeft: 25,
    marginBottom: 20,
    position: "relative",
  },
  container: {
    backgroundColor: "#55C1F0",
    width: screenWidth,
    height: 160,
    alignItems: "center",
    justifyContent: "flex-end",
    // marginBottom: 12,
  },
})
