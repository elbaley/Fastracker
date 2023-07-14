import 'react-native';
import React from 'react';
import {Home} from './Home';
import {it, describe} from '@jest/globals';
import {screen, fireEvent, act} from '@testing-library/react-native';
import {Mode} from '../../app/appslice';
import {renderWithProviders} from '../../utils/test-utils';

// Mock FocusAwareStatusBar component
jest.mock('../../components/FocusAwareStatusBar', () => ({
  FocusAwareStatusBar: () => null,
}));

// Mock sendScheduledNotification
jest.mock('../../utils/sendScheduledNotification', () => ({
  sendScheduledNotification: jest.fn(),
}));

describe('Home', () => {
  beforeEach(() => {
    jest.useFakeTimers();
  });
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

    renderWithProviders(<Home />, {preloadedState: initialState});
  });

  it('updates countdown correctly', async () => {
    const startDate = Date.now() - 5000; // 5 seconds ago
    const initialState = {
      app: {
        remainingTime: 5,
        isStarted: true,
        isFinished: false,
        fastingTime: 10,
        eatingTime: 6,
        mode: 'fasting' as Mode,
        endDate: startDate + 10000, // 10 seconds from start
        _persist: {
          version: 1,
          rehydrated: false,
        },
      },
    };

    renderWithProviders(<Home />, {preloadedState: initialState});
    let remainingText = screen.getByText(/:/);
    expect(remainingText.props.children).toBe('00:00:05');
    act(() => {
      /* fire events that update state */
      jest.advanceTimersByTime(1000);
    });
    /* assert on the output */
    remainingText = screen.getByText(/:/);
    expect(remainingText.props.children).toBe('00:00:04');
  });

  it('starts fasting when Start button is pressed', () => {
    const initialState = {
      app: {
        remainingTime: null,
        isStarted: false,
        isFinished: false,
        fastingTime: 12,
        eatingTime: 6,
        mode: 'eating' as Mode,
        endDate: null,
        _persist: {
          version: 1,
          rehydrated: false,
        },
      },
    };

    renderWithProviders(<Home />, {preloadedState: initialState});

    const startButton = screen.getByText('Start');
    fireEvent.press(startButton);

    const fastingText = screen.getByText(/You are fasting/);
    expect(fastingText).toBeTruthy();
  });
});
