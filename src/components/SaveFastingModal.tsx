import React from 'react';
import {StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import Modal from 'react-native-modal';
import {setShowSaveModal} from '../app/appslice';
import auth from '@react-native-firebase/auth';
import firestore from '@react-native-firebase/firestore';
import Ionicons from 'react-native-vector-icons/Ionicons';
import {useAppDispatch, useAppSelector} from '../app/store';
const SaveFastingModal = () => {
  const dispatch = useAppDispatch();
  const {endDate, fastingTime} = useAppSelector(state => state.app);
  const fastingCollectionRef = firestore().collection('fasting');

  async function handleSave() {
    const user = auth().currentUser;
    if (endDate && user) {
      // add fasting session to firebase
      try {
        await fastingCollectionRef.add({
          date: firestore.Timestamp.fromDate(new Date(endDate)),
          duration: fastingTime,
          userId: user.uid,
        });

        dispatch(setShowSaveModal(false));
      } catch (error) {
        console.log(error);
      }
    }
  }
  return (
    <Modal
      onBackdropPress={() => dispatch(setShowSaveModal(false))}
      backdropOpacity={0.8}
      isVisible={true}>
      <View style={styles.container}>
        <Text style={styles.title}>End Fasting</Text>
        <TouchableOpacity
          onPress={() => dispatch(setShowSaveModal(false))}
          style={styles.closeBtn}>
          <Ionicons name="close-circle-outline" size={44} color={'white'} />
        </TouchableOpacity>
        <Text style={styles.message}>
          Would you like to save your fasting sesssion?
        </Text>
        <TouchableOpacity onPress={handleSave} style={styles.saveBtn}>
          <Text style={styles.saveBtnText}>Save</Text>
        </TouchableOpacity>
      </View>
    </Modal>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#25272b',
    height: 200,
    borderRadius: 16,
    padding: 16,
    justifyContent: 'space-evenly',
    position: 'relative',
  },
  title: {
    color: 'white',
    fontSize: 18,
    fontWeight: 'bold',
  },
  closeBtn: {
    position: 'absolute',
    top: 16,
    right: 10,
  },
  message: {
    color: 'white',
    fontSize: 16,
    paddingTop: 0,
  },
  saveBtn: {
    backgroundColor: '#FF002E',
    paddingVertical: 10,
    borderRadius: 10,
  },
  saveBtnText: {
    color: 'white',
    fontSize: 16,
    textAlign: 'center',
  },
});

export default SaveFastingModal;
