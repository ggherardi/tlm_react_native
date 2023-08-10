import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome';
import DateTimePicker from '@react-native-community/datetimepicker';
import { FormControl, Input, NativeBaseProvider, Button, HStack, Alert } from 'native-base';
import React, { useState } from 'react';
import { View, Text, StyleSheet, TextInput, Pressable, TouchableNativeFeedback, TouchableHighlight, ScrollView } from 'react-native';
import { InputSideButton } from './lib/components/GenericComponents';
import DataStorage, { SaveConstants, Storage } from './lib/DataStorage';
import GlobalStyles from './lib/GlobalStyles';
import { BusinessEvent } from './lib/models/Event';
import { Utility } from './lib/Utility';
import { TLMButton, TLMButtonType } from './lib/components/TLMButton';

const NewEvent = ({ navigation }: any) => {
  let formData: any = {};

  const handleEventNameChange = (e: any) => {
    setEventName(e.nativeEvent.text);
  };

  const saveEvent = () => {
    let event: BusinessEvent = new BusinessEvent();
    event.name = eventName;
    event.startDate = eventStartDate;
    event.endDate = eventEndDate;
    setFeedback(events);
    // events.push(event);
    // Storage.save(SaveConstants.events.key, JSON.stringify(events));
  };

  const test = () => {
    setFeedback(Storage.load(SaveConstants.events.key));
  }

  const clean = () => {
    Storage.save(SaveConstants.events.key, JSON.stringify([]))
  }

  const [events, setEvents] = useState(Storage.load(SaveConstants.events.key))
  const [eventName, setEventName] = useState('');
  const [showDateTimePicker, setShowDateTimePicker] = useState(false);
  const [eventStartDate, setEventStartDate] = useState('');
  const [eventEndDate, setEventEndDate] = useState('');
  const [setDateFunction, setSetDateFunction] = useState('');
  const [feedback, setFeedback] = useState('Feedback original state');

  return (
    <NativeBaseProvider>
      <ScrollView contentContainerStyle={styles.container}>
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
          <TLMButton title='Salva' buttonType={TLMButtonType.Primary} onPress={saveEvent}></TLMButton>
        </HStack>
        <Button onPress={() => test()} style={[GlobalStyles.selfCenter, GlobalStyles.mt25]}>
          Check
        </Button>
        <Button onPress={() => clean()} style={[GlobalStyles.selfCenter, GlobalStyles.mt25]}>
          Clean
        </Button>
        <Text>{feedback}</Text>
      </ScrollView>
    </NativeBaseProvider>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'flex-start',
    alignItems: 'center',
    padding: 20,
    backgroundColor: 'white',
  },
  title: {
    fontSize: 30,
  }
});

export default NewEvent;
