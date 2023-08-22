import { Button, View } from "react-native";
import { useAuth0 } from "react-native-auth0";
import React from "react";
import { useNavigation } from "@react-navigation/native";

const LogoutButton = () => {
    const {clearSession} = useAuth0();
    const Navigator = useNavigation<any>()

    const onPress = async () => {

        try {
            await clearSession();
            Navigator.navigate('navigation')
        } catch (e) {
            console.log(e);
        }
    };

    return <View style={{width:200 , height:50}}>
    <Button onPress={onPress} title="Log Out" />
       </View> 
}

export default LogoutButton