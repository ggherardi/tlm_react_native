import DateTimePicker from '@react-native-community/datetimepicker';
import { FormControl, HStack, Input, NativeBaseProvider, Select, TextArea } from 'native-base';
import { useEffect, useState } from 'react';
import React, { Button, Image, ScrollView, StyleSheet, Text, View } from 'react-native';
import GlobalStyles from '../lib/GlobalStyles';
import { Utility } from '../lib/Utility';
import { InputSideButton } from '../lib/components/InputSideButtonComponent';
import { TLMButtonComponent, TLMButtonType } from '../lib/components/TLMButtonComponent';
import { launchCamera, launchImageLibrary } from 'react-native-image-picker';
import { ExpenseReport } from '../lib/models/ExpenseReport';
import dataContext from '../lib/models/DataContext';
import { MediaType } from 'react-native-image-picker/lib/typescript/types'

const NewExpenseReportScreen = ({ navigation }: any) => {
    const [expenses, setExpenses] = useState(dataContext.ExpenseReports.getAllData())
    const [expenseName, setExpenseName] = useState('');
    const [expenseDescription, setExpenseDescription] = useState('');
    const [expenseDate, setExpenseDate] = useState(new Date());
    const [expenseAmount, setExpenseAmount] = useState('');
    const [showDateTimePicker, setShowDateTimePicker] = useState(false);
    const [setDateFunction, setSetDateFunction] = useState('');
    const [photo, setPhoto] = useState<any>();
    const [feedback, setFeedback] = useState('Feedback original state');
    // console.log("Expenses first time:", expenses, typeof expenses);
    useEffect(() => {
        setFeedback(JSON.stringify(expenses));
    }, []);

    const handleExpenseNameChange = (value: any) => {
        setExpenseName(value);
    };
    const handleExpenseDescriptionChange = (e: any) => {
        setExpenseDescription(e.nativeEvent.text);
    };
    const handleExpenseAmount = (e: any) => {
        setExpenseAmount(e.nativeEvent.text);
    };


    const imagePickerCommonOptions =  { mediaType: "photo", maxWidth: 800, maxHeight: 600, includeBase64: true };
    //@ts-ignore
    const onSelectImagePress = () => launchImageLibrary(imagePickerCommonOptions, onImageSelect);
    //@ts-ignore
    const onTakePhoto = () => launchCamera(imagePickerCommonOptions, onImageSelect);
    const deletePhoto = () => setPhoto(undefined);

    const onImageSelect = async (media: any) => {
        console.log(media);

        if (!media.didCancel && media.assets[0]) {
            const photo = media.assets[0];
            setPhoto(photo);
        }
    };

    const saveExpenseReport = () => {
        let expense: ExpenseReport = new ExpenseReport();
        if (expenses && expenses.map) {
            let id = Math.max(...expenses.map((e: ExpenseReport) => e.id));
            expense.id = id >= 0 ? id + 1 : 0;
            expense.name = expenseName.trim();
            expense.description = expenseDescription.trim();
            expense.amount = Number(expenseAmount);
            expense.date = expenseDate.toString();
            expense.timeStamp = new Date().toString();
            expense.receiptPhotoBase64 = photo.base64;
            expenses.push(expense);
            dataContext.ExpenseReports.saveData(expenses);
            setExpenses(dataContext.ExpenseReports.getAllData());
            setFeedback(JSON.stringify(expenses));
        }
    };

    const refreshData = () => {
        console.log("Refreshing data");
        setExpenses(dataContext.ExpenseReports.getAllData());
    }

    Utility.OnFocus({ navigation: navigation, onFocusAction: refreshData });

    const clear = () => {
        dataContext.ExpenseReports.saveData([]);
    }

    return (
        <NativeBaseProvider>
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
                            <TLMButtonComponent title='Salva' buttonType={TLMButtonType.Primary} onPress={saveExpenseReport}></TLMButtonComponent>
                        </HStack>
                    </View>
                ) : (
                    <Text></Text>
                )}
                <InputSideButton icon={"trash"} pressFunction={clear}></InputSideButton>
                {/* <Text>{feedback}</Text> */}
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