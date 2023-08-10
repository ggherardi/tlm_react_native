import { IconProp } from '@fortawesome/fontawesome-svg-core';
import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome';
import { Box, Icon } from 'native-base';
import React from 'react';
import { Pressable, Text } from 'react-native';
import GlobalStyles from '../GlobalStyles';

interface IInputSideButtonProps {
  pressFunction: Function;
  icon: IconProp;
  iconStyle: any;
}

export const InputSideButton = ({ pressFunction, icon, iconStyle }: IInputSideButtonProps) => (
  <Pressable onPress={() => pressFunction()}>
    <Box style={{ padding: 10 }} alignItems={'center'}>
      <FontAwesomeIcon style={GlobalStyles.iconPrimary} icon={icon} />
    </Box>
  </Pressable>
);
