import { IconProp } from '@fortawesome/fontawesome-svg-core';
import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome';
import { Box, Icon } from 'native-base';
import React from 'react';
import { Pressable, StyleSheet, Text, View } from 'react-native';
import GlobalStyles, { ThemeColors } from '../GlobalStyles';
import { Utility } from '../Utility';

interface IInputSideButtonProps {
  pressFunction: Function;
  icon: IconProp;
  iconColor?: string;
  iconStyle?: any;
  stretchHeight?: boolean;
  text?: string;
  size?: number;
  isDisabled?: boolean;
}

export const InputSideButton = ({ pressFunction, icon, iconColor = ThemeColors.primary, iconStyle, stretchHeight, text, size, isDisabled = false }: IInputSideButtonProps) => (
  <Pressable onPress={() => pressFunction()} style={({ pressed }) => [{
    opacity: pressed ? 0.2 : 1,
    height: stretchHeight ? "100%" : "auto"
  }, styles.btnBox]} disabled={isDisabled}>
    <View style={[GlobalStyles.flexRow]}>
      {Utility.IsNotNullOrUndefined(text) && (
        <Text style={{ paddingRight: 10 }}>{text}</Text>
      )}
      <FontAwesomeIcon style={[iconStyle ? iconStyle : GlobalStyles.iconPrimary, { color: isDisabled ? 'gray' : iconColor }]} icon={icon} size={size ? size : 20} />
    </View>
  </Pressable>);

const styles = StyleSheet.create({
  btnBox: {
    justifyContent: 'center',
    paddingHorizontal: 15
  }
})