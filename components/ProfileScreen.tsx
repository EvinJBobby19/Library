import {Image, Text, View} from 'react-native';
import {useAuth0} from 'react-native-auth0';

const ProfileScreen = () => {
  const {user} = useAuth0();

  return (
    <>
      {user && (
        <View style={{alignItems: 'center', rowGap: 10, marginTop: 100}}>
          <View>
            <Image
              source={{uri: user.picture}}
              style={{width: 100, height: 100, borderRadius: 30, marginTop: 20}}
            />
          </View>
          <View style={{margin: 10}}>
            <Text style={{fontSize: 20, color: 'white'}}>
              Welcome {user.name}
            </Text>
          </View>
        </View>
      )}
      {!user && (
        <View style={{marginBottom: 10}}>
          <Text
            style={{
              color: 'white',
              fontSize: 38,
              fontStyle: 'italic',
              fontWeight: '700',
              justifyContent: 'center',
              marginTop: 180,
            }}>
            Welcome To Althea
          </Text>
        </View>
      )}
    </>
  );
};
export default ProfileScreen;
