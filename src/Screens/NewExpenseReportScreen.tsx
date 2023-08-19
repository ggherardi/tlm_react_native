import DateTimePicker from '@react-native-community/datetimepicker';
import { FormControl, HStack, Input, NativeBaseProvider, Select, TextArea } from 'native-base';
import { useState } from 'react';
import React, { Button, Image, ScrollView, StyleSheet, Text, View } from 'react-native';
import GlobalStyles from '../lib/GlobalStyles';
import { Utility } from '../lib/Utility';
import { InputSideButton } from '../lib/components/InputSideButtonComponent';
import { TLMButtonComponent, TLMButtonType } from '../lib/components/TLMButtonComponent';
import { launchCamera, launchImageLibrary } from 'react-native-image-picker';
import { ExpenseReport } from '../lib/models/ExpenseReport';
import dataContext from '../lib/models/DataContext';
import { SaveConstants } from '../lib/DataStorage';

const NewExpenseReportScreen = () => {
    const [expenses, setExpenses] = useState(dataContext.ExpenseReports.getAllData())
    const [expenseName, setExpenseName] = useState('');
    const [expenseDescription, setExpenseDescription] = useState('');
    const [expenseDate, setExpenseDate] = useState(new Date());
    const [expenseAmount, setExpenseAmount] = useState('');
    const [showDateTimePicker, setShowDateTimePicker] = useState(false);
    const [setDateFunction, setSetDateFunction] = useState('');
    const [photo, setPhoto] = useState<any>();
    const [feedback, setFeedback] = useState('Feedback original state');

    const handleExpenseNameChange = (value: any) => {
        setExpenseName(value);
    };
    const handleExpenseDescriptionChange = (e: any) => {
        setExpenseDescription(e.nativeEvent.text);
    };
    const handleExpenseAmount = (e: any) => {
        setExpenseAmount(e.nativeEvent.text);
    };

    const onSelectImagePress = () => launchImageLibrary({ mediaType: "photo" }, onImageSelect);

    const onTakePhoto = () => launchCamera({ mediaType: "photo" }, onImageSelect);

    const deletePhoto = () => setPhoto(undefined);

    const onImageSelect = async (media: any) => {
        console.log(media);

        if (!media.didCancel && media.assets[0]) {
            const photo = media.assets[0];
            console.log("photo: ", photo.uri);
            setPhoto(photo);
        }
    };

    const saveEvent = () => {
        let expense: ExpenseReport = new ExpenseReport();
        let id = Math.max(...expenses.map((e: ExpenseReport) => e.id));
        expense.id = id >= 0 ? id + 1 : 0;
        expense.name = expenseName.trim();
        expense.description = expenseDescription.trim();
        // expense.amount = expenseAmount.toString();
        expense.date = expenseDate.toString();
        expense.timeStamp = new Date().toString();
        expenses.push(expense);
        dataContext.ExpenseReports.saveData(expenses);
    };

    return (
        <NativeBaseProvider>
            <ScrollView contentContainerStyle={styles.container}>
                <FormControl style={GlobalStyles.mt15} isRequired isDisabled>
                    <FormControl.Label>Foto</FormControl.Label>
                    <HStack>
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
                        <FormControl style={GlobalStyles.mt15}>
                            <FormControl.Label>Descrizione della spesa</FormControl.Label>
                            <TextArea placeholder="Descrizione della spesa" onChange={handleExpenseDescriptionChange} autoCompleteType={true}></TextArea>
                        </FormControl>
                        <FormControl style={GlobalStyles.mt15}>
                            <FormControl.Label>Importo della spesa</FormControl.Label>
                            <Input placeholder="Importo" onChange={handleExpenseAmount}></Input>
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
                                value={new Date()}
                                onChange={(event, date) => {
                                    setExpenseDate(expenseDate);
                                    setShowDateTimePicker(false);
                                }}
                            />
                        )}
                        <HStack space={2} justifyContent="center" style={GlobalStyles.mt15}>
                            <TLMButtonComponent title='Salva' buttonType={TLMButtonType.Primary} onPress={saveEvent}></TLMButtonComponent>
                        </HStack>
                    </View>
                ) : (
                    <Text></Text>
                )}
                <Text>{feedback}</Text>
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
        height: 30,
        width: 30,
        marginRight: 10
        // marginTop: 30,
        // borderRadius: 10,
    },
});

export default NewExpenseReportScreen;