import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { Button, NativeBaseProvider } from 'native-base';
import React, { useState } from 'react';
import { Text, ScrollView, Modal, Alert } from 'react-native';
import GlobalStyles from './lib/GlobalStyles';
import NewEvent from './NewEvent';

const Home = ({ navigation }: any) => {
  const [isModalVisible, setIsModalVisible] = useState(false);
  return (
    <NativeBaseProvider>
      <ScrollView>
        <Modal
          visible={isModalVisible}
          transparent={true}
          animationType="slide"
          onRequestClose={() => {
            Alert.alert('Closed!');
            setIsModalVisible(false);
          }}>
          <NewEvent onClose={() => setIsModalVisible(false)} />
        </Modal>
        <Text>Ciao, questa è la home</Text>
        <Button onPress={() => setIsModalVisible(true)} style={[GlobalStyles.btnPrimary, GlobalStyles.selfCenter, GlobalStyles.mt25]}>Nuovo evento</Button>
      </ScrollView>
    </NativeBaseProvider>
  );
};

export default Home;
