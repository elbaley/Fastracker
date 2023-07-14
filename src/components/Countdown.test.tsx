import 'react-native';
import React from 'react';

import {it, describe} from '@jest/globals';

import {render, screen} from '@testing-library/react-native';
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
  it.each([
    [60, 'fasting', '00:01:00'],
    [62, 'fasting', '00:01:02'],
    [90, 'fasting', '00:01:30'],
  ])('show correct time for each', (value, mode, expectedTime) => {
    render(
      <Provider store={store}>
        <Countdown value={value} mode={mode} />
      </Provider>,
    );

    let remainingText = screen.getByText(/:/);
    expect(remainingText.props.children).toBe(expectedTime);
  });
});
