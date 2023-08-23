import { NativeBaseProvider, VStack } from 'native-base';
import React, { Pressable, StyleSheet, Text, View } from 'react-native';
import GlobalStyles, { ThemeColors } from '../GlobalStyles';
import { color } from 'native-base/lib/typescript/theme/styled-system';
import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome';
import { InputSideButton } from './InputSideButtonComponent';

interface ICustomHeaderComponent {
    title: string;
    subtitle?: string;
}

interface ICustomHeaderSaveButtonComponent {
    title: string;
    subtitle?: string;
    onSave: Function;
    isDisabled: boolean;
}

const BaseCustomHeaderComponent = ({ title, subtitle }: ICustomHeaderComponent) => {
    return (
        <NativeBaseProvider>
            <View>
                {subtitle != undefined && subtitle != "" ? (
                    <VStack>
                        <Text style={[styles.eventName, GlobalStyles.colorWhite]}>{title}</Text>
                        <Text style={[GlobalStyles.colorWhite, { maxWidth: "70%" }]} numberOfLines={1}>{subtitle}</Text>
                    </VStack>
                ) : (
                    <Text style={[styles.eventName, GlobalStyles.colorWhite]}>{title}</Text>
                )}
            </View>
        </NativeBaseProvider>
    );
}

const CustomHeaderSaveButtonComponent = ({ title, subtitle, onSave, isDisabled }: ICustomHeaderSaveButtonComponent) => {
    return (
        <NativeBaseProvider>
            <View style={[{ flex: 1, flexDirection: 'row', justifyContent: 'space-between', width: '75%' }]}>
                <View style={{ flex: 4 }}>
                    {subtitle != undefined && subtitle != "" ? (

                        <VStack>
                            <Text style={[styles.eventName, GlobalStyles.colorWhite]} numberOfLines={1}>{title}</Text>
                            <Text style={[GlobalStyles.colorWhite, { maxWidth: "70%" }]} numberOfLines={1}>{subtitle}</Text>
                        </VStack>
                    ) : (
                        <Text style={[styles.eventName, GlobalStyles.colorWhite]} numberOfLines={1}>{title}</Text>
                    )}
                </View>
                <View style={[{ flex: 1, flexDirection: 'row', justifyContent: 'center' }]}>
                    <InputSideButton icon={"floppy-disk"} iconColor={ThemeColors.white} size={25} pressFunction={() => onSave()} isDisabled={isDisabled} iconStyle={{ color: ThemeColors.white }} />
                </View>
            </View>
        </NativeBaseProvider>
    )
}

const useCustomHeader = (navigation: any, title: string, subtitle?: string) => {
    navigation.setOptions({
        headerTitle: () => <BaseCustomHeaderComponent title={title} subtitle={subtitle} />,
        backgroundColor: ThemeColors.primary,
        statusBarColor: ThemeColors.primary,
        headerStyle: {
            backgroundColor: ThemeColors.primary
        },
        headerTintColor: ThemeColors.white
    })
}

export const useCustomHeaderSaveButton = (navigation: any, title: string, onSave: Function, subtitle?: string, isDisabled?: boolean) => {
    navigation.setOptions({
        headerTitle: () => <CustomHeaderSaveButtonComponent title={title} subtitle={subtitle} onSave={onSave as Function} isDisabled={isDisabled as boolean} />,
        backgroundColor: ThemeColors.primary,
        statusBarColor: ThemeColors.primary,
        headerStyle: {
            backgroundColor: ThemeColors.primary
        },
        headerTintColor: ThemeColors.white
    })
}

const styles = StyleSheet.create({
    eventName: {
        fontSize: 20,
        fontWeight: 'bold'
    },
})

export default useCustomHeader;