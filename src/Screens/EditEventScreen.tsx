import DateTimePicker from '@react-native-community/datetimepicker';
import { FormControl, Input, NativeBaseProvider, Button, HStack, TextArea, Select } from 'native-base';
import React, { useEffect, useState } from 'react';
import { StyleSheet, ScrollView } from 'react-native';
import { InputSideButton } from '../lib/components/InputSideButtonComponent';
import GlobalStyles from '../lib/GlobalStyles';
import { BusinessEvent } from '../lib/models/BusinessEvent';
import { Utility } from '../lib/Utility';
import dataContext from '../lib/models/DataContext';
import { useCustomHeaderSaveButton } from '../lib/components/CustomHeaderComponent';
import { Currency, GetCurrencies, GetCurrency } from '../lib/data/Currencies';

const EditEventScreen = ({ navigation, route }: any) => {
  const event: BusinessEvent = route.params.event;

  const [events, setEvents] = useState(dataContext.Events.getAllData())
  const [eventName, setEventName] = useState(event.name);
  const [eventDescription, setEventDescription] = useState(event.description);
  const [showDateTimePicker, setShowDateTimePicker] = useState(false);
  const [eventStartDate, setEventStartDate] = useState(new Date(event.startDate));
  const [eventEndDate, setEventEndDate] = useState(new Date(event.endDate));
  const [setDateFunction, setSetDateFunction] = useState('');
  const [mainCurrencyCode, setMainCurrencyCode] = useState('EUR');
  const [city, setCity] = useState(event.city)
  const [currenciesCodes, setCurrenciesCodes] = useState<string[]>([]);
  const [isFormValid, setIsFormValid] = useState(true);

  useEffect(() => {
    useCustomHeaderSaveButton(navigation, event.name, () => saveEvent(), "Modifica evento", !isFormValid);
  });

  const handleEventNameChange = (e: any) => setEventName(e.nativeEvent.text);
  const handleEventDescriptionChange = (e: any) => setEventDescription(e.nativeEvent.text);
  const handleCityChange = (e: any) => setCity(e.nativeEvent.text);

  const saveEvent = async () => {
    const eventToEdit = events.find(e => e.id == event.id);
    if (eventToEdit) {
      eventToEdit.name = eventName.trim();
      eventToEdit.mainCurrency = GetCurrency(mainCurrencyCode) as Currency;
      eventToEdit.currencies = GetCurrencies(currenciesCodes);
      eventToEdit.city = city ? city.trim() : "";
      eventToEdit.description = eventDescription?.trim();
      eventToEdit.startDate = eventStartDate.toString();
      eventToEdit.endDate = eventEndDate.toString();
      dataContext.Events.saveData(events);
      let dataTemp = dataContext.Events.getAllData();
      navigation.goBack();
    }
  };

  return (
    <NativeBaseProvider>
      <ScrollView contentContainerStyle={styles.container}>
        <FormControl style={GlobalStyles.mt15}>
          <FormControl.Label>Nome dell'evento</FormControl.Label>
          <Input defaultValue={event.name} placeholder="Nome evento" isDisabled onChange={handleEventNameChange}></Input>
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
              setShowDateTimePicker(false);
              const func = setDateFunction == 'setEventEndDate' ? setEventEndDate : setEventStartDate;
              func(date as Date);
            }}
          />
        )}

        <FormControl style={GlobalStyles.mt15} isRequired>
          <FormControl.Label>Destinazione (città)</FormControl.Label>
          <Input defaultValue={event.city} placeholder="es. Roma" onChange={handleCityChange}></Input>
        </FormControl>

        <FormControl style={GlobalStyles.mt15}>
          <FormControl.Label>Descrizione dell'evento</FormControl.Label>
          <TextArea defaultValue={event.description} placeholder="Descrizione breve dell'evento" onChange={handleEventDescriptionChange} autoCompleteType={true}></TextArea>
        </FormControl>
      </ScrollView>
    </NativeBaseProvider>
  );
};

const multiSelectStyle = StyleSheet.create({
  itemText: {
    fontWeight: '100',
    fontSize: 15
  },
  listContainer: {
    backgroundColor: "red"
  },
  selectToggle: {
    borderColor: '#d4d4d4',
    borderRadius: 4,
    borderWidth: 1,
    marginTop: 5,
    marginBottom: 15,
    paddingHorizontal: 10,
    paddingVertical: 12,
  },
  selectToggleText: {
    color: '#d4d4d4',
    fontSize: 15,
  }
})

const styles = StyleSheet.create({
  container: {
    padding: 20,
  },
  title: {
    fontSize: 30,
  }
});

export default EditEventScreen;
