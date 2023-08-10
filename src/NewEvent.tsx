import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome';
import DateTimePicker from '@react-native-community/datetimepicker';
import { FormControl, Input, NativeBaseProvider, Button, HStack, Alert } from 'native-base';
import React, { useState } from 'react';
import { View, Text, StyleSheet, TextInput, Pressable } from 'react-native';
import { InputSideButton } from './lib/components/GenericComponents';
import DataStorage, { SaveConstants, Storage } from './lib/DataStorage';
import GlobalStyles from './lib/GlobalStyles';
import { BusinessEvent } from './lib/models/Event';
import { Utility } from './lib/Utility';

interface INewEventProps {
  onClose: Function;
}

const NewEvent = ({ onClose }: INewEventProps) => {
  let formData: any = {};

  const handleEventNameChange = (e: any) => {
    setEventName(e.nativeEvent.text);
  };

  const saveEvent = () => {
    let event: BusinessEvent = new BusinessEvent();
    event.name = eventName;
    event.startDate = eventStartDate;
    event.endDate = eventEndDate;
    Storage.save(SaveConstants.events.key, JSON.stringify(event));
  };

  const test = () => {
    setEvents(Storage.load(SaveConstants.events.key));
  }

  const [events, setEvents] = useState('')
  const [eventName, setEventName] = useState('');
  const [showDateTimePicker, setShowDateTimePicker] = useState(false);
  const [eventStartDate, setEventStartDate] = useState('');
  const [eventEndDate, setEventEndDate] = useState('');
  const [setDateFunction, setSetDateFunction] = useState('');

  return (
    <NativeBaseProvider>
      <View style={styles.container}>
        <Text style={[styles.title, GlobalStyles.mt25, GlobalStyles.colorPrimary]}>Crea nuovo evento</Text>
        <FormControl style={GlobalStyles.mt15} isRequired>
          <FormControl.Label>Nome dell'evento</FormControl.Label>
          <Input placeholder="Nome evento" onChange={handleEventNameChange}></Input>
        </FormControl>
        <FormControl style={GlobalStyles.mt15} isRequired>
          <FormControl.Label>Data di inizio dell'evento</FormControl.Label>
          <Input
            placeholder="gg/mm/aaaa"
            value={eventStartDate}
            onChange={handleEventNameChange}
            InputLeftElement={
              <InputSideButton
                icon="calendar-day"
                iconStyle={GlobalStyles.iconPrimary}
                pressFunction={() => {
                  setShowDateTimePicker(true);
                  setSetDateFunction('setEventStartDate');
                }}
              />
            }
          />
        </FormControl>
        <FormControl style={GlobalStyles.mt15} isRequired>
          <FormControl.Label>Data di fine dell'evento</FormControl.Label>
          <Input
            placeholder="gg/mm/aaaa"
            value={eventEndDate}
            onChange={handleEventNameChange}
            InputLeftElement={
              <InputSideButton
                icon="calendar-day"
                iconStyle={GlobalStyles.iconPrimary}
                pressFunction={() => {
                  setShowDateTimePicker(true);
                  setSetDateFunction('setEventEndDate');
                }}
              />
            }
          />
        </FormControl>
        {showDateTimePicker && (
          <DateTimePicker
            mode="date"
            display="spinner"
            value={new Date()}
            onChange={(event, date) => {
              const func = setDateFunction == 'setEventEndDate' ? setEventEndDate : setEventStartDate;
              func(Utility.FormatDateDDMMYYYY(date));
              setShowDateTimePicker(false);
            }}
          />
        )}
        <HStack space={2} justifyContent="center" style={GlobalStyles.mt15}>
          <Button onPress={() => saveEvent()} style={[GlobalStyles.btnPrimary, GlobalStyles.selfCenter, GlobalStyles.mt25]}>
            Salva
          </Button>
          <Button onPress={() => onClose()} style={[GlobalStyles.btnPrimary, GlobalStyles.selfCenter, GlobalStyles.mt25]}>
            Annulla
          </Button>
        </HStack>
        <Button onPress={() => test()} style={[GlobalStyles.btnPrimary, GlobalStyles.selfCenter, GlobalStyles.mt25]}>
          Annulla
        </Button>
        <Text>{events}</Text>
      </View>
    </NativeBaseProvider>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'flex-start',
    alignItems: 'center',
    margin: 10,
    marginTop: 100,
    marginBottom: 100,
    padding: 20,
    backgroundColor: 'white',
  },
  title: {
    fontSize: 30,
  },
});

export default NewEvent;
