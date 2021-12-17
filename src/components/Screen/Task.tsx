import React from "react";
import { Image, ImageBackground, StyleSheet, Text, View } from "react-native";
import { screenWidth } from "src/utils/constants";
import LinearGradinet from 'react-native-linear-gradient';
import { Sat, Task } from "src/typings/api";

interface IProps {
  item: Task,
  sat: Sat
}

export default function TaskCard({ item, sat }: IProps) {

  return (

    <LinearGradinet colors={['#F4C969', '#F7D3A0']} start={{ x: 0, y: 0 }} end={{ x: 1, y: 0 }} style={styles.container}>

      <LinearGradinet colors={['#FDE4A7', '#FFFBDE']} start={{ x: 0, y: 0 }} end={{ x: 1, y: 0 }} style={styles.top} >
        <Text >{item.name}</Text>
      </LinearGradinet>
      <Image style={styles.logo} resizeMode="center" source={require("../../assets/image/tasklogo.png")} />

      <View style={styles.content}>
        <Text style={{ color: "#000000FF", fontSize: 14, fontWeight: "600", }} numberOfLines={3}>
          {
            item.type == 1 &&
            `邀请${item.target}个人注册App, 奖励${item.prizeVal}`
          }
          {
            item.type == 2 &&
            `团队消费达到${item.target}, 奖励消费金额的${item.prizeVal}%`
          }
        </Text>
      </View>

      <View style={styles.earnings}>
        <Image style={styles.coin} source={require("../../assets/image/coin.png")} />
        {item.type == 1 && <Text style={styles.text}>{item.prizeVal}</Text>}
        {item.type == 2 && <Text style={styles.text}>{item.target * item.prizeVal / 100}</Text>}
      </View>

      <View style={styles.count}>
        {
          item.type == 1 &&
          <Text style={styles.text}>{sat.recommendUsers > item.target ? item.target : sat.recommendUsers}/{item.target}</Text>
        }
        {
          item.type == 2 &&
          <Text style={styles.text}>{sat.teamConsumer > item.target ? item.target : sat.teamConsumer}/{item.target}</Text>
        }
      </View>

      {
        item.userStatus != 2 &&
        <View style={[styles.recharge, { backgroundColor: item.userStatus == 1 ? '#55C1F0' : '#F76600' }]}>
          <Text style={{ color: "#ffffff", fontSize: 13, }}>{item.userStatus == 1 ? '领取' : '做任务'}</Text>
        </View>
      }


      {item.userStatus == 2 && <Image style={styles.off} source={require("../../assets/image/yiwancheng.png")} />}

    </LinearGradinet>


    // <ImageBackground style={styles.container} source={require("../../assets/image/bgtask.png")} >

    //   <Text style={styles.top}>Task 1</Text>
    //   <Image style={styles.logo} resizeMode="center" source={require("../../assets/image/tasklogo.png")} />
    //   <View style={styles.recharge}>
    //     <Text style={{ color: "#ffffff" }}>Recharge</Text>
    //   </View>
    //   <View style={styles.content}>
    //     <Text style={{ color: "#000000FF", fontSize: 14, fontWeight: "600", }} numberOfLines={3}>5 people are invited and the total recharge reaches 1500, 3% of the recharge amount will be rewarded</Text>
    //   </View>

    //   <View style={styles.earnings}>
    //     <Image style={styles.coin} source={require("../../assets/image/coin.png")} />
    //     <Text style={styles.text}>+7%</Text>
    //   </View>

    //   <View style={styles.count}>
    //     <Text style={styles.text}>0/1</Text>
    //   </View>

    // </ImageBackground>

  )


}

const styles = StyleSheet.create({
  off: {
    width: 70,
    height: 70,
    position: "absolute",
    right: 15,
  },
  text: {
    color: "#999999"
  },
  coin: {
    width: 14,
    height: 12,
    marginRight: 3,
  },
  count: {
    position: "absolute",
    right: 106,
    bottom: 6,
  },
  earnings: {
    alignItems: "center",
    flexDirection: "row",
    position: "absolute",
    left: 68,
    bottom: 6,
  },
  content: {
    position: "absolute",
    top: 11,
    left: 68,
    right: 38,
    bottom: 28,
    alignItems: "flex-start",
    justifyContent: "center",

  },
  recharge: {
    paddingLeft: 10,
    paddingRight: 10,
    width: 68,
    height: 20,
    alignItems: "center",
    justifyContent: "center",
    borderRadius: 14,
    position: "absolute",
    right: 11,
    bottom: 8,
  },
  image: {},
  logo: {
    width: 40,
    height: 40,
    position: "absolute",
    left: 9,
    bottom: 16,
  },
  top: {
    position: "absolute",
    top: 0,
    left: 0,
    padding: 2,
    paddingLeft: 5,
    paddingRight: 5,
    borderBottomRightRadius: 6,
  },
  container: {
    backgroundColor: "#55C1F0",
    width: screenWidth - 32,
    marginLeft: 16,
    marginRight: 16,
    borderRadius: 10,
    overflow: "hidden",
    height: 90,
    alignItems: "center",
    justifyContent: "flex-end",
    marginBottom: 12,
    position: 'relative',
  },
})
