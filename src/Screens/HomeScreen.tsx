import { Button, NativeBaseProvider } from 'native-base';
import React, { useState, useEffect } from 'react';
import { Text, ScrollView, Alert, View, StyleSheet, Dimensions } from 'react-native';
import GlobalStyles from '../lib/GlobalStyles';
import { BusinessEvent } from '../lib/models/BusinessEvent';
import { HomeDataRowComponent } from '../lib/components/HomeDataRowComponent';
import { Utility } from '../lib/Utility';
import dataContext from '../lib/models/DataContext';
import { Constants } from '../lib/Constants';
import useCustomHeader, { useCustomHeaderWithButtonAsync } from '../lib/components/CustomHeaderComponent';
import { Storage } from '../lib/DataStorage';

const HomeScreen = ({ navigation }: any) => {
  const [events, setEvents] = useState(dataContext.Events.getAllData());
    
  useEffect(() => {    
    useCustomHeaderWithButtonAsync(navigation, "Tutti gli eventi", () => { navigation.navigate(Constants.Navigation.UserProfile) }, 'user'); 
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

  return (
    <NativeBaseProvider>
      <ScrollView contentContainerStyle={[GlobalStyles.container]}>
        {events && events.length && events.map ? events.map((event: BusinessEvent, index: number) => (
          <HomeDataRowComponent key={`homedatarow_${index}`} event={event} onDelete={refreshData} navigation={navigation} index={index} />
        )) : (
          <Text>Nessun evento trovato</Text>)}
        <Button onPress={() => goToNewEvent()} style={[GlobalStyles.selfCenter, GlobalStyles.mt25]}>Nuovo evento</Button>        
        <Button onPress={() => deleteAll()} style={[GlobalStyles.selfCenter, GlobalStyles.mt25]}>Delete all data</Button>
      </ScrollView>
    </NativeBaseProvider>
  );
};

export default HomeScreen;
