import 'react-native';
import React from 'react';

import {it, describe} from '@jest/globals';

import {render, screen, fireEvent} from '@testing-library/react-native';
import Countdown from './Countdown';
import {Provider} from 'react-redux';
import store from '../app/store';

describe('Countdown', () => {
  it('renders correctly', () => {
    render(
      <Provider store={store}>
        <Countdown value={60} mode="fasting" />
      </Provider>,
    );
  });
  it('shows correct remaining time', async () => {
    render(
      <Provider store={store}>
        <Countdown value={60} mode="fasting" />
      </Provider>,
    );

    let remainingText = screen.getByText(/:/);
    expect(remainingText.props.children).toBe('00:01:00');
  });
});
