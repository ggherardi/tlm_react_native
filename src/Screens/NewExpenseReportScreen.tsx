import DateTimePicker from '@react-native-community/datetimepicker';
import { FormControl, HStack, Input, NativeBaseProvider, Row, Select, TextArea } from 'native-base';
import { useEffect, useState } from 'react';
import React, { Button, Image, ScrollView, StyleSheet, Text, View } from 'react-native';
import GlobalStyles from '../lib/GlobalStyles';
import { Utility } from '../lib/Utility';
import { InputSideButton } from '../lib/components/InputSideButtonComponent';
import { launchCamera, launchImageLibrary } from 'react-native-image-picker';
import { ExpenseReport } from '../lib/models/ExpenseReport';
import dataContext from '../lib/models/DataContext';
import { InputNumber } from '../lib/components/InputNumberComponent';
import { BusinessEvent } from '../lib/models/BusinessEvent';
import { Currency } from '../lib/data/Currencies';
import { Constants } from '../lib/Constants';
import { useCustomHeaderSaveButton, useCustomHeaderWithButtonAsync } from '../lib/components/CustomHeaderComponent';
import { FileManager } from '../lib/FileManager';
import { PDFBuilder } from '../lib/PDFBuilder';
import NavigationHelper from '../lib/NavigationHelper';
import ModalLoaderComponent from '../lib/components/ModalWithLoader';

