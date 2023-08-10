import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { Button, NativeBaseProvider } from 'native-base';
import React, { useState } from 'react';
import { Text, ScrollView, Modal, Alert } from 'react-native';
import GlobalStyles from './lib/GlobalStyles';
import NewEvent from './NewEvent';

const Home = ({ navigation }: any) => {
  const goToNewEvent = () => {
    navigation.navigate('NewEvent');
  }

  return (
    <NativeBaseProvider>
      <ScrollView>
        <Text>Ciao, questa è la home</Text>
        <Button onPress={() => goToNewEvent()} style={[GlobalStyles.selfCenter, GlobalStyles.mt25]}>Nuovo evento</Button>
      </ScrollView>
    </NativeBaseProvider>
  );
};

export default Home;
