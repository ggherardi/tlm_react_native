import { IconProp } from '@fortawesome/fontawesome-svg-core';
import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome';
import { Box, Icon } from 'native-base';
import React from 'react';
import { Pressable, StyleSheet, Text } from 'react-native';
import GlobalStyles from '../GlobalStyles';

interface IInputSideButtonProps {
  pressFunction: Function;
  icon: IconProp;
  iconStyle?: any;
  stretchHeight?: boolean;
}

export const InputSideButton = ({ pressFunction, icon, iconStyle, stretchHeight }: IInputSideButtonProps) => (
  <Pressable onPress={() => pressFunction()} style={({ pressed }) => [{ opacity: pressed ? 0.2 : 1, height: stretchHeight ? "100%" : "auto" }, styles.btnBox]}>
    <FontAwesomeIcon style={[iconStyle ? iconStyle : GlobalStyles.iconPrimary]} icon={icon} />
  </Pressable>
);

const styles = StyleSheet.create({
  btnBox: {
    justifyContent: 'center',
    paddingHorizontal: 15
  }
})