import {StatusBar} from 'react-native';
import {useIsFocused} from '@react-navigation/native';

interface FocusAwareStatusBarProps {
  backgroundColor: string;
  barStyle: 'light-content' | 'dark-content';
}

export function FocusAwareStatusBar(props: FocusAwareStatusBarProps) {
  const isFocused = useIsFocused();

  return isFocused ? <StatusBar {...props} /> : null;
}
