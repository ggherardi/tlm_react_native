import { useState } from "react";
import { Text, View } from "react-native";
import { Camera, CameraDevice, parsePhysicalDeviceTypes, useCameraDevices } from "react-native-vision-camera"

const CameraComponent = () => {
    const [authorized, setAuthorized] = useState(false);
    const [device, setDevice] = useState();

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
        console.log(cameraPermission);
        console.log("authorized: ", authorized);
        if (authorized) {
            const devices = await Camera.getAvailableCameraDevices();
            // const deviceType = parsePhysicalDeviceTypes(devices);
            console.log(devices);
            // const devices = useCameraDevices();
            // console.log("DEVICE: ", devices.back);
            // setDevice(devices.back);
            // console.log("DEVICE: ", device);
        }       
    }

    managePermissions();
    
    return (
        <View>
            {authorized ? (
                <Text></Text>
                // <Camera device={device as CameraDevice} isActive={true}></Camera>
            ) : (
                <Text></Text>
            )}
        </View>);
}

export default CameraComponent;