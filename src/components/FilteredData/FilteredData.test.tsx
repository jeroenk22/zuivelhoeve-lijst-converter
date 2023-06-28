import React from 'react';
import { cleanup, render } from '@testing-library/react';
import '@testing-library/jest-dom/extend-expect';
import FilteredData from './FilteredData';

afterEach(cleanup);

describe('FilteredData', () => {
  it('moet de juiste tekst en tabellay-out weergeven', () => {
    const filteredRowCount = 3;
    const tableData = [
      ['Naam', 'Leeftijd', 'Stad'],
      ['John', '25', 'New York'],
      ['Jane', '30', 'Los Angeles'],
      ['Bob', '40', 'Chicago'],
    ];
    const colliCount = 10;

    const { getByRole } = render(
      <FilteredData filteredRowCount={filteredRowCount} tableData={tableData} colliCount={colliCount} />
    );

    const filteredRowCountElement = document.querySelector('p');
    expect(filteredRowCountElement).toBeInTheDocument();
    expect(filteredRowCountElement).toHaveTextContent(`Aantal Zuivelhoeve adressen: 3`);
  
    const colliCountElement = document.querySelector('p');
    expect(colliCountElement).toBeInTheDocument();
    expect(colliCountElement).toHaveTextContent(`Totale aantal colli: 10`);

    // Controleer of de juiste tabelkop en tabelrijen worden weergegeven
    const tableHeader = getByRole('row', { name: '# Naam Leeftijd Stad' });
    const firstRow = getByRole('row', { name: '1 John 25 New York' });
    const secondRow = getByRole('row', { name: '2 Jane 30 Los Angeles' });
    const thirdRow = getByRole('row', { name: '3 Bob 40 Chicago' });

    expect(tableHeader).toBeInTheDocument();
    expect(firstRow).toBeInTheDocument();
    expect(secondRow).toBeInTheDocument();
    expect(thirdRow).toBeInTheDocument();
  });
});
