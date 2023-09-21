import React from 'react';
import { Input } from 'native-base';
import { KeyboardTypeOptions } from 'react-native';

interface ILoginInputProps {
  defaultValue: string;
  placeholder: string;
  onChange: Function;
  keyboardType?: KeyboardTypeOptions;
}

const LoginInputComponent = (props: ILoginInputProps) => {
  return (
    <Input
      defaultValue={props.defaultValue}      
      placeholder={props.placeholder}
      onChange={(e: any) => props.onChange(e)}
      borderRadius='full'
      backgroundColor={'gray.300'}
      color={'gray.900'}
      keyboardType={props.keyboardType ? props.keyboardType : 'ascii-capable'}></Input>
  );
}

export default LoginInputComponent;