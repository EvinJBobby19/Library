import { Button, View } from "react-native";
import { useAuth0 } from "react-native-auth0";
import React from "react";

const LoginButton = () => {
    const {authorize} = useAuth0();

    const onPress = async () => {
        try {
            await authorize();
        } catch (e) {
            console.log(e);
        }
    };

    return<View style={{width:200 , height:50}}>
 <Button color={'crimson'} onPress={onPress} title="Log in" />
    </View> 
   
}

export default LoginButton