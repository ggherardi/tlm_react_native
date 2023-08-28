import DateTimePicker from '@react-native-community/datetimepicker';
import { FormControl, Input, NativeBaseProvider, Button, HStack, TextArea, Select } from 'native-base';
import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet, ScrollView } from 'react-native';
import { InputSideButton } from '../lib/components/InputSideButtonComponent';
import GlobalStyles from '../lib/GlobalStyles';
import { BusinessEvent } from '../lib/models/BusinessEvent';
import { Utility } from '../lib/Utility';
import dataContext from '../lib/models/DataContext';
import { useCustomHeaderSaveButton } from '../lib/components/CustomHeaderComponent';
import { Currencies, Currency, GetCurrencies, GetCurrency } from '../lib/data/Currencies';
import SectionedMultiSelect from 'react-native-sectioned-multi-select';
import MultiSelectIconComponent from '../lib/components/MultiSelectIconsComponent';
import { Constants } from '../lib/Constants';
import { Countries, GetCountries, GetCountry } from '../lib/data/Countries';

const NewEventScreen = ({ navigation }: any) => {
  const [events, setEvents] = useState(dataContext.Events.getAllData())
  const [eventName, setEventName] = useState('');
  const [eventDescription, setEventDescription] = useState('');
  const [showDateTimePicker, setShowDateTimePicker] = useState(false);
  const [eventStartDate, setEventStartDate] = useState(new Date());
  const [eventEndDate, setEventEndDate] = useState(new Date());
  const [setDateFunction, setSetDateFunction] = useState('');
  const [mainCurrencyCode, setMainCurrencyCode] = useState('EUR');
  const [countriesCodes, setCountriesCodes] = useState<string[]>([]);
  const [currenciesCodes, setCurrenciesCodes] = useState<string[]>([]);
  const [isFormValid, setIsFormValid] = useState(true);

  console.log(showDateTimePicker);

  useEffect(() => {
    useCustomHeaderSaveButton(navigation, "Crea nuovo evento", () => saveEvent(), undefined, !isFormValid);
  });

  const handleEventNameChange = (e: any) => setEventName(e.nativeEvent.text);
  const handleEventDescriptionChange = (e: any) => setEventDescription(e.nativeEvent.text);
  const handleCurrencyAdd = (items: string[]) => setCurrenciesCodes(items);
  const handleMainCurrencyChange = (value: any) => setMainCurrencyCode(value);
  const handleCountryChange = (items: string[]) => setCountriesCodes(items);

  const saveEvent = () => {
    let event: BusinessEvent = new BusinessEvent();
    let id = Math.max(...events.map((e: BusinessEvent) => e.id));
    event.id = id >= 0 ? id + 1 : 0;
    event.name = eventName.trim();
    event.mainCurrency = GetCurrency(mainCurrencyCode);
    event.currencies = GetCurrencies(currenciesCodes);
    event.country = GetCountry(countriesCodes && countriesCodes && countriesCodes.length ? countriesCodes[0] : '');
    event.description = eventDescription.trim();
    event.startDate = eventStartDate.toString();
    event.endDate = eventEndDate.toString();
    events.push(event);
    dataContext.Events.saveData(events);
    navigation.navigate(Constants.Navigation.Home)
  };

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
            value={Utility.FormatDateDDMMYYYY(eventStartDate.toString())}
            InputLeftElement={
              <InputSideButton
                icon="calendar-day"
                iconStyle={GlobalStyles.iconPrimary}
                pressFunction={() => {
                  setShowDateTimePicker(true);
                  console.log("Launching start date");
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
                  console.log("Launching end date");
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
              console.log("Function: ", setDateFunction);
              setShowDateTimePicker(false);
              const func = setDateFunction == 'setEventEndDate' ? setEventEndDate : setEventStartDate;
              func(date as Date);
            }}
          />
        )}

        <FormControl style={GlobalStyles.mt15} isRequired>
          <FormControl.Label>Valuta principale</FormControl.Label>
        </FormControl>
        <Select width={"100%"} onValueChange={handleMainCurrencyChange} selectedValue={mainCurrencyCode}>
          {Currencies && Currencies.length && Currencies.map(currency => (
            <Select.Item key={`select_item_${currency.code}`} label={currency.name} value={currency.code} />
          ))}
        </Select>

        <FormControl style={GlobalStyles.mt15}>
          <FormControl.Label>Paese</FormControl.Label>
        </FormControl>
        <View style={{ flex: 1, width: "100%" }}>
          <SectionedMultiSelect
            single={true}
            items={Countries}
            uniqueKey="code"
            selectedItems={countriesCodes}
            onSelectedItemsChange={handleCountryChange}
            //@ts-ignore
            IconRenderer={MultiSelectIconComponent}
            selectText="Seleziona paese"
            styles={{ ...multiSelectStyle, selectToggleText: { color: 'black', fontSize: 12 } }}
            searchPlaceholderText='Cerca paese'
            confirmText='Conferma'
          />
        </View>

        <FormControl style={GlobalStyles.mt15}>
          <FormControl.Label>Descrizione dell'evento</FormControl.Label>
          <TextArea placeholder="Descrizione breve dell'evento" onChange={handleEventDescriptionChange} autoCompleteType={true}></TextArea>
        </FormControl>

        <FormControl style={GlobalStyles.mt15}>
          <FormControl.Label>Valute aggiuntive</FormControl.Label>
        </FormControl>
        <View style={{ flex: 1, width: "100%" }}>
          <SectionedMultiSelect
            items={Currencies}
            uniqueKey="code"
            selectedItems={currenciesCodes}
            onSelectedItemsChange={handleCurrencyAdd}
            //@ts-ignore
            IconRenderer={MultiSelectIconComponent}
            selectText="Seleziona valute aggiuntive"
            styles={multiSelectStyle}
            searchPlaceholderText='Cerca valuta'
            confirmText='Conferma'
            selectedText='selezionate'
          />
        </View>

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

export default NewEventScreen;
