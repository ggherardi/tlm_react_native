import DateTimePicker from '@react-native-community/datetimepicker';
import { FormControl, HStack, Input, NativeBaseProvider, TextArea } from 'native-base';
import { useState } from 'react';
import React, { Button, ScrollView, StyleSheet, Text } from 'react-native';
import GlobalStyles from '../lib/GlobalStyles';
import { Utility } from '../lib/Utility';
import { InputSideButton } from '../lib/components/InputSideButtonComponent';
import { TLMButtonComponent, TLMButtonType } from '../lib/components/TLMButtonComponent';

const NewExpenseReportScreen = () => {
    const handleExpenseNameChange = (e: any) => {
        setExpenseName(e.nativeEvent.text);
    };
    const handleExpenseDescriptionChange = (e: any) => {
        setExpenseDescription(e.nativeEvent.text);
    };

    const saveEvent = () => {
        // let event: BusinessEvent = new BusinessEvent();
        // let id = Math.max(...events.map((e: BusinessEvent) => e.id));
        // event.id = id >= 0 ? id + 1 : 0;
        // event.name = eventName.trim();
        // event.description = eventDescription.trim();
        // event.startDate = eventStartDate.toString();
        // event.endDate = eventEndDate.toString();
        // events.push(event);
        // Storage.save(SaveConstants.events.key, JSON.stringify(events));
    };

    const [expenseName, setExpenseName] = useState('');
    const [expenseDescription, setExpenseDescription] = useState('');
    const [expenseDate, setExpenseDate] = useState(new Date());
    const [expenseAmount, setExpenseAmount] = useState('');
    const [showDateTimePicker, setShowDateTimePicker] = useState(false);
    const [setDateFunction, setSetDateFunction] = useState('');
    const [feedback, setFeedback] = useState('Feedback original state');

    return (
        <NativeBaseProvider>
            <ScrollView contentContainerStyle={styles.container}>
                <FormControl style={GlobalStyles.mt15} isRequired>
                    <FormControl.Label>Titolo spesa</FormControl.Label>
                    <Input placeholder="Titolo spesa" onChange={handleExpenseNameChange}></Input>
                </FormControl>
                <FormControl style={GlobalStyles.mt15}>
                    <FormControl.Label>Descrizione della spesa</FormControl.Label>
                    <TextArea placeholder="Descrizione della spesa" onChange={handleExpenseDescriptionChange} autoCompleteType={true}></TextArea>
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
                <Text>{feedback}</Text>
            </ScrollView>
        </NativeBaseProvider>
    )
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

export default NewExpenseReportScreen;