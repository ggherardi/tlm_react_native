import React, { useState } from 'react';
import { BusinessEvent } from '../models/BusinessEvent';
import { Pressable, StyleSheet, Text, Alert, Animated, View, TouchableOpacity, TouchableHighlight } from 'react-native';
import { HStack, VStack } from 'native-base';
import { Utility } from '../Utility';
import { GestureHandlerRootView, Swipeable } from 'react-native-gesture-handler';
import { InputSideButton } from './InputSideButtonComponent';
import dataContext from '../models/DataContext';
import GlobalStyles, { ThemeColors } from '../GlobalStyles';
import { Constants } from '../Constants';

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
                <InputSideButton icon="trash" pressFunction={deleteEvent} iconStyle={{ color: ThemeColors.white }} stretchHeight={true} />
            </View>
        );
    };
    const deleteEvent = () => {
        const onDeleteConfirm = () => {
            dataContext.Events.deleteWhere(event.id);
            onDelete();
        }
        Alert.alert("Conferma cancellazione", "Tutti i dati legati all'evento verranno rimossi dal dispositivo.", [
            { text: "Ok", onPress: onDeleteConfirm },
            { text: "Annulla", style: "cancel" }
        ]);
    };
    return (
        <GestureHandlerRootView>
            <Swipeable renderRightActions={renderRightActions}>
                <Pressable key={`${index}`} onPress={goToEvent} style={({ pressed }) => [styles.container, { opacity: pressed ? 1 : 1 }]}>
                    <HStack space={1}>
                        <VStack space={2}>
                            <Text style={[styles.day]}>{Utility.GetDay(event.startDate as string)}</Text>
                            <Text>{Utility.GetMonthShortName(event.startDate as string)}</Text>
                        </VStack>
                        <Text style={{ textAlignVertical: 'center' }}>-</Text>
                        <VStack space={2}>
                            <Text style={[styles.day]}>{Utility.GetDay(event.endDate as string)}</Text>
                            <Text>{Utility.GetMonthShortName(event.endDate as string)}</Text>
                        </VStack>
                        {event.description != undefined && event.description.length ? (
                            <VStack style={styles.eventNameContainer}>
                                <Text style={[styles.eventName]}>{event.name}</Text>
                                <View style={{ }}>
                                    <Text style={[styles.eventDescription]} numberOfLines={1}>{event.description}</Text>
                                </View>
                            </VStack>
                        ) : (
                            <Text style={[styles.eventName, GlobalStyles.pl10, GlobalStyles.selfCenter]}>{event.name}</Text>
                        )}
                    </HStack>
                </Pressable>
            </Swipeable>
        </GestureHandlerRootView>
    )
}

const styles = StyleSheet.create({
    container: {        
        maxWidth: '90%',
        padding: 20,
        backgroundColor: ThemeColors.white
    },
    eventNameContainer: {
        paddingLeft: 10,
        paddingTop: 5
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
        maxWidth: '100%',
        flex: 1
        // overflow: 'hidden'
    },
    swipedRow: {
        flexDirection: 'row',
        flex: 1,
        alignItems: 'center',
        paddingLeft: 5,
        backgroundColor: '#d0342c',
        margin: 20,
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