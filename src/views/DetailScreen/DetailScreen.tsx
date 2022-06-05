import { NativeStackHeaderProps } from "@react-navigation/native-stack";
import React, { FC } from "react";
import { Text, View } from "react-native";
import { useSelector } from "react-redux"
import { Button } from 'react-native-elements'
import { selectToken } from "src/store/selectors";
import { navigate } from "src/utils/navigationService";

const DetailsScreen: FC<NativeStackHeaderProps> = () => {
  const token = useSelector(selectToken)
  return (
    <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
      <Text>Details Screen</Text>
      <Button title="按钮1" onPress={() => navigate('HomeScreen')} />
      {/* <Input
        placeholder='INPUT WITH ICON'
        leftIcon={<Text>De</Text>}
      /> */}
      <Text>{token}</Text>
    </View>
  );
}

export default DetailsScreen