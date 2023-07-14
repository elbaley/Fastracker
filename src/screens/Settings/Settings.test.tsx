import 'react-native';
import React from 'react';
import {Settings} from './Settings';
import {it, describe} from '@jest/globals';
import {screen, fireEvent} from '@testing-library/react-native';
import {renderWithProviders} from '../../utils/test-utils';
import {Mode} from '../../app/appslice';

// Mock FocusAwareStatusBar component
jest.mock('../../components/FocusAwareStatusBar', () => ({
  FocusAwareStatusBar: () => null,
}));

describe('Settings', () => {
  it('renders correctly', () => {
    const initialState = {
      app: {
        remainingTime: 10,
        isStarted: true,
        isFinished: false,
        fastingTime: 12,
        eatingTime: 6,
        mode: 'fasting' as Mode,
        endDate: null,
        _persist: {
          version: 1,
          rehydrated: false,
        },
      },
    };

    renderWithProviders(<Settings />, {preloadedState: initialState});
  });

  // TODO fix act() error
  it('updates eating time correctly', () => {
    const initialState = {
      app: {
        remainingTime: null,
        isStarted: false,
        isFinished: false,
        fastingTime: 12,
        eatingTime: 6,
        mode: 'fasting' as Mode,
        endDate: null,
        _persist: {
          version: 1,
          rehydrated: false,
        },
      },
    };

    const {getByTestId} = renderWithProviders(<Settings />, {
      preloadedState: initialState,
    });

    const updateFastingMenu = getByTestId('update-fasting');

    fireEvent.press(updateFastingMenu);
    const picker = getByTestId('picker');
    fireEvent(picker, 'onValueChange', 3);

    const saveButton = getByTestId('save-button');
    fireEvent.press(saveButton);

    const updatedFastingTime = screen.getByText('3');
    expect(updatedFastingTime).toBeTruthy();
  });
});
