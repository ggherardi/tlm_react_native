import React from 'react';
import { ActivityIndicator } from 'react-native';
import { ThemeColors } from '../GlobalStyles';

interface ILoaderProps {
  size?: LoaderSize;
}

enum LoaderSize {
  small = "small",
  large = "large"
}

const LoaderComponent = (props: ILoaderProps) => {
  return (
    <ActivityIndicator size={props.size ? props.size : "large"} color={ThemeColors.primary}></ActivityIndicator>
  );
}

export default LoaderComponent;