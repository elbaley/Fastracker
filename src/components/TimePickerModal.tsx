import {useState} from 'react';
import Modal from 'react-native-modal';
import {StyleSheet, View, Text, TouchableOpacity} from 'react-native/';
import {Picker} from '@react-native-picker/picker';
import Ionicons from 'react-native-vector-icons/Ionicons';

interface TimePickerModalProps {
  label: string;
  selectedTime: number;
  onChangeTime: (time: number) => void;
}
const TimePickerModal = ({
  label,
  onChangeTime,
  selectedTime,
}: TimePickerModalProps): JSX.Element => {
  const [showModal, setShowModal] = useState(false);

  return (
    <View style={styles.pickerContainer}>
      <TouchableOpacity
        style={styles.label}
        onPress={() => {
          setShowModal(!showModal);
        }}>
        <View style={styles.row}>
          <View>
            <Text style={styles.timeTitle}>{label} Time</Text>
            <Text style={styles.timeValue}>{selectedTime}</Text>
          </View>
          <Ionicons name={'arrow-forward'} size={24} color={'white'} />
        </View>
      </TouchableOpacity>
      <Modal
        style={styles.modal}
        backdropOpacity={0.5}
        onBackdropPress={() => setShowModal(false)}
        // ## TODO add swipe to close functionality!
        // onSwipeComplete={() => setShowModal(false)}
        animationIn="slideInUp"
        animationOut="slideOutDown"
        // swipeDirection={['down']}
        // hasBackdrop={false}
        // coverScreen={false}
        isVisible={showModal}>
        <View style={styles.modalContent}>
          <Text style={styles.modalHeader}>{label} Time</Text>
          <View>
            <Picker
              mode="dropdown"
              dropdownIconColor="white"
              selectedValue={selectedTime}
              onValueChange={itemValue => {
                onChangeTime(itemValue);
              }}>
              {Array.from({length: 24}, (_, index) => (
                <Picker.Item
                  key={index}
                  color="white"
                  label={`${index + 1}`}
                  value={index + 1}
                  style={{
                    backgroundColor: '#292931',
                  }}
                />
              ))}
            </Picker>
          </View>
        </View>
      </Modal>
    </View>
  );
};
export const styles = StyleSheet.create({
  pickerContainer: {
    borderBottomColor: '#3c3c43',
    borderBottomWidth: 1,
  },
  modal: {
    justifyContent: 'flex-end',
    margin: 0,
  },
  modalContent: {
    backgroundColor: '#292931',
    padding: 16,
  },
  modalHeader: {
    color: 'white',
    fontWeight: 'bold',
    fontSize: 16,
    textAlign: 'center',
  },
  label: {
    paddingVertical: 10,
    paddingHorizontal: 5,
    marginVertical: 5,
  },
  timeTitle: {
    color: 'white',
    textTransform: 'uppercase',
    fontSize: 12,
  },
  timeValue: {
    color: 'white',
    fontWeight: 'bold',
    fontSize: 16,
  },
  row: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
});

export default TimePickerModal;
