import React from 'react';
import { BusinessEvent } from '../models/Event';
import { Pressable, StyleSheet, Text } from 'react-native';
import { HStack, VStack } from 'native-base';
import { Utility } from '../Utility';
import GlobalStyles from '../GlobalStyles';

interface IHomeDataRow {
    event: BusinessEvent;
    onPress: Function;
    index: number;
}

export const HomeDataRow = ({ event, onPress, index }: IHomeDataRow) => {
    return (
        <Pressable key={index} onPress={() => { onPress() }} style={({ pressed }) => [styles.container, { opacity: pressed ? 0.2 : 1 }]}>
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