
import React from "react";
import { Image, ImageBackground, StyleSheet, Text, View } from "react-native";
import { screenWidth } from "src/utils/constants";
import Icon from "react-native-vector-icons/AntDesign"

export default function NewsCard() {

  return (

    <View style={styles.container}>
      <View style={styles.top}>
        <Text style={styles.title}>News</Text>
        <Text>more <Icon name="doubleright" /> </Text>
      </View>

      {
        new Array(2).fill(1).map((_, i) =>
          <View style={styles.item} key={i}>
            <View style={styles.info}>
              <Text numberOfLines={3} style={styles.text}>High temperature rainfall of 35 ℃
                or above occurred in Jincheng for
                6 consecutive days, cooling and</Text>
              <View style={styles.bottom}>
                <Icon name="eyeo" />
                <Text>1324</Text>
                <Text>1 hour ago </Text>
              </View>
            </View>
            <Image style={styles.cover} source={{ uri: "https://s.lingman.tech/dev/uploadfiles/20211017/ZkShRDitPyXJXG4Ghii547WxJ744x7Gx.png" }} />
          </View>
        )

      }

    </View>



  )


}

const styles = StyleSheet.create({
  text: {
    color: "#333333",

    fontSize: 15,
    fontWeight: "500",
  },
  bottom: {
    flexDirection: "row",
    alignItems: "center",
    position: "absolute",
    bottom: 0
  },
  info: {
    flex: 1,
    marginRight: 30,
    height: "100%",
    position: "relative",
  },
  cover: {
    width: 82,
    height: 82,
  },
  item: {
    borderTopWidth: 1,
    borderTopColor: "#E5E5E5",
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    padding: 15,
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
    width: screenWidth - 32,
    marginLeft: 16,
    marginRight: 16,
    borderRadius: 10,
    marginBottom: 12,
    borderWidth: 1,
    borderColor: "#E5E5E5",
  },
})
