import React, { useState } from 'react';
import { ExpenseReport } from '../models/ExpenseReport';
import { Pressable, StyleSheet, Text, Alert, Animated, View, TouchableOpacity, TouchableHighlight } from 'react-native';
import { HStack, Image, VStack } from 'native-base';
import { Utility } from '../Utility';
import { GestureHandlerRootView, Swipeable } from 'react-native-gesture-handler';
import { InputSideButton } from './InputSideButtonComponent';
import dataContext from '../models/DataContext';
import GlobalStyles, { ThemeColors } from '../GlobalStyles';

interface IExpenseDataRow {
    expense: ExpenseReport;
    onDelete: Function;
    index: number;
    navigation: any;
}

export const ExpenseDataRowComponent = ({ expense: expense, onDelete, index, navigation }: IExpenseDataRow) => {
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
                <InputSideButton icon="trash" pressFunction={deleteExpense} iconStyle={{ color: ThemeColors.white }} stretchHeight={true} />
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

    const imageUri = `data:image/jpeg;base64,${expense.receiptPhotoBase64}`;

    return (
        <GestureHandlerRootView>
            <Swipeable key={`swipable_${expense.name}_${index}_${Utility.GenerateRandomGuid()}`} renderRightActions={renderRightActions}>
                <Pressable key={`${index}`} onPress={goToExpense} style={({ pressed }) => [styles.container, { opacity: pressed ? 1 : 1 }]}>
                    <HStack space={5}>
                        <VStack space={2}>
                            <Text style={[styles.day]}>{Utility.GetDay(expense.date as string)}</Text>
                            <Text>{Utility.GetMonthShortName(expense.date as string)}</Text>
                        </VStack>
                        {Utility.IsNotNullOrUndefined(expense.receiptPhotoBase64) && (
                            <Image alt='noimage' source={{ uri: imageUri }} style={[styles.image]} />
                        )}
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
    image: {
        height: 50,
        width: 50,
        marginRight: 10,
        alignSelf: 'center',
        // marginLeft: 20
        // marginTop: 30,
        // borderRadius: 10,
    },
});