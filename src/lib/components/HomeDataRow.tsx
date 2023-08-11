import React, { useState } from 'react';
import { BusinessEvent } from '../models/Event';
import { Pressable, StyleSheet, Text, Alert, Animated, View, TouchableOpacity } from 'react-native';
import { HStack, VStack } from 'native-base';
import { Utility } from '../Utility';
import GlobalStyles from '../GlobalStyles';
import { SwipeRow } from 'react-native-swipe-list-view';
import { GestureHandlerRootView, Swipeable } from 'react-native-gesture-handler';

interface IHomeDataRow {
    event: BusinessEvent;
    onPress: Function;
    index: number;
}

export const HomeDataRow = ({ event, onPress, index }: IHomeDataRow) => {
    const [feedback, setFeedback] = useState('');
    return (
        <GestureHandlerRootView>
            <Swipeable>
                <Swipeable renderRightActions={renderRightActions}>
                <Pressable key={`${index}`} onPress={() => { onPress() }} style={({ pressed }) => [styles.container, { backgroundColor: 'white', opacity: pressed ? 1 : 1 }]}>
                 <HStack space={4}>
                     <VStack space={2}>
                         <Text style={[styles.day]}>{Utility.GetDay(event.startDate as string)}</Text>
                         <Text>{Utility.GetMonthShortName(event.startDate as string)}</Text>
                     </VStack>
                     <Text style={{ textAlignVertical: 'center' }}>-</Text>
                     <VStack space={2}>
                         <Text style={[styles.day]}>{Utility.GetDay(event.endDate as string)}</Text>
                         <Text>{Utility.GetMonthShortName(event.endDate as string)}</Text>
                     </VStack>
                     <VStack>
                         <Text style={[styles.day]}>{event.name} + {feedback}</Text>
                     </VStack>
                 </HStack>
             </Pressable>
                </Swipeable>
            </Swipeable>
        </GestureHandlerRootView>
        // @ts-ignore
        // <SwipeRow key={`swiperow_${index}`} leftActivationValue={10} onSwipeValueChange={(swipeData) => setFeedback(swipeData.key)}>
        //     <Pressable key={`${index}_hidden`} onPress={() => { onPress() }} style={({ pressed }) => [styles.container, { backgroundColor: 'red', opacity: pressed ? 0.2 : 1 }]}>
        //         <HStack space={4}>
        //             <VStack space={2}>
        //                 <Text style={[styles.day]}>{Utility.GetDay(event.startDate as string)}</Text>
        //                 <Text>{Utility.GetMonthShortName(event.startDate as string)}</Text>
        //             </VStack>
        //             <Text style={{ textAlignVertical: 'center' }}>-</Text>
        //             <VStack space={2}>
        //                 <Text style={[styles.day]}>{Utility.GetDay(event.endDate as string)}</Text>
        //                 <Text>{Utility.GetMonthShortName(event.endDate as string)}</Text>
        //             </VStack>
        //             <VStack>
        //                 <Text style={[styles.day]}>{event.name}</Text>
        //             </VStack>
        //         </HStack>
        //     </Pressable>
        //     <Pressable key={`${index}`} onPress={() => { onPress() }} style={({ pressed }) => [styles.container, { backgroundColor: 'white', opacity: pressed ? 1 : 1 }]}>
        //         <HStack space={4}>
        //             <VStack space={2}>
        //                 <Text style={[styles.day]}>{Utility.GetDay(event.startDate as string)}</Text>
        //                 <Text>{Utility.GetMonthShortName(event.startDate as string)}</Text>
        //             </VStack>
        //             <Text style={{ textAlignVertical: 'center' }}>-</Text>
        //             <VStack space={2}>
        //                 <Text style={[styles.day]}>{Utility.GetDay(event.endDate as string)}</Text>
        //                 <Text>{Utility.GetMonthShortName(event.endDate as string)}</Text>
        //             </VStack>
        //             <VStack>
        //                 <Text style={[styles.day]}>{event.name} + {feedback}</Text>
        //             </VStack>
        //         </HStack>
        //     </Pressable>
        // </SwipeRow>
    )
}

// const styles = StyleSheet.create({
//     container: {
//         padding: 20
//     },
//     day: {
//         alignSelf: 'center',
//         fontSize: 20
//     }
// });

const styles = StyleSheet.create({
    container: {
        flex: 1,
        minHeight: 300,
    },
    row: {
        flexDirection: 'row',
        flex: 1,
        alignItems: 'center',
        paddingLeft: 5,
        backgroundColor: '#efefef',
        margin: 20,
        minHeight: 50,
    },
    swipedRow: {
        flexDirection: 'row',
        flex: 1,
        alignItems: 'center',
        paddingLeft: 5,
        backgroundColor: '#818181',
        margin: 20,
        minHeight: 50,
    },
    swipedConfirmationContainer: {
        flex: 1,
    },
    deleteConfirmationText: {
        color: '#fcfcfc',
        fontWeight: 'bold',
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
});

const renderRightActions = (
    progress: Animated.AnimatedInterpsolation,
    dragAnimatedValue: Animated.AnimatedInterpolation,
) => {
    const opacity = dragAnimatedValue.interpolate({
        inputRange: [-150, 0],
        outputRange: [1, 0],
        extrapolate: 'clamp',
    });
    return (
        <View style={styles.swipedRow}>
            <View style={styles.swipedConfirmationContainer}>
                <Text style={styles.deleteConfirmationText}>Are you sure?</Text>
            </View>
            <Animated.View style={[styles.deleteButton, { opacity }]}>
                <TouchableOpacity>
                    <Text style={styles.deleteButtonText}>Delete</Text>
                </TouchableOpacity>
            </Animated.View>
        </View>
    );
};