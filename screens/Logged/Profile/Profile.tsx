import React from "react";
import { Text, View } from "react-native";
import Container from "../../Components/Container/Container";

const Profile = () => {
  const profileBody = () => {
    return (
      <View>
        <Text>Profile</Text>
      </View>
    );
  };

  return <Container display={profileBody} />;
};

export default Profile;
