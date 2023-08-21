import DateTimePicker from '@react-native-community/datetimepicker';
import { FormControl, Input, NativeBaseProvider, Button, HStack, TextArea, Select } from 'native-base';
import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet, ScrollView } from 'react-native';
import { InputSideButton } from '../lib/components/InputSideButtonComponent';
import { SaveConstants, Storage } from '../lib/DataStorage';
import GlobalStyles from '../lib/GlobalStyles';
import { BusinessEvent } from '../lib/models/BusinessEvent';
import { Utility } from '../lib/Utility';
import { TLMButtonComponent, TLMButtonType } from '../lib/components/TLMButtonComponent';
import dataContext from '../lib/models/DataContext';
import useCustomHeader from '../lib/components/CustomHeaderComponent';
import { Currencies, Currency } from '../lib/data/Currencies';

const NewEventScreen = ({ navigation }: any) => {
  const [events, setEvents] = useState(dataContext.Events.getAllData())
  const [eventName, setEventName] = useState('');
  const [eventDescription, setEventDescription] = useState('');
  const [showDateTimePicker, setShowDateTimePicker] = useState(false);
  const [eventStartDate, setEventStartDate] = useState(new Date());
  const [eventEndDate, setEventEndDate] = useState(new Date());
  const [setDateFunction, setSetDateFunction] = useState('');
  const [currencies, setCurrencies] = useState<string[]>([]);
  const [feedback, setFeedback] = useState('Feedback original state');

  useEffect(() => {
    useCustomHeader(navigation, "Crea nuovo evento");
  });

  const handleEventNameChange = (e: any) => {
    setEventName(e.nativeEvent.text);
  };
  const handleEventDescriptionChange = (e: any) => {
    setEventDescription(e.nativeEvent.text);
  };
  const handleCurrencyAdd = (value: string) => {
    currencies.push(value);
    setCurrencies(currencies);
  }

  const saveEvent = () => {
    let event: BusinessEvent = new BusinessEvent();
    let id = Math.max(...events.map((e: BusinessEvent) => e.id));
    event.id = id >= 0 ? id + 1 : 0;
    event.name = eventName.trim();
    event.description = eventDescription.trim();
    event.startDate = eventStartDate.toString();
    event.endDate = eventEndDate.toString();
    events.push(event);
    dataContext.Events.saveData(events);
  };

  return (
    <NativeBaseProvider>
      <ScrollView contentContainerStyle={styles.container}>
        <FormControl style={GlobalStyles.mt15} isRequired>
          <FormControl.Label>Nome dell'evento</FormControl.Label>
          <Input placeholder="Nome evento" onChange={handleEventNameChange}></Input>
        </FormControl>
        <FormControl style={GlobalStyles.mt15}>
          <FormControl.Label>Descrizione dell'evento</FormControl.Label>
          <TextArea placeholder="Descrizione breve dell'evento" onChange={handleEventDescriptionChange} autoCompleteType={true}></TextArea>
        </FormControl>
        <FormControl style={GlobalStyles.mt15} isRequired>
          <FormControl.Label>Data di inizio dell'evento</FormControl.Label>
          <Input
            placeholder="gg/mm/aaaa"
            value={Utility.FormatDateDDMMYYYY(eventStartDate.toString())}
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
            value={Utility.FormatDateDDMMYYYY(eventEndDate.toString())}
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
              func(date as Date);
              setShowDateTimePicker(false);
            }}
          />
        )}
        <FormControl style={GlobalStyles.mt15}>
          <FormControl.Label>Valute aggiuntive</FormControl.Label>
        </FormControl>
        <Select width={"100%"} onValueChange={handleCurrencyAdd}>
          {Currencies && Currencies.length && Currencies.map(currency => {
            return (
              <Select.Item value={currency.code} label={`${currency.name} - ${currency.code} - ${currency.symbol}`} />
            );
          })}
        </Select>
        <HStack space={2} justifyContent="center" style={GlobalStyles.mt15}>
          <TLMButtonComponent title='Salva' buttonType={TLMButtonType.Primary} onPress={saveEvent}></TLMButtonComponent>
        </HStack>
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

export default NewEventScreen;
