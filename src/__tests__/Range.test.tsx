import React from 'react';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import '@testing-library/jest-dom';
import Range from '../components/Range';
import axios from 'axios';
import MockAdapter from 'axios-mock-adapter';


jest.mock('../hooks/useRange', () => {
  return () => ({
    range: { min: 10, max: 90 },
    setRange: jest.fn(),
    sliderRef: { current: null },
    minBallRef: { current: null },
    maxBallRef: { current: null },
    handleMouseDown: jest.fn(),
  });
});

jest.mock('../hooks/useFetchRange', () => {
  return (apiUrl: string) => {
    if (apiUrl === 'https://demo5865383.mockable.io/normal') {
      return {
        range: { min: 0, max: 100 },
        fixedValues: [],
        loading: false,
        error: null,
      };
    }
    if (apiUrl === 'https://demo5865383.mockable.io/fixed') {
      return {
        range: null,
        fixedValues: [1.99, 5.99, 10.99, 30.99, 50.99, 70.99],
        loading: false,
        error: null,
      };
    }
    return { range: null, fixedValues: [], loading: true, error: null };
  };
});


const mock = new MockAdapter(axios);
mock.onGet('https://demo5865383.mockable.io/normal').reply(200, { min: 0, max: 100 });
mock.onGet('https://demo5865383.mockable.io/fixed').reply(200, [1.99, 5.99, 10.99, 30.99, 50.99, 70.99]);

test('renders Range component (normal type)', async () => {
  render(<Range apiUrl="https://demo5865383.mockable.io/normal" type="normal" />);
  const minLabel = await screen.findByText(/10/i); 
  const maxLabel = await screen.findByText(/90/i); 
  expect(minLabel).toBeInTheDocument();
  expect(maxLabel).toBeInTheDocument();
});



test('allows dragging and changing min and max values (normal type)', async () => {
  render(<Range apiUrl="https://demo5865383.mockable.io/normal" type="normal" />);
  const minBall = screen.getByText(/10/i).closest('div'); 
  const maxBall = screen.getByText(/90/i).closest('div'); 

  if (minBall && maxBall) {
    fireEvent.mouseDown(minBall, { clientX: 0 });
    fireEvent.mouseMove(document, { clientX: 100 });
    fireEvent.mouseUp(document);

    fireEvent.mouseDown(maxBall, { clientX: 0 });
    fireEvent.mouseMove(document, { clientX: 300 });
    fireEvent.mouseUp(document);

 
    const newMin = await screen.findByText(/10/i); 
    const newMax = await screen.findByText(/90/i); 
    expect(newMin).toBeInTheDocument();
    expect(newMax).toBeInTheDocument();
  }
});
