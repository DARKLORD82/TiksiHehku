import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import FollowButton from './FollowButton';
import ProfilePicture from './ProfilePicture';

const UserCard = ({ user, onFollowToggle }) => (
  <View style={styles.card}>
    <ProfilePicture uri={user.photoURL} onPress={() => {}} />
    <Text style={styles.name}>{user.displayName}</Text>
    <FollowButton isFollowing={user.isFollowing} onToggleFollow={() => onFollowToggle(user)} />
  </View>
);

const styles = StyleSheet.create({
  card: { flexDirection: 'row', alignItems: 'center', padding: 10 },
  name: { marginLeft: 10, flex: 1 }
});

export default UserCard;
