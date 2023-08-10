import React from 'react';
import { Pressable, Text } from 'react-native';
import GlobalStyles from '../GlobalStyles';

interface ITLMButtonProps {
    title: string;
    onPress: Function;
    buttonType: TLMButtonType
}

export enum TLMButtonType {
    Primary,
    Secondary
}

export const TLMButton = ({ title, onPress, buttonType }: ITLMButtonProps) => {
    return (
        <Pressable onPress={() => { onPress() }} style={({ pressed }) => [buttonType == TLMButtonType.Primary ? GlobalStyles.btnPrimary : GlobalStyles.btnSecondary, { opacity: pressed ? 0.2 : 1 }]}>
            <Text style={[GlobalStyles.selfCenter]}>{title}</Text>
        </Pressable>
    )
}