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
import { Currency, GetCurrencies, GetCurrency } from '../lib/data/Currencies';
import { Constants } from '../lib/Constants';
import { PDFBuilder } from '../lib/PDFBuilder';
import { SaveConstants } from '../lib/DataStorage';

const EditEventScreen = ({ navigation }: any) => {
  const [events, setEvents] = useState(dataContext.Events.getAllData())
  const [eventName, setEventName] = useState('');
  const [eventDescription, setEventDescription] = useState('');
  const [showDateTimePicker, setShowDateTimePicker] = useState(false);
  const [eventStartDate, setEventStartDate] = useState(new Date());
  const [eventEndDate, setEventEndDate] = useState(new Date());
  const [setDateFunction, setSetDateFunction] = useState('');
  const [mainCurrencyCode, setMainCurrencyCode] = useState('EUR');
  const [city, setCity] = useState('')
  const [currenciesCodes, setCurrenciesCodes] = useState<string[]>([]);
  const [isFormValid, setIsFormValid] = useState(false);
  
  useEffect(() => {
    useCustomHeaderSaveButton(navigation, "Crea nuovo evento", () => saveEvent(), undefined, isFormValid);
  });

  const handleEventNameChange = (e: any) => setEventName(e.nativeEvent.text);
  const handleEventDescriptionChange = (e: any) => setEventDescription(e.nativeEvent.text);
  const handleCityChange = (e: any) => setCity(e.nativeEvent.text);
  const handleCurrencyAdd = (items: string[]) => setCurrenciesCodes(items);
  const handleMainCurrencyChange = (value: any) => setMainCurrencyCode(value);  

  const saveEvent = async () => {
    let event: BusinessEvent = new BusinessEvent();
    let id = Math.max(...events.map((e: BusinessEvent) => e.id));
    event.id = id >= 0 ? id + 1 : 0;
    event.name = eventName.trim();
    event.mainCurrency = GetCurrency(mainCurrencyCode) as Currency;
    event.currencies = GetCurrencies(currenciesCodes);
    event.city = city;
    event.description = eventDescription.trim();
    event.startDate = eventStartDate.toString();
    event.endDate = eventEndDate.toString();
    event.expensesDataContextKey = `event-${event.id}_${event.name}-reports-${SaveConstants.expenseReport.key}`;
    events.push(event);
    const sanitizedEventName = Utility.SanitizeString(event.name);
    const pdfFileName = `nota_spese_${sanitizedEventName}_${Utility.GetYear(event.startDate)}_nomeTL`;
    const directoryName = `${sanitizedEventName}_${Utility.FormatDateDDMMYYYY(event.startDate, "-")}_${Utility.FormatDateDDMMYYYY(event.endDate, "-")}_${Utility.GenerateRandomGuid("")}`;
    const createdFile = await PDFBuilder.createExpensesPdfAsync(event, directoryName, pdfFileName);
    event.reportFileName = pdfFileName;
    if (createdFile) {
      const filePath = createdFile.filePath as string;
      event.directoryName = directoryName;
      event.fullFilePath = filePath;
      event.directoryPath = filePath.substring(0, filePath.lastIndexOf("/"));
      dataContext.Events.saveData(events);
      navigation.navigate(Constants.Navigation.Home)
    } else {
      console.log("Errore");
    }
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
          <FormControl.Label>Destinazione</FormControl.Label>
          <Input placeholder="Destinazione (città)" onChange={handleCityChange}></Input>
        </FormControl>

        <FormControl style={GlobalStyles.mt15}>
          <FormControl.Label>Descrizione dell'evento</FormControl.Label>
          <TextArea placeholder="Descrizione breve dell'evento" onChange={handleEventDescriptionChange} autoCompleteType={true}></TextArea>
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
