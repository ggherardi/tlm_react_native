import { Button, NativeBaseProvider } from 'native-base';
import React, { useState } from 'react';
import { Text, ScrollView } from 'react-native';
import GlobalStyles from '../lib/GlobalStyles';
import { BusinessEvent } from '../lib/models/BusinessEvent';
import { HomeDataRowComponent } from '../lib/components/HomeDataRowComponent';
import { Utility } from '../lib/Utility';
import dataContext from '../lib/models/DataContext';
import { Constants } from '../lib/Constants';
import useCustomHeader from '../lib/components/CustomHeaderComponent';

const HomeScreen = ({ navigation }: any) => {
  // useCustomHeader(navigation, "Tutti gli eventi");
  
  const goToNewEvent = () => {
    navigation.navigate(Constants.Navigation.NewEvent);
  };

  const refreshData = () => {
    dataContext.Events.refreshData();
    setEvents(dataContext.Events.getAllData());
  };

  Utility.RefreshScreen({
    navigation: navigation, refreshFunc: () => {
      refreshData();
    }
  });

  const [events, setEvents] = useState(dataContext.Events.getAllData());

  return (
    <NativeBaseProvider>
      <ScrollView contentContainerStyle={{ backgroundColor: 'white' }}>
        {events && events.length ? events.map((event: BusinessEvent, index: number) => (
          <HomeDataRowComponent key={`homedatarow_${index}`} event={event} onDelete={refreshData} navigation={navigation} index={index} />
        )) : (
          <Text>Nessun evento trovato</Text>)}
        <Button onPress={() => goToNewEvent()} style={[GlobalStyles.selfCenter, GlobalStyles.mt25]}>Nuovo evento</Button>
      </ScrollView>
    </NativeBaseProvider>
  );
};

export default HomeScreen;
