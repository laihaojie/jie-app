import { NativeStackHeaderProps } from "@react-navigation/native-stack";
import React, { FC } from "react";
import { Text, View } from "react-native";
import { connect, useDispatch } from "react-redux"
import { Button, Input } from 'react-native-elements'

const HelpScreen: FC<NativeStackHeaderProps> = () => {


  return (
    <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
      <Text>帮助页面 </Text>
    </View>
  );
}

export default HelpScreen
