import React from "react";
import { Image, ImageBackground, ScrollView, StyleSheet, Text, View, } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { screenWidth } from "src/utils/constants";
import LinearGradinet from 'react-native-linear-gradient';
import Header from "src/components/Header/Header";
import { navigate } from "src/utils/navigationService";


function WithdrawalScreen() {

  return (
    <SafeAreaView>
      <Header title="Withdrawal" />
      <ScrollView>
        <View style={styles.container}>
          <Text style={styles.topText}>您当前的可提现最小金额为：<Text style={{ color: "#FF0000" }}>1000</Text></Text>
        </View>

        <ImageBackground style={styles.bgc} resizeMode="stretch" source={require("../../assets/image/withdrawal_bgc.png")} >

          <View style={styles.topBox}>
            <Text style={styles.vText}>您的VIP等级最小提现额度为</Text>
            <Text style={styles.minPrice} onPress={() => navigate('DetailScreen')}>1000</Text>
            <Text style={styles.fText}>您想快速提现可以选择以下几种方式</Text>
          </View>

          <LinearGradinet colors={['#F75818', '#FBCC7F']} style={styles.list}>
            <Image style={styles.coin} source={require("../../assets/image/bgccoin.png")} />
            <View style={styles.item}>
              <View style={styles.top}>
                <Text style={styles.title}>升级VIP</Text>
              </View>
              <View style={styles.info}>
                <Image style={styles.logo} source={require("../../assets/image/activeproduct.png")}></Image>
                <Text style={styles.center}>每个VIP的最低提现额度都不同， 并且每天的红包收益也不同</Text>
                <Text style={styles.right}>购买VIP</Text>
              </View>
            </View>
            <View style={[styles.item, { marginBottom: 14, marginTop: 14, }]}>
              <View style={styles.top}>
                <Text style={styles.title}>升级VIP</Text>
              </View>
              <View style={styles.info}>
                <Image style={styles.logo} source={require("../../assets/image/activeproduct.png")}></Image>
                <Text style={styles.center}>每个VIP的最低提现额度都不同， 并且每天的红包收益也不同</Text>
                <Text style={styles.right}>购买VIP</Text>
              </View>
            </View>
            <View style={styles.item}>
              <View style={styles.top}>
                <Text style={styles.title}>升级VIP</Text>
              </View>
              <View style={styles.info}>
                <Image style={styles.logo} source={require("../../assets/image/activeproduct.png")}></Image>
                <Text style={styles.center}>每个VIP的最低提现额度都不同， 并且每天的红包收益也不同</Text>
                <Text style={styles.right}>购买VIP</Text>
              </View>
            </View>

          </LinearGradinet>

        </ImageBackground>
      </ScrollView>
    </SafeAreaView>

  );
}

const styles = StyleSheet.create({
  info: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",

    borderTopWidth: 1,
    borderTopColor: "#E5E5E5",
    height: 70,
  },
  right: {
    fontSize: 18,
    fontWeight: "bold",
    color: "#FF0000",
    marginRight: 14,
    marginLeft: 5,
  },
  center: {
    flex: 1,
    fontSize: 13,
    color: "#010101",
    lineHeight: 20,
  },
  logo: {
    width: 36,
    height: 36,
    marginLeft: 18,
    marginRight: 18,
  },
  item: {
    marginLeft: 10,
    marginRight: 10,

    backgroundColor: "#fff",
    borderRadius: 6,
  },
  title: {
    fontSize: 18,
    fontWeight: "bold",
    color: "#010101",
  },
  top: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    padding: 10,
  },
  coin: {
    position: "absolute",
    zIndex: 1,
    width: 86,
    height: 100,
    right: -20,
    top: -58,
  },
  list: {
    paddingTop: 10,
    paddingBottom: 10,
    width: screenWidth - 32,
    marginRight: 16,
    marginLeft: 16,
    borderRadius: 10,
    marginBottom: 100,
    position: "relative",
  },
  vText: {
    color: "#FAE7D8",
    fontSize: 22,
    fontWeight: 'bold',
    marginTop: 60,
  },
  fText: {
    color: "#FAE7D8",
    fontSize: 22,
    marginBottom: 50,
  },
  minPrice: {
    color: "#FAE7D8",
    fontSize: 91,
    fontWeight: 'bold',
  },
  topBox: {
    width: "100%",
    alignItems: "center",

  },
  bgc: {
    width: screenWidth,
    minHeight: 700
  },
  topText: {
    marginTop: 18,
    marginBottom: 18,
    marginLeft: 35,
    color: "#333333",
  },
  container: {

  }
})

export default WithdrawalScreen
