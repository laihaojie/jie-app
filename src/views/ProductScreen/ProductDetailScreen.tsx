import { NativeStackHeaderProps } from "@react-navigation/native-stack";
import React, { FC, useState } from "react";
import { ImageBackground, ScrollView, StyleSheet, Text, View } from "react-native";
import { connect, useDispatch } from "react-redux"
import { Button, Input } from 'react-native-elements'

import { SafeAreaView } from "react-native-safe-area-context";
import SuperMarket from "src/components/Screen/SuperMarket";

export default function ProductDetailScreen() {


  return (
    <SafeAreaView style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }} edges={['top', 'left', 'right']}>
      <ScrollView>

        <Text>ProductDetail</Text>


      </ScrollView>
    </SafeAreaView>

  );
}



const styles = StyleSheet.create({
  banner: {
    height: 200,
    flex: 1,
    marginBottom: 16,
  },
})

