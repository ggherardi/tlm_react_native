import React from 'react';
import { BusinessEvent } from '../models/Event';
import { Pressable, StyleSheet, Text, Alert } from 'react-native';
import { HStack, VStack } from 'native-base';
import { Utility } from '../Utility';
import GlobalStyles from '../GlobalStyles';
import { SwipeRow } from 'react-native-swipe-list-view';

interface IHomeDataRow {
    event: BusinessEvent;
    onPress: Function;
    index: number;
}

export const HomeDataRow = ({ event, onPress, index }: IHomeDataRow) => {
    return (
        // @ts-ignore
        <SwipeRow>
            <Pressable key={index} onPress={() => { onPress() }} style={({ pressed }) => [styles.container, { backgroundColor: 'red', opacity: pressed ? 0.2 : 1 }]}>
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
                        <Text style={[styles.day]}>{event.name}</Text>
                    </VStack>
                </HStack>
            </Pressable>
            <Pressable key={index} onPress={() => { onPress() }} style={({ pressed }) => [styles.container, {backgroundColor: 'white',  opacity: pressed ? 1 : 1 }]}>
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
                        <Text style={[styles.day]}>{event.name} + test</Text>
                    </VStack>
                </HStack>
            </Pressable>
        </SwipeRow>
    )
}

const styles = StyleSheet.create({
    container: {
        padding: 20
    },
    day: {
        alignSelf: 'center',
        fontSize: 20
    }
});