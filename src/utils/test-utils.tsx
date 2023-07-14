import React, {PropsWithChildren} from 'react';
import {render, RenderOptions} from '@testing-library/react-native';
import {configureStore, PreloadedState} from '@reduxjs/toolkit';
import {Provider} from 'react-redux';

import {AppStore, RootState} from '../app/store';
import appReducer from '../app/appslice';

interface ExtendedRenderOptions extends Omit<RenderOptions, 'queries'> {
  preloadedState?: PreloadedState<RootState>;
  store?: AppStore;
}

export function renderWithProviders(
  ui: React.ReactElement,
  {
    preloadedState,
    store = configureStore({reducer: {app: appReducer}, preloadedState}),
    ...renderOptions
  }: ExtendedRenderOptions = {},
) {
  function Wrapper({children}: PropsWithChildren<{}>): JSX.Element {
    return <Provider store={store}>{children}</Provider>;
  }

  return {
    store,
    ...render(ui, {wrapper: Wrapper, ...renderOptions}),
  };
}
