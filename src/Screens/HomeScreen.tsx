import { Button, NativeBaseProvider } from 'native-base';
import React, { useState, useEffect } from 'react';
import { Text, ScrollView, Alert } from 'react-native';
import GlobalStyles from '../lib/GlobalStyles';
import { BusinessEvent } from '../lib/models/BusinessEvent';
import { HomeDataRowComponent } from '../lib/components/HomeDataRowComponent';
import { Utility } from '../lib/Utility';
import dataContext from '../lib/models/DataContext';
import { Constants } from '../lib/Constants';
import useCustomHeader from '../lib/components/CustomHeaderComponent';
import { Storage } from '../lib/DataStorage';
import { EmailManager } from '../lib/EmailManager';

const HomeScreen = ({ navigation }: any) => {
  useEffect(() => {
    useCustomHeader(navigation, "Tutti gli eventi");
  }, []);

  const goToNewEvent = () => navigation.navigate(Constants.Navigation.NewEvent);
  const refreshData = () => setEvents(dataContext.Events.getAllData());
  const deleteAll = () => {
    const onDeleteConfirm = () => {
      Storage.clearAll();
      refreshData();
    }
    Alert.alert("Conferma cancellazione", "Tutti i dati verranno rimossi dal dispositivo.", [
      { text: "Ok", onPress: onDeleteConfirm },
      { text: "Annulla", style: "cancel" }
    ]);
  };

  Utility.OnFocus({ navigation: navigation, onFocusAction: refreshData });

  const [events, setEvents] = useState(dataContext.Events.getAllData());

  return (
    <NativeBaseProvider>
      <ScrollView contentContainerStyle={[GlobalStyles.container]}>
        {events && events.length && events.map ? events.map((event: BusinessEvent, index: number) => (
          <HomeDataRowComponent key={`homedatarow_${index}`} event={event} onDelete={refreshData} navigation={navigation} index={index} />
        )) : (
          <Text>Nessun evento trovato</Text>)}
        <Button onPress={() => goToNewEvent()} style={[GlobalStyles.selfCenter, GlobalStyles.mt25]}>Nuovo evento</Button>
        <Button onPress={() => EmailManager.send('test@test.com', 'Test oggetto', 'test corpo')} style={[GlobalStyles.selfCenter, GlobalStyles.mt25]}>Send email</Button>
        <Button onPress={() => deleteAll()} style={[GlobalStyles.selfCenter, GlobalStyles.mt25]}>Delete all data</Button>
      </ScrollView>
    </NativeBaseProvider>
  );
};

export default HomeScreen;
