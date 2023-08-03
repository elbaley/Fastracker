import auth from '@react-native-firebase/auth';

export const signInAnonymously = async () => {
  try {
    await auth().signInAnonymously();
    console.log('Anonymous user signed in');
  } catch (error) {
    console.error('Error signing in anonymously:', error);
  }
};

export const signOut = async () => {
  try {
    await auth().signOut();
    console.log('User signed out');
  } catch (error) {
    console.error('Error signing out:', error);
  }
};
