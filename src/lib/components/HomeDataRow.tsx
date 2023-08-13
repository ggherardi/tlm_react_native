import React, { useState } from 'react';
import { BusinessEvent } from '../models/BusinessEvent';
import { Pressable, StyleSheet, Text, Alert, Animated, View, TouchableOpacity } from 'react-native';
import { HStack, VStack } from 'native-base';
import { Utility } from '../Utility';
import GlobalStyles from '../GlobalStyles';
import { SwipeRow } from 'react-native-swipe-list-view';
import { GestureHandlerRootView, Swipeable } from 'react-native-gesture-handler';
import { InputSideButton } from './GenericComponents';
import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome';
import dataContext from '../models/DataContext';

interface IHomeDataRow {
    event: BusinessEvent;
    onPress: Function;
    index: number;
}

export const HomeDataRow = ({ event, onPress, index }: IHomeDataRow) => {
    const [feedback, setFeedback] = useState('');
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
                <InputSideButton icon="trash" pressFunction={deleteEvent} iconStyle={{ color: "#fff" }} stretchHeight={true} />
            </View>
        );
    };
    const deleteEvent = () => {
        let res = dataContext.Events.delete(event.id);
        setFeedback(res);
    };
    return (
        <GestureHandlerRootView>
            <Swipeable renderRightActions={renderRightActions}>
                <Pressable key={`${index}`} onPress={() => { onPress() }} style={({ pressed }) => [styles.container, { backgroundColor: 'white', opacity: pressed ? 1 : 1 }]}>
                    <HStack space={4}>
                        <VStack space={2}>
                            <Text>{Utility.GetMonthShortName(event.startDate as string)}</Text>
                            <Text style={[styles.day]}>{Utility.GetDay(event.startDate as string)}</Text>
                        </VStack>
                        <Text style={{ textAlignVertical: 'center' }}>-</Text>
                        <VStack space={2}>                            
                            <Text>{Utility.GetMonthShortName(event.endDate as string)}</Text>
                            <Text style={[styles.day]}>{Utility.GetDay(event.endDate as string)}</Text>
                        </VStack>
                        <VStack>
                            <Text style={[styles.day]}>{event.name} + {feedback}</Text>
                        </VStack>
                    </HStack>
                </Pressable>
            </Swipeable>
        </GestureHandlerRootView>
    )
}

const styles = StyleSheet.create({
    container: {
        padding: 20
    },
    day: {
        alignSelf: 'center',
        fontSize: 20
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