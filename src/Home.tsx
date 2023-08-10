import { Button, NativeBaseProvider } from 'native-base';
import React, { useState } from 'react';
import { Text, ScrollView, Modal, Alert } from 'react-native';
import GlobalStyles from './lib/GlobalStyles';
import { SaveConstants, Storage } from './lib/DataStorage';
import { BusinessEvent } from './lib/models/Event';
import { HomeDataRow } from './lib/components/HomeDataRow';
import { Utility } from './lib/Utility';

const Home = ({ navigation }: any) => {
  const goToNewEvent = () => {
    navigation.navigate('NewEvent');
  }

  Utility.RefreshScreen({ navigation: navigation, refreshFunc: () => { setEvents(Storage.load(SaveConstants.events.key)); } });

  const [events, setEvents] = useState(Storage.load(SaveConstants.events.key) as BusinessEvent[]);

  return (
    <NativeBaseProvider>
      <ScrollView>
        {events && events.length ? events.map((event: BusinessEvent, index: number) => (
          <HomeDataRow event={event} onPress={() => { }} index={index} />
        )) : (
          <Text>Nessun evento trovato</Text>)}
        <Button onPress={() => goToNewEvent()} style={[GlobalStyles.selfCenter, GlobalStyles.mt25]}>Nuovo evento</Button>
      </ScrollView>
    </NativeBaseProvider>
  );
};

export default Home;
