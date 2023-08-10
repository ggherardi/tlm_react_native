import React from 'react';
import { Pressable, StyleSheet, Text } from 'react-native';
import GlobalStyles, { ThemeColors } from '../GlobalStyles';

interface ITLMButtonProps {
    title: string;
    onPress: Function;
    buttonType: TLMButtonType
}

export enum TLMButtonType {
    Primary,
    Secondary
}

export const TLMButton = ({ title, onPress, buttonType }: ITLMButtonProps) => {
    let buttonStyle = buttonType == TLMButtonType.Primary ? primaryStyles : secondaryStyles;
    return (
        <Pressable onPress={() => { onPress() }} style={({ pressed }) => [buttonStyle.btn, { opacity: pressed ? 0.2 : 1 }]}>
            <Text style={[buttonStyle.btnText]}>{title}</Text>
        </Pressable>
    )
}

const primaryStyles = StyleSheet.create({
    // Buttons
    btn: {
      // width: '50%',
      // height: '100%',
      borderRadius: 10,
      padding: 20,
      color: '#fff',
      backgroundColor: ThemeColors.primary
    },
    btnText: {
      color: '#fff'
    },
  });

const secondaryStyles = StyleSheet.create({
  btn: {
    width: '50%',
    color: '#fff',
    backgroundColor: ThemeColors.secondary
  },
  btnText: {
    color: '#fff'
  },
});
