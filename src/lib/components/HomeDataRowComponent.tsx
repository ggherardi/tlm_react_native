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

interface IHomeDataRow {
    event: BusinessEvent;
    onDelete: Function;
    index: number;
    navigation: any;
}

export const HomeDataRowComponent = ({ event, onDelete, index, navigation }: IHomeDataRow) => {
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
                        <VStack style={[styles.dateContainer, GlobalStyles.selfCenter]}>
                            <Text style={[styles.day]}>{Utility.ToDate(event.startDate as string).getFullYear()}</Text>
                            <Text style={[GlobalStyles.selfCenter]}>{Utility.GetMonthShortName(event.startDate as string)}</Text>
                        </VStack>
                        <VStack style={[styles.dateContainer, GlobalStyles.selfCenter]}>
                            <Text style={[styles.day]}>{Utility.GetNumberOfDaysBetweenDates(event.startDate, event.endDate)}</Text>
                            <Text style={[GlobalStyles.selfCenter]}>gg</Text>
                        </VStack>
                        {event.country != undefined ? (
                            <VStack style={styles.eventNameContainer}>
                                <Text style={[styles.eventName]}>{event.name}</Text>
                                <Text style={[styles.eventDescription]} numberOfLines={1}>{event.country?.name}</Text>
                            </VStack>
                        ) : (
                            <Text style={[styles.eventNameContainer, styles.eventName, GlobalStyles.pl10, GlobalStyles.selfCenter]}>{event.name}</Text>
                        )}
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
        padding: 10,
        backgroundColor: ThemeColors.white
    },
    dateContainer: {
        flex: 1,
        flexDirection: 'column' 
    },
    eventNameContainer: {
        flex: 4,
        paddingLeft: 10,
    },
    day: {
        alignSelf: 'center',
        fontSize: 20
    },
    eventName: {
        fontSize: 20,
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