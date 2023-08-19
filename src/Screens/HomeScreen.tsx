import { Button, NativeBaseProvider } from 'native-base';
import React, { useState, useEffect } from 'react';
import { Text, ScrollView } from 'react-native';
import GlobalStyles from '../lib/GlobalStyles';
import { BusinessEvent } from '../lib/models/BusinessEvent';
import { HomeDataRowComponent } from '../lib/components/HomeDataRowComponent';
import { Utility } from '../lib/Utility';
import dataContext from '../lib/models/DataContext';
import { Constants } from '../lib/Constants';
import useCustomHeader from '../lib/components/CustomHeaderComponent';

const HomeScreen = ({ navigation }: any) => {
  useEffect(() => {
    useCustomHeader(navigation, "Tutti gli eventi");
  }, []);

  const goToNewEvent = () => {
    navigation.navigate(Constants.Navigation.NewEvent);
  };

  const refreshData = () => {
    setEvents(dataContext.Events.getAllData());    
  };

  useEffect(() => {
    const unsubscribe = navigation.addListener('focus', () => {
      refreshData();
    });
    return unsubscribe;
  }, [navigation]);


  const [events, setEvents] = useState(dataContext.Events.getAllData());

  return (
    <NativeBaseProvider>
      <ScrollView contentContainerStyle={{ backgroundColor: 'white' }}>
        {events && events.length && events.map ? events.map((event: BusinessEvent, index: number) => (
          <HomeDataRowComponent key={`homedatarow_${index}`} event={event} onDelete={refreshData} navigation={navigation} index={index} />
        )) : (
          <Text>Nessun evento trovato</Text>)}
        <Button onPress={() => goToNewEvent()} style={[GlobalStyles.selfCenter, GlobalStyles.mt25]}>Nuovo evento</Button>
      </ScrollView>
    </NativeBaseProvider>
  );
};

export default HomeScreen;
