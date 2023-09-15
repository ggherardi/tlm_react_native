import { NativeBaseProvider, VStack } from 'native-base';
import React, { Pressable, StyleSheet, Text, View } from 'react-native';
import GlobalStyles, { ThemeColors } from '../GlobalStyles';
import { color } from 'native-base/lib/typescript/theme/styled-system';
import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome';
import { InputSideButton } from './InputSideButtonComponent';
import { IconProp } from '@fortawesome/fontawesome-svg-core';

interface ICustomHeaderComponent {
    title: string;
    subtitle?: string;
}

interface ICustomHeaderWithButtonComponent {
    title: string;    
    icon: IconProp;
    onClick: Function;
    subtitle?: string;
    isDisabled?: boolean;
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

const CustomHeaderWithButtonComponent = ({ title, subtitle, onClick, icon, isDisabled }: ICustomHeaderWithButtonComponent) => {
    return (
        <NativeBaseProvider>
            <View style={[{ flex: 1, flexDirection: 'row', justifyContent: 'space-between', width: '75%' }]}>
                <View style={{ flex: 2 }}><Text>test</Text></View>
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
                    <InputSideButton icon={icon} iconColor={ThemeColors.white} size={25} pressFunction={() => onClick()} isDisabled={isDisabled} iconStyle={{ color: ThemeColors.white }} />
                </View>
            </View>
        </NativeBaseProvider>
    )
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
    })
}

export const useCustomHeaderWithButton = (navigation: any, title: string, onClick: Function, icon: IconProp, subtitle?: string, isDisabled?: boolean) => {
    navigation.setOptions({
        headerTitle: () => <CustomHeaderWithButtonComponent title={title} icon={icon} subtitle={subtitle} onClick={onClick as Function} isDisabled={isDisabled as boolean} />,
    })
}

export const useCustomHeaderSaveButton = (navigation: any, title: string, onSave: Function, subtitle?: string, isDisabled?: boolean) => {
    navigation.setOptions({
        headerTitle: () => <CustomHeaderSaveButtonComponent title={title} subtitle={subtitle} onSave={onSave as Function} isDisabled={isDisabled as boolean} />,
    })
}

const styles = StyleSheet.create({
    eventName: {
        fontSize: 20,
        fontWeight: 'bold'
    },
})

export default useCustomHeader;