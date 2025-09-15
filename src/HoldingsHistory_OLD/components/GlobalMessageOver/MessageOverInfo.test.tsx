import { render, screen } from '@testing-library/react';
import React from 'react';
import MessageOverInfo from './MessageOverInfo';

describe('MessageOverInfo', () => {
  test('renders title with label', () => {
    render(<MessageOverInfo label="Portfolio A" />);
    expect(screen.getByText(/Informations about Portfolio A/i)).toBeInTheDocument();
  });

  test('renders descriptive paragraphs including label', () => {
    render(<MessageOverInfo label="Attribute X" />);
    expect(screen.getByText('Here we can have all the info')).toBeInTheDocument();
    expect(screen.getByText('about Attribute X.')).toBeInTheDocument();
  });
});
