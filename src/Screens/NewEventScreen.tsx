import DateTimePicker from '@react-native-community/datetimepicker';
import { FormControl, Input, NativeBaseProvider, TextArea } from 'native-base';
import React, { useEffect, useState } from 'react';
import { StyleSheet, ScrollView, Alert } from 'react-native';
import { InputSideButton } from '../lib/components/InputSideButtonComponent';
import GlobalStyles from '../lib/GlobalStyles';
import { BusinessEvent } from '../lib/models/BusinessEvent';
import { Utility } from '../lib/Utility';
import dataContext from '../lib/models/DataContext';
import { useCustomHeaderWithButtonAsync } from '../lib/components/CustomHeaderComponent';
import { Currency, GetCurrencies, GetCurrency } from '../lib/data/Currencies';
import { Constants } from '../lib/Constants';
import { PDFBuilder } from '../lib/PDFBuilder';
import { SaveConstants } from '../lib/DataStorage';
import { InputNumber } from '../lib/components/InputNumberComponent';
import NavigationHelper from '../lib/NavigationHelper';
import ModalLoaderComponent from '../lib/components/ModalWithLoader';
import { FormErrorMessageComponent } from '../lib/components/FormErrorMessageComponent';
import { FileManager } from '../lib/FileManager';
import NotificationManager from '../lib/NotificationManager';

const NewEventScreen = ({ navigation, route }: any) => {
  const [events, setEvents] = useState<BusinessEvent[]>(dataContext.Events.getAllData());
  const [eventName, setEventName] = useState('');
  const [eventDescription, setEventDescription] = useState('');
  const [showStartDateTimePicker, setShowStartDateTimePicker] = useState(false);
  const [showEndDateTimePicker, setShowEndDateTimePicker] = useState(false);
  const [eventStartDate, setEventStartDate] = useState(new Date());
  const [eventEndDate, setEventEndDate] = useState(new Date());
  const [setDateFunction, setSetDateFunction] = useState('');
  const [mainCurrencyCode, setMainCurrencyCode] = useState('EUR');
  const [city, setCity] = useState('')
  const [currenciesCodes, setCurrenciesCodes] = useState<string[]>([]);
  const [cashFund, setCashFund] = useState();
  const [isFormValid, setIsFormValid] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [validationErrors, setValidationErrors] = useState<any>({});

  useEffect(() => {
    useCustomHeaderWithButtonAsync(navigation, "Crea nuovo evento", () => saveEvent(), undefined, undefined, isFormValid, 'salva');
  });

  const handleEventNameChange = (e: any) => setEventName(e.nativeEvent.text);
  const handleEventDescriptionChange = (e: any) => setEventDescription(e.nativeEvent.text);
  const handleCityChange = (e: any) => setCity(e.nativeEvent.text);
  const handleCashFundChange = (e: any) => setCashFund(e.nativeEvent.text);

  const saveEvent = async () => {
    setIsLoading(true);
    if (!validate()) {
      setIsLoading(false);
      return;
    }
    let hasPermissions;
    try {
      const promiseResult = await FileManager.checkStoragePermissions();
      hasPermissions = promiseResult.success;
    } catch (err) {
      hasPermissions = false;
    }
    if (!hasPermissions) {
      Alert.alert("Impossibile creare un nuovo evento", "Per il salvataggio dell'evento, è necessario garantire permessi di scrittura sul dispositivo");
      setIsLoading(false);
      return;
    }

    let hasNotificationPermissions;
    try {
      const promiseResult = await FileManager.checkNotificationPermissions();
      hasNotificationPermissions = promiseResult.success;
    } catch (err) {
      hasNotificationPermissions = false;
    }

    let event: BusinessEvent = new BusinessEvent();
    let id = Math.max(...events.map((e: BusinessEvent) => e.id));
    event.id = id >= 0 ? id + 1 : 0;
    event.notificationIds = [((event.id * 1000000) + 1), ((event.id * 1000000) + 2), ((event.id * 1000000) + 3)];
    event.name = eventName ? eventName.trim() : '';
    event.mainCurrency = GetCurrency(mainCurrencyCode) as Currency;
    event.currencies = GetCurrencies(currenciesCodes);
    event.city = city ? city.trim() : '';
    event.description = eventDescription.trim();
    event.startDate = eventStartDate.toString();
    event.endDate = eventEndDate.toString();
    event.cashFund = cashFund ? cashFund : 0;
    event.expensesDataContextKey = `event-${event.id}_${event.name}-reports-${SaveConstants.expenseReport.key}`;
    console.log("Adding new event to events list..");
    events.push(event);
    const sanitizedEventName = Utility.SanitizeString(event.name);
    const userProfile = Utility.GetUserProfile();
    const pdfFileName = `nota_spese_${sanitizedEventName}_${Utility.GetYear(event.startDate)}_${userProfile.surname}_${userProfile.name}`;
    const directoryName = `${sanitizedEventName}_${Utility.FormatDateDDMMYYYY(event.startDate, "-")}_${Utility.FormatDateDDMMYYYY(event.endDate, "-")}_${Utility.GenerateRandomGuid("")}`;
    console.log("Creating event pdf..");
    const createdFile = await PDFBuilder.createExpensesPdfAsync(event, directoryName, pdfFileName);
    event.reportFileName = pdfFileName;
    if (createdFile) {
      const filePath = createdFile.filePath as string;
      event.directoryName = directoryName;
      event.fullFilePath = filePath;
      event.directoryPath = filePath.substring(0, filePath.lastIndexOf("/"));
      console.log("Saving all events to memory..");
      dataContext.Events.saveData(events);
      Utility.ShowSuccessMessage("Evento creato correttamente");

      if (hasNotificationPermissions) {
        console.log("Scheduling notifications for event..");
        BusinessEvent.scheduleNotifications(event);
      }      

      userProfile.swipeTutorialSeen = false;
      dataContext.UserProfile.saveData([userProfile]);
      NavigationHelper.getHomeTabNavigation().navigate(Constants.Navigation.AllEvents);
    } else {
      console.log("Errore");
    }
    setIsLoading(false);
  };

  const validate = (): boolean => {
    let isValid = true;
    let validationErrorsTemp = {};
    if (!eventName) {
      validationErrorsTemp = { ...validationErrorsTemp, eventName: 'Campo obbligatorio' };
      isValid = false;
    }
    if (!city) {
      validationErrorsTemp = { ...validationErrorsTemp, city: 'Campo obbligatorio' };
      isValid = false;
    }
    if (!eventStartDate) {
      validationErrorsTemp = { ...validationErrorsTemp, eventStartDate: 'Campo obbligatorio' };
      isValid = false;
    }
    if (!eventEndDate) {
      validationErrorsTemp = { ...validationErrorsTemp, eventEndDate: 'Campo obbligatorio' };
      isValid = false;
    }
    if (eventStartDate.getTime() > eventEndDate.getTime()) {
      validationErrorsTemp = {
        ...validationErrorsTemp,
        eventStartDate: 'La Data inizio evento non può essere maggiore della Data fine evento',
        eventEndDate: 'La Data fine evento non può essere maggiore della Data inizio evento'
      };
      isValid = false;
    }
    setValidationErrors(validationErrorsTemp);
    return isValid;
  }

  const refreshData = () => {
    setEvents(dataContext.Events.getAllData());
  }

  Utility.OnFocus({ navigation: navigation, onFocusAction: refreshData });

  return (
    <NativeBaseProvider>
      <ModalLoaderComponent isLoading={isLoading} text='Creazione evento in corso..' />
      <ScrollView contentContainerStyle={styles.container}>
        <FormControl style={GlobalStyles.mt15} isRequired isInvalid={'eventName' in validationErrors}>
          <FormControl.Label>Nome dell'evento</FormControl.Label>
          <Input placeholder="Nome evento" onChange={handleEventNameChange} maxLength={50}></Input>
          <FormErrorMessageComponent text='Campo obbligatorio' field='eventName' validationArray={validationErrors} />
        </FormControl>

        <FormControl style={GlobalStyles.mt15} isRequired isInvalid={'eventStartDate' in validationErrors}>
          <FormControl.Label>Data di inizio dell'evento</FormControl.Label>
          <Input
            placeholder="gg/mm/aaaa"
            onPressIn={() => setShowStartDateTimePicker(true)}
            value={Utility.FormatDateDDMMYYYY(eventStartDate.toString())}
            InputLeftElement={
              <InputSideButton
                icon="calendar-day"
                iconStyle={GlobalStyles.iconPrimary}
                pressFunction={() => {
                  setShowStartDateTimePicker(true);
                }}
              />
            }
          />
          <FormErrorMessageComponent text={validationErrors.eventStartDate} field='eventStartDate' validationArray={validationErrors} />
        </FormControl>

        <FormControl style={GlobalStyles.mt15} isRequired isInvalid={'eventEndDate' in validationErrors}>
          <FormControl.Label>Data di fine dell'evento</FormControl.Label>
          <Input
            placeholder="gg/mm/aaaa"
            onPressIn={() => setShowEndDateTimePicker(true)}
            value={Utility.FormatDateDDMMYYYY(eventEndDate.toString())}
            InputLeftElement={
              <InputSideButton
                icon="calendar-day"
                iconStyle={GlobalStyles.iconPrimary}
                pressFunction={() => {
                  setShowEndDateTimePicker(true);
                }}
              />
            }
          />
          <FormErrorMessageComponent text={validationErrors.eventEndDate} field='eventEndDate' validationArray={validationErrors} />
        </FormControl>

        {showStartDateTimePicker && (
          <DateTimePicker
            mode="date"
            display="spinner"
            value={eventStartDate}
            onChange={(event, date) => {
              setShowStartDateTimePicker(false);
              setEventStartDate(date as Date);
            }}
          />
        )}
        {showEndDateTimePicker && (
          <DateTimePicker
            mode="date"
            display="spinner"
            value={eventEndDate}
            onChange={(event, date) => {
              setShowEndDateTimePicker(false);
              setEventEndDate(date as Date);
            }}
          />
        )}

        <FormControl style={GlobalStyles.mt15} isRequired>
          <FormControl.Label>Destinazione (città)</FormControl.Label>
          <Input placeholder="es. Roma" onChange={handleCityChange} isInvalid={'city' in validationErrors} maxLength={200} />
          <FormErrorMessageComponent text='Campo obbligatorio' field='city' validationArray={validationErrors} />
        </FormControl>

        <FormControl style={GlobalStyles.mt15}>
          <FormControl.Label>Fondo cassa (€)</FormControl.Label>
          <InputNumber placeholder='es. 10.5' onChange={handleCashFundChange} isRequired={true} />
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

export default NewEventScreen;
