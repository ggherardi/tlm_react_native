import { NativeBaseProvider, Row } from 'native-base';
import React, { useState, useEffect } from 'react';
import { Text, ScrollView, Alert, View, StyleSheet, Dimensions, Image } from 'react-native';
import GlobalStyles from '../lib/GlobalStyles';
import { BusinessEvent } from '../lib/models/BusinessEvent';
import { HomeDataRowComponent } from '../lib/components/HomeDataRowComponent';
import { Utility } from '../lib/Utility';
import dataContext from '../lib/models/DataContext';
import useCustomHeader from '../lib/components/CustomHeaderComponent';
import { Storage } from '../lib/DataStorage';
import NavigationHelper from '../lib/NavigationHelper';
import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome';
import { Images } from '../assets/Images';

const AllEventsScreen = ({ navigation }: any) => {
  const [events, setEvents] = useState(dataContext.Events.getAllData());
  const [appHeight, setAppHeight] = useState(Dimensions.get('window').height);

  // @ts-ignore
  const Context = React.createContext();

  useEffect(() => {
    useCustomHeader(navigation.getParent(), "Tutti gli eventi");
  });

  useEffect(() => {
    NavigationHelper.setHomeTabNavigation(navigation);
  }, []);

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
      {events && events.length ? (
        <ScrollView contentContainerStyle={[GlobalStyles.container]}>
          {events != undefined && events.length > 0 && events.map((event: BusinessEvent, index: number) => (
            <>
              {index == 0 && (
                <Row key={`row-${index}`}>
                  <View style={[styles.headerView, { flex: 2 }]}>
                    <Text style={[styles.headerText]}>Stato</Text>
                  </View>
                  <View style={[styles.headerView, { flex: 2 }]}>
                    <Text style={[styles.headerText]}>Date</Text>
                  </View>
                  <View style={[styles.headerView, { flex: 12, paddingLeft: 3 }]}>
                    <Text style={[styles.headerText]}>Evento</Text>
                  </View>
                  <View style={[styles.headerView, { flex: 5 }]}>
                    <Text style={[styles.headerText]}>Totale rimborso</Text>
                  </View>
                </Row>
              )}
              <HomeDataRowComponent key={`homedatarow_${index}`} event={event} onDelete={refreshData} navigation={navigation} index={index} />
            </>
          ))}
        </ScrollView>
      ) : (
        <Context.Provider value={appHeight}>
          <View style={{ flex: 1, padding: 10 }} onLayout={(e) => setAppHeight(e.nativeEvent.layout.height)}>
            <Image source={Images.empty_list.rnSource} style={{ alignSelf: 'center' }} />
            <Text style={[styles.text]}>La tua lista di eventi è vuota!</Text>
          </View>
          <View style={{ justifyContent: 'flex-end' }}>
            <Text style={[styles.text]}>Crea un nuovo evento</Text>
            <FontAwesomeIcon icon={'arrow-down-long'} size={50} color={"gray"} style={{ alignSelf: 'center', marginVertical: 10 }} />
          </View>
        </Context.Provider>
      )}
    </NativeBaseProvider>
  );
};

const styles = StyleSheet.create({
  text: {
    verticalAlign: 'middle',
    textAlign: 'center',
    fontSize: 15,
  },
  headerView: {
    fontSize: 30,
    justifyContent: 'center',
    // marginHorizontal: 1
  },
  headerText: {
    fontSize: 10,    
  }
});

export default AllEventsScreen;
