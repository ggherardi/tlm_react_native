import { Button, NativeBaseProvider } from 'native-base';
import React, { useState } from 'react';
import { Text, ScrollView, Modal, Alert } from 'react-native';
import GlobalStyles from './lib/GlobalStyles';
import { SaveConstants, Storage } from './lib/DataStorage';
import { BusinessEvent } from './lib/models/BusinessEvent';
import { HomeDataRow } from './lib/components/HomeDataRow';
import { Utility } from './lib/Utility';
import { SwipeListView } from 'react-native-swipe-list-view';
import dataContext from './lib/models/DataContext';

const Home = ({ navigation }: any) => {
  const goToNewEvent = () => {
    navigation.navigate('NewEvent');
  }

  Utility.RefreshScreen({
    navigation: navigation, refreshFunc: () => {
      dataContext.Events.refreshData();
      setEvents(dataContext.Events.getAllData());
    }
  });

  const [events, setEvents] = useState(dataContext.Events.getAllData());

  return (
    <NativeBaseProvider>
      <ScrollView contentContainerStyle={{ backgroundColor: 'white' }}>
        {events && events.length ? events.map((event: BusinessEvent, index: number) => (
          <HomeDataRow event={event} onPress={() => { /* Go to event here */ }} index={index} />
        )) : (
          <Text>Nessun evento trovato</Text>)}
        <Button onPress={() => goToNewEvent()} style={[GlobalStyles.selfCenter, GlobalStyles.mt25]}>Nuovo evento</Button>
      </ScrollView>
    </NativeBaseProvider>
  );
};

export default Home;
