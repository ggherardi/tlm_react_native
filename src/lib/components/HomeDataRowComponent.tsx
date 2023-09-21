import React, { useRef, useState } from 'react';
import { BusinessEvent } from '../models/BusinessEvent';
import { Pressable, StyleSheet, Text, Alert, Animated, View, TouchableOpacity, TouchableHighlight } from 'react-native';
import { HStack, Row, VStack } from 'native-base';
import { Utility } from '../Utility';
import { GestureHandlerRootView, Swipeable } from 'react-native-gesture-handler';
import { InputSideButton } from './InputSideButtonComponent';
import dataContext from '../models/DataContext';
import GlobalStyles, { ThemeColors } from '../GlobalStyles';
import { Constants } from '../Constants';
import DataContext from '../models/DataContext';
import { ExpenseReport } from '../models/ExpenseReport';
import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome';
import { StatusIconComponent } from './StatusIconComponent';

interface IHomeDataRow {
    event: BusinessEvent;
    onDelete: Function;
    index: number;
    navigation: any;
}

export const HomeDataRowComponent = ({ event, onDelete, index, navigation }: IHomeDataRow) => {
    const [expenses, setExpenses] = useState<ExpenseReport[]>(Utility.GetExpensesForEvent(event));
    const totalAmount = Utility.CalculateTotalAmount(expenses, 'amount') - event.cashFund;

    const goToEvent = () => {
        navigation.navigate(Constants.Navigation.EventHome, { event: event });
    };

    const renderRightActions = (
        //@ts-ignore
        progress: Animated.AnimatedInterpolation,
        //@ts-ignore
        dragAnimatedValue: Animated.AnimatedInterpolation,
    ) => {
        return (
            <View style={styles.swipedRow}>
                <View style={styles.swipedConfirmationContainer}>
                    <Text style={styles.deleteConfirmationText}>Vuoi cancellare l'evento?</Text>
                </View>
                <InputSideButton icon="trash" pressFunction={deleteEvent} iconColor={ThemeColors.white} stretchHeight={true} />
            </View>
        );
    };
    const deleteEvent = () => {
        const onDeleteConfirm = () => {
            dataContext.Events.deleteWhere(event.id);
            DataContext.deleteEntryWithKey(event.expensesDataContextKey);
            onDelete();
            Utility.ShowSuccessMessage("Evento cancellato correttamente");
        }
        Alert.alert("Conferma cancellazione", "Tutti i dati legati all'evento verranno rimossi dal dispositivo.", [
            { text: "Ok", onPress: onDeleteConfirm },
            { text: "Annulla", style: "cancel" }
        ]);
    };

    return (
        <GestureHandlerRootView>
            <Swipeable key={`swipable_${event.name}_${index}_${Utility.GenerateRandomGuid()}`} renderRightActions={renderRightActions}>
                <Pressable key={`pressable_${event.name}_${index}_${Utility.GenerateRandomGuid()}`}
                    onPress={goToEvent} style={({ pressed }) => [
                        styles.container, { backgroundColor: pressed ? ThemeColors.selected : ThemeColors.white }]}>
                    <Row>
                        <View style={{ justifyContent: 'center', paddingRight: 10 }}>
                            <StatusIconComponent event={event} />
                        </View>           
                        <VStack style={[styles.dateContainer, GlobalStyles.selfCenter]}>
                            <Text style={[styles.day]}>{Utility.FormatDateDDMM(event.startDate)}</Text>
                            <Text style={[styles.day]}>{Utility.FormatDateDDMM(event.endDate)}</Text>
                        </VStack>                                     
                        {/* <VStack style={[styles.dateContainer, GlobalStyles.selfCenter]}>
                            <Text style={[styles.day]}>{new Date(event.startDate).getDate()}</Text>
                            <Text style={[GlobalStyles.selfCenter]}>{Utility.GetMonthShortName(event.startDate as string)}</Text>
                        </VStack>             
                        <VStack style={[styles.dateContainer, GlobalStyles.selfCenter]}>
                            <Text style={[styles.day]}>{new Date(event.endDate).getDate()}</Text>
                            <Text style={[GlobalStyles.selfCenter]}>{Utility.GetMonthShortName(event.endDate as string)}</Text>
                        </VStack> */}
                        {Utility.IsNotNullOrUndefined(event.city) ? (
                            <VStack style={styles.eventNameContainer}>
                                <Text style={[styles.eventName]}>{event.name}</Text>
                                <Text style={[styles.eventDescription]} numberOfLines={1}>{event.city} - {Utility.GetNumberOfDaysBetweenDates(event.startDate, event.endDate)} giorni</Text>
                            </VStack>
                        ) : (
                            <Text style={[styles.eventNameContainer, styles.eventName, GlobalStyles.pl10, GlobalStyles.selfCenter]}>{event.name}</Text>
                        )}
                        <VStack style={styles.totalAmountContainer}>
                            <Text style={[styles.totalAmountText, { color: totalAmount >= 0 ? ThemeColors.green : ThemeColors.danger }]}>{totalAmount >= 0 ? "devi ricevere" : "devi restituire"}</Text>
                            <Text style={[styles.totalAmountText, { color: totalAmount >= 0 ? ThemeColors.green : ThemeColors.danger }]}>{Math.abs(totalAmount)} {event.mainCurrency.symbol}</Text>
                        </VStack>
                    </Row>
                </Pressable>
            </Swipeable>
        </GestureHandlerRootView>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        flexWrap: 'wrap',
        maxWidth: '100%',
        paddingHorizontal: 5,        
        paddingVertical: 10,
        backgroundColor: ThemeColors.white
    },
    dateContainer: {
        flex: 1,
        flexDirection: 'column'
    },
    daysContainer: {
        flex: 1
    },
    eventNameContainer: {
        flex: 7,
        paddingLeft: 10,
    },
    totalAmountContainer: {
        justifyContent: 'center',
        flex: 3
    },
    totalAmountText: {
        textAlign: 'right',
        fontSize: 12
    },
    day: {
        alignSelf: 'center',
        fontSize: 10
    },
    eventName: {
        fontSize: 15,
        fontWeight: 'bold'
    },
    eventDescription: {

    },    
    swipedRow: {
        flexDirection: 'row',
        flex: 1,
        alignItems: 'center',
        paddingLeft: 5,
        backgroundColor: '#d0342c',
        minHeight: 50,
    },
    deleteConfirmationText: {
        color: '#fcfcfc',
        fontWeight: 'bold',
        alignSelf: 'center'
    },
    deleteButton: {
        backgroundColor: '#b60000',
        flexDirection: 'column',
        justifyContent: 'center',
        height: '100%',
    },
    deleteButtonText: {
        color: '#fcfcfc',
        fontWeight: 'bold',
        padding: 3,
    },
    swipedConfirmationContainer: {
        flex: 1,
    },
});