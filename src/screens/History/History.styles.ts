import {StyleSheet} from 'react-native/';

export const styles = StyleSheet.create({
  container: {
    flex: 1,
    gap: 20,
    padding: 16,
    backgroundColor: '#25272b',
  },
  startBtn: {
    color: 'white',
    backgroundColor: '#FF002E',
    paddingVertical: 10,
    paddingHorizontal: 15,
    borderRadius: 10,
  },
  startBtnText: {
    color: 'white',
    fontSize: 16,
    fontWeight: '500',
  },
  logCalendar: {
    borderWidth: 1,
    borderColor: 'transparent',
    backgroundColor: '#25272b',
  },
  logContainer: {
    backgroundColor: '#313337',
    flex: 1,
    alignItems: 'center',
    flexDirection: 'row',
    padding: 10,
    marginHorizontal: 10,
    borderRadius: 10,
    marginBottom: 10,
  },
  logDate: {
    color: 'white',
    paddingLeft: 10,
    fontWeight: '500',
    fontSize: 18,
  },
  logType: {
    color: '#6a6c6e',
    paddingLeft: 10,
    paddingTop: 5,
    fontSize: 16,
    fontWeight: '300',
  },
  logDurationContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 3,
    marginLeft: 'auto',
  },
  logDuration: {
    color: 'white',
    fontSize: 24,
    fontWeight: '500',
  },
  logUnit: {
    color: '#6a6c6e',
    fontSize: 16,
    // fontWeight: '400',
  },
});
