import {
  Alert,
  BackHandler,
  Image,
  ImageBackground,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import LoginButton from './LoginButton';
import LogoutButton from './LogoutButton';
import ProfileScreen from './ProfileScreen';
import {useAuth0} from 'react-native-auth0';
import {useEffect} from 'react';

function LoginScreen({navigation}: {navigation: any}) {
  const {user} = useAuth0();



  useEffect(() => {
    
    const backAction = () => {
      if(navigation.getState().index){
        return false
      }
      Alert.alert('Hold on!', 'Are you sure you want to exit app?', [
        {
          text: 'Cancel',
          onPress: () => null,
          style: 'cancel',
        },
        {text: 'YES', onPress: () => BackHandler.exitApp()},
      ]);
      return true;
    };

    const backHandler = BackHandler.addEventListener(
      'hardwareBackPress',
      backAction,
    );

    return () => backHandler.remove();
  }, []);

  return (
    <ImageBackground
      source={{
        uri: 'https://w0.peakpx.com/wallpaper/913/991/HD-wallpaper-books-aesthetic-booklover-fancy-moody.jpg',
      }}
      resizeMode="cover">
      <View
        style={{
          alignItems: 'center',
          height: '100%',
          width: '100%',
        }}>
        <View style={{width: '100%', backgroundColor: 'black'}}>
          <Image
            source={{
              uri: 'https://static.wixstatic.com/media/e385df_f27e08ae6a804d6eb6a31bcb0f59fec0~mv2.png/v1/fill/w_240,h_136,al_c,q_85,usm_0.66_1.00_0.01,enc_auto/e385df_f27e08ae6a804d6eb6a31bcb0f59fec0~mv2.png',
            }}
            style={{height: 120, objectFit: 'contain'}}
          />
        </View>
        <ProfileScreen />
        {!user && <LoginButton />}
        {user && <LogoutButton />}
        {user && (
          <View
            style={{
              backgroundColor: 'gainsboro',
              padding: 10,
              width: 200,
              alignItems: 'center',
            }}>
            <TouchableOpacity onPress={() => navigation.navigate('TabNav')}>
              <Text>Go to Library</Text>
            </TouchableOpacity>
          </View>
        )}
      </View>
    </ImageBackground>
  );
}
export default LoginScreen;