const NewExpenseReportScreen = ({ route, navigation }: any) => {
    const [expenses, setExpenses] = useState(dataContext.ExpenseReports.getAllData())
    const [expenseName, setExpenseName] = useState('');
    const [expenseDescription, setExpenseDescription] = useState('');
    const [expenseDate, setExpenseDate] = useState(new Date());
    const [expenseAmount, setExpenseAmount] = useState('');
    const [showDateTimePicker, setShowDateTimePicker] = useState(false);
    const [photo, setPhoto] = useState<any>();
    const [amountCurrencyCode, setAmountCurrencyCode] = useState('EUR');
    const [isFormValid, setIsFormValid] = useState(false);
    const [isLoading, setIsLoading] = useState(false);

    const event: BusinessEvent = route.params.event;
    const extraCurrencies: any[] = event.currencies ? event.currencies : [];
    const allCurrencies: Currency[] = [...extraCurrencies, event.mainCurrency];

    useEffect(() => {
        useCustomHeaderWithButtonAsync(navigation, Utility.GetEventHeaderTitle(event), () => saveExpenseReport(), undefined, 'Crea nuova spesa', isFormValid, 'salva');
      });

    const handleExpenseNameChange = (value: any) => setExpenseName(value);
    const handleExpenseDescriptionChange = (e: any) => setExpenseDescription(e.nativeEvent.text);
    const handleExpenseAmount = (e: any) => setExpenseAmount(e.nativeEvent.text);
    const handleAmountCurrencyChange = (value: any) => setAmountCurrencyCode(value);


    const imagePickerCommonOptions = { mediaType: "photo", maxWidth: 800, maxHeight: 600, includeBase64: true };
    //@ts-ignore
    const onSelectImagePress = () => launchImageLibrary(imagePickerCommonOptions, onImageSelect);
    //@ts-ignore
    const onTakePhoto = () => launchCamera(imagePickerCommonOptions, onImageSelect);
    const deletePhoto = () => setPhoto(undefined);

    const onImageSelect = async (media: any) => {        
        if (!media.didCancel && media.assets[0]) {
            const photo = media.assets[0];
            setPhoto(photo);
        }
    };

    const saveExpenseReport = async () => {
        setIsLoading(true);
        let expense: ExpenseReport = new ExpenseReport();
        if (expenses && expenses.map) {
            let id = Math.max(...expenses.map((e: ExpenseReport) => e.id));
            expense.id = id >= 0 ? id + 1 : 0;
            expense.name = expenseName.trim();
            expense.description = expenseDescription.trim();
            expense.amount = Number(expenseAmount);
            expense.date = expenseDate.toString();
            expense.timeStamp = new Date().toString();            
            const photoFileName = `${Utility.SanitizeString(event.name)}-${Utility.SanitizeString(expense.name)}-${Utility.FormatDateDDMMYYYY(expense.date, '-')}-${Utility.GenerateRandomGuid("")}.${Utility.GetExtensionFromType(photo.type)}`;
            const photoFileFullPath = `${event.directoryPath}/${photoFileName}`;
            const saveResult = await FileManager.saveFromBase64(photoFileFullPath, photo.base64);
            if (saveResult) {                
                expense.photoFilePath = photoFileFullPath;
                expenses.push(expense);
                PDFBuilder.createExpensesPdfAsync(event, event.directoryName, event.reportFileName);
                dataContext.ExpenseReports.saveData(expenses);
                setExpenses(dataContext.ExpenseReports.getAllData());
                resetForm();
                NavigationHelper.getEventTabNavigation().navigate(Constants.Navigation.Event);
            } else {
                console.log("Cannot save the expense report because the photo could not be added to external storage");
            }
        }
        setIsLoading(false);
    };

    const refreshData = () => {
        setExpenses(dataContext.ExpenseReports.getAllData());
    }

    const resetForm = () => {
        setExpenseName('');
        setExpenseAmount('');
        setExpenseDescription('');
        setExpenseDate(new Date());
        setPhoto(undefined);
        setIsFormValid(false);
    }

    Utility.OnFocus({ navigation: navigation, onFocusAction: refreshData });

    return (
        <NativeBaseProvider>
            <ModalLoaderComponent isLoading={isLoading} text='Creazione spesa in corso..' />
            <ScrollView contentContainerStyle={styles.container}>
                <FormControl style={GlobalStyles.mt15} isRequired isDisabled>
                    <FormControl.Label>Foto</FormControl.Label>
                    <HStack style={[GlobalStyles.pt15]}>
                        {photo != undefined && photo != null && (
                            <HStack>
                                <Image source={{ uri: `${photo.uri}` }} style={styles.image} resizeMode="contain"></Image>
                                <InputSideButton icon={"x"} pressFunction={deletePhoto} />
                            </HStack>
                        )}
                        <InputSideButton icon={"camera"} pressFunction={onTakePhoto} />
                        <InputSideButton icon={"upload"} pressFunction={onSelectImagePress} />
                    </HStack>
                </FormControl>

                {photo ? (
                    <View style={{ width: "100%" }}>
                        <FormControl style={GlobalStyles.mt15} isRequired>
                            <FormControl.Label>Titolo spesa</FormControl.Label>
                        </FormControl>
                        <Select width={"100%"} onValueChange={handleExpenseNameChange} selectedValue={expenseName}>
                            <Select.Item label="Pranzo" value="Pranzo" />
                            <Select.Item label="Cena" value="Cena" />
                            <Select.Item label="Taxi" value="Taxi" />
                        </Select>
                        <FormControl style={GlobalStyles.mt15} isRequired>
                            <FormControl.Label>Importo della spesa ({event.mainCurrency.symbol})</FormControl.Label>
                            <InputNumber placeholder='Importo' onChange={handleExpenseAmount} isRequired={true} />
                        </FormControl>

                        <FormControl style={GlobalStyles.mt15} isRequired>
                            <FormControl.Label>Data della spesa</FormControl.Label>
                            <Input
                                placeholder="gg/mm/aaaa"
                                value={Utility.FormatDateDDMMYYYYhhmm(expenseDate.toString())}
                                InputLeftElement={
                                    <InputSideButton
                                        icon="calendar-day"
                                        iconStyle={GlobalStyles.iconPrimary}
                                        pressFunction={() => {
                                            setShowDateTimePicker(true);
                                        }}
                                    />
                                }
                            />
                        </FormControl>

                        {showDateTimePicker && (
                            <DateTimePicker
                                mode="date"
                                display="spinner"
                                value={expenseDate}
                                onChange={(event, date) => {
                                    setShowDateTimePicker(false);
                                    setExpenseDate(date as Date);
                                }}
                            />
                        )}
                        <FormControl style={GlobalStyles.mt15}>
                            <FormControl.Label>Descrizione della spesa</FormControl.Label>
                            <TextArea placeholder="Descrizione della spesa" onChange={handleExpenseDescriptionChange} autoCompleteType={true}></TextArea>
                        </FormControl>
                    </View>
                ) : (
                    <Text></Text>
                )}
            </ScrollView>
        </NativeBaseProvider>
    )
};

const styles = StyleSheet.create({
    container: {
        // flex: 1,
        justifyContent: 'flex-start',
        alignItems: 'center',
        padding: 20,
        backgroundColor: 'white',
    },
    title: {
        fontSize: 30,
    },
    image: {
        height: 50,
        width: 50,
        marginRight: 10
        // marginTop: 30,
        // borderRadius: 10,
    },
});

export default NewExpenseReportScreen;