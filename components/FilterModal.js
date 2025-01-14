import {
  Modal,
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  TouchableWithoutFeedback,
} from 'react-native';

const FilterModal = ({
  visible,
  onClose,
  onSortAtoZ,
  onSortZtoA,
  onSortPriceAsc,
  onSortPriceDesc,
}) => {
  return (
    <Modal
      visible={visible}
      animationType="slide"
      transparent
      onRequestClose={onClose}>
      <TouchableWithoutFeedback onPress={onClose}>
        <View style={styles.overlay}>
          <TouchableWithoutFeedback>
            <View style={styles.modalContent}>
              <Text style={styles.title}>Sort By</Text>
              <TouchableOpacity onPress={onSortAtoZ} style={styles.button}>
                <Text>A to Z</Text>
              </TouchableOpacity>
              <TouchableOpacity onPress={onSortZtoA} style={styles.button}>
                <Text>Z to A</Text>
              </TouchableOpacity>
              <TouchableOpacity onPress={onSortPriceAsc} style={styles.button}>
                <Text>Price: Low to High</Text>
              </TouchableOpacity>
              <TouchableOpacity onPress={onSortPriceDesc} style={styles.button}>
                <Text>Price: High to Low</Text>
              </TouchableOpacity>
            </View>
          </TouchableWithoutFeedback>
        </View>
      </TouchableWithoutFeedback>
    </Modal>
  );
};

const styles = StyleSheet.create({
  overlay: {
    flex: 1,
    backgroundColor: 'rgba(0,0,0,0.5)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  modalContent: {
    backgroundColor: 'white',
    padding: 20,
    borderRadius: 10,
    width: '80%',
  },
  title: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  button: {
    paddingVertical: 10,
  },
});

export default FilterModal;
