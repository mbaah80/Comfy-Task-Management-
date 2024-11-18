import React from 'react';
import { render, screen } from '@testing-library/react';
import { Provider } from 'react-redux';
import App from './App';
import { store } from './redux/store'; // Assuming you have a Redux store file

test('renders learn react link', () => {
  render(
      <Provider store={store}>
        <App />
      </Provider>
  );
  const linkElement = screen.getByText(/learn react/i);
  expect(linkElement).toBeInTheDocument();
});
