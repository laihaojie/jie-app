import { NativeStackHeaderProps } from "@react-navigation/native-stack";
import React, { FC } from "react";
import { Text, View } from "react-native";
import { connect, useDispatch, useSelector } from "react-redux"
import { Button, Input } from 'react-native-elements'
import { useNavigation } from "@react-navigation/core";
import { selectToken } from "src/store/selectors";
import { navigate } from "src/utils/navigationService";

const DetailsScreen: FC<NativeStackHeaderProps> = () => {
  const token = useSelector(selectToken)
  return (
    <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
      <Text>Details Screen</Text>
      <Button title="按钮1" onPress={() => navigate('home')} />
      <Input
        placeholder='INPUT WITH ICON'
        leftIcon={<Text>De</Text>}
      />
      <Text>{token}</Text>
    </View>
  );
}

export default DetailsScreen