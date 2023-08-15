import { useIsFocused } from "@react-navigation/native";
import { useRef, useState } from "react";
import { StyleSheet, Text, View } from "react-native";
import { Camera, CameraDevice, parsePhysicalDeviceTypes, useCameraDevices } from "react-native-vision-camera"

const CameraComponent = () => {
    const [authorized, setAuthorized] = useState(false);

    const managePermissions = async () => {
        let cameraPermission = await Camera.getCameraPermissionStatus()
        if (cameraPermission == "not-determined") {
            cameraPermission = await Camera.requestCameraPermission();
        }
        switch (cameraPermission) {
            case "authorized":
                setAuthorized(true);
                // setAuthorized(true);
                break;
            case "denied":
            // Linking API            
            case "restricted":
                // Restricted on IOS (i.e. parental control)
                break;
        }
    }

    managePermissions();
    const devices = useCameraDevices();
    const device = devices.back;
    const camera = useRef<Camera>(null)
    const isFocused = useIsFocused();
    if (authorized && device) {
        return (
            <View style={StyleSheet.absoluteFill}>
                <Camera
                    ref={camera}
                    style={{ flex: 1 }}
                    device={device as CameraDevice}
                    isActive={isFocused}
                    photo={true} />
            </View>
        );
    } else if (!authorized) {
        return (
            <Text>Per utilizzare la fotocamera, fornire le autorizzazioni dal menu delle impostazioni del dispositivo</Text>
        )
    } else {
        return (
            <Text>Caricamento..</Text>
        )
    }
}

export default CameraComponent;