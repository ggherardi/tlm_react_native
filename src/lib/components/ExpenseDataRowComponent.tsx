import React, { useState } from 'react';
import { ExpenseReport } from '../models/ExpenseReport';
import { Pressable, StyleSheet, Text, Alert, Animated, View, TouchableOpacity, TouchableHighlight } from 'react-native';
import { HStack, Image, VStack } from 'native-base';
import { Utility } from '../Utility';
import { GestureHandlerRootView, Swipeable } from 'react-native-gesture-handler';
import { InputSideButton } from './InputSideButtonComponent';
import dataContext from '../models/DataContext';
import GlobalStyles, { ThemeColors } from '../GlobalStyles';
import { BusinessEvent } from '../models/BusinessEvent';

interface IExpenseDataRow {
    expense: ExpenseReport;
    event: BusinessEvent;
    onDelete: Function;
    index: number;
    navigation: any;
}

export const ExpenseDataRowComponent = ({ expense: expense, event, onDelete, index, navigation }: IExpenseDataRow) => {
    const goToExpense = () => {
        // navigation.navigate(Constants.Navigation.EventHome, { expense: expense });
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
                    <Text style={styles.deleteConfirmationText}>Vuoi cancellare la spesa?</Text>
                </View>
                <InputSideButton icon="trash" pressFunction={deleteExpense} iconColor={ThemeColors.white} stretchHeight={true} />
            </View>
        );
    };

    const deleteExpense = () => {
        const onDeleteConfirm = () => {
            dataContext.ExpenseReports.deleteWhere(expense.id);
            onDelete();
            Utility.ShowSuccessMessage("Spesa eliminata correttamente");
        }
        Alert.alert("Conferma cancellazione", "Tutti i dati legati alla spesa verranno rimossi dal dispositivo.", [
            { text: "Ok", onPress: onDeleteConfirm },
            { text: "Annulla", style: "cancel" }
        ]);
    };

    const imageUri = `file:///${expense.photoFilePath}`;

    return (
        <GestureHandlerRootView>
            <Swipeable key={`swipable_${expense.name}_${index}_${Utility.GenerateRandomGuid()}`} renderRightActions={renderRightActions}>
                <Pressable key={`${index}`} onPress={goToExpense} style={({ pressed }) => [styles.container, { opacity: pressed ? 1 : 1 }]}>
                    <View style={[GlobalStyles.flexRow]}>
                        <View style={[styles.expenseDateContainer]}>
                            <VStack>
                                <Text style={[styles.day]}>{Utility.GetDay(expense.date as string)}</Text>
                                <Text style={[styles.day]}>{Utility.GetMonthShortName(expense.date as string)}</Text>
                            </VStack>
                        </View>
                        <View style={[styles.expenseImageContainer]}>
                            {Utility.IsNotNullOrUndefined(expense.photoFilePath) && (
                                <Image alt='noimage' source={{ uri: imageUri }} style={[styles.image]} />
                            )}
                        </View>
                        <View style={[styles.expenseNameContainer]}>
                            {expense.description != undefined && expense.description.length ? (
                                <VStack style={styles.expenseNameContainer}>
                                    <Text style={[styles.expenseName]}>{event.name}</Text>
                                    <Text style={[styles.expenseDescription]} numberOfLines={1}>{expense.description}</Text>
                                </VStack>
                            ) : (
                                <Text style={[styles.expenseName]}>{expense.name}</Text>
                            )}
                        </View>
                        <View style={[styles.expenseAmountContainer]}>
                            <Text style={{ fontSize: 15 }}>{expense.amount.toFixed(2)} {event.mainCurrency?.symbol}</Text>
                        </View>
                    </View>
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
    expenseDateContainer: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'flex-start'
    },
    expenseImageContainer: {
        flex: 2,
        justifyContent: 'center'
    },
    expenseNameContainer: {
        flex: 8,
        justifyContent: 'center',
    },
    expenseAmountContainer: {
        flex: 2,
        justifyContent: 'center'
    },
    day: {
        alignSelf: 'center',
        fontSize: 10
    },
    expenseName: {
        fontSize: 15,
        fontWeight: 'bold'
    },
    expenseDescription: {
        maxWidth: '100%',
        flex: 1
    },
    swipedRow: {
        flexDirection: 'row',
        flex: 1,
        alignItems: 'center',
        paddingLeft: 5,
        backgroundColor: '#d0342c',
        // margin: 20,
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
    image: {
        height: 35,
        width: 35,
        marginRight: 10,
        alignSelf: 'center',
        // marginLeft: 20
        // marginTop: 30,
        borderRadius: 5,
    },
});