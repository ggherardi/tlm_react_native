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
                    {/* <HStack space={0}> */}
                    <View style={[GlobalStyles.flexRow, { flex: 1 }]}>
                        <View style={[GlobalStyles.flexRow, { flex: 1 }]}>
                            <VStack space={2}>
                                <Text style={[styles.day]}>{Utility.GetDay(expense.date as string)}</Text>
                                <Text>{Utility.GetMonthShortName(expense.date as string)}</Text>
                            </VStack>
                        </View>
                        <View style={[GlobalStyles.flexRow, { flex: 1 }]}>
                            {Utility.IsNotNullOrUndefined(expense.photoFilePath) && (
                                <Image alt='noimage' source={{ uri: imageUri }} style={[styles.image]} />
                            )}
                        </View>
                        <View style={[GlobalStyles.flexRow, { flex: 3 }]}>
                            {expense.description != undefined && expense.description.length ? (
                                <VStack style={styles.expenseNameContainer}>
                                    <Text style={[styles.expenseName]}>{expense.name}</Text>
                                    <View style={{}}>
                                        <Text style={[styles.expenseDescription]} numberOfLines={1}>{expense.description}</Text>
                                    </View>
                                </VStack>
                            ) : (
                                <Text style={[styles.expenseName, GlobalStyles.pl10, GlobalStyles.selfCenter]}>{expense.name}</Text>
                            )}
                        </View>
                        <View style={[GlobalStyles.flexRow, GlobalStyles.selfCenter, { flex: 2 }]}>
                            <Text style={{ fontSize: 20 }}>{event.mainCurrency?.symbol} {expense.amount}</Text>
                        </View>
                    </View>

                    {/* </HStack> */}
                </Pressable>
            </Swipeable>
        </GestureHandlerRootView>
    )
}

const styles = StyleSheet.create({
    container: {
        maxWidth: '100%',
        padding: 10,
        backgroundColor: ThemeColors.white
    },
    expenseNameContainer: {
        // paddingLeft: 10,
        paddingTop: 5
    },
    day: {
        alignSelf: 'center',
        fontSize: 20
    },
    expenseName: {
        fontSize: 20,
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
        height: 25,
        width: 25,
        marginRight: 10,
        alignSelf: 'center',
        // marginLeft: 20
        // marginTop: 30,
        // borderRadius: 10,
    },
});