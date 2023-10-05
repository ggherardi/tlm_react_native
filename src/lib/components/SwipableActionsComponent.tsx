import React from 'react';
import { Animated, StyleSheet } from 'react-native';
import { RectButton } from 'react-native-gesture-handler';
import { InputSideButton } from './InputSideButtonComponent';
import { IconProp } from '@fortawesome/fontawesome-svg-core';
import { ThemeColors } from '../GlobalStyles';

export const renderRightAction = (text: string, icon: IconProp, color: string, action: Function, swipableRef: any) => {
  const pressHandler = () => {
      swipableRef.current?.close();            
  };
  return (
      <Animated.View style={{ flex: 1, transform: [{ translateX: 0 }] }}>
          <RectButton
              style={[styles.rightAction, { backgroundColor: color }]}
              onPress={pressHandler}>
              <InputSideButton text={text} fontSize={10} textPosition={'bottom'} icon={icon} pressFunction={action} iconColor={ThemeColors.white} stretchHeight={true} />
          </RectButton>
      </Animated.View>
  );
};

const styles = StyleSheet.create({
  rightAction: {
      alignItems: 'center',
      flex: 1,
      justifyContent: 'center',
  },
});