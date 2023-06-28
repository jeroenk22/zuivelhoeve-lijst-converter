import React from 'react';
import { cleanup, render } from '@testing-library/react';
import '@testing-library/jest-dom/extend-expect';
import FilteredData from './FilteredData';

afterEach(cleanup);

describe('FilteredData', () => {
  it('moet de juiste tekst en tabellay-out weergeven', () => {
    const filteredRowCount = 3; // Aantal gefilterde rijen
    const tableData = [
      ['Naam', 'Leeftijd', 'Stad'], // Tabelkop
      ['John', '25', 'New York'], // Eerste rij
      ['Jane', '30', 'Los Angeles'], // Tweede rij
      ['Bob', '40', 'Chicago'], // Derde rij
    ];
    const colliCount = 10; // Aantal colli

    const { getByRole } = render(
      <FilteredData filteredRowCount={filteredRowCount} tableData={tableData} colliCount={colliCount} />
    );

    const filteredRowCountElement = document.querySelector('p');
    expect(filteredRowCountElement).toBeInTheDocument();
    expect(filteredRowCountElement).toHaveTextContent(`Aantal Zuivelhoeve adressen: 3`); // Controleren of de juiste gefilterde rijen tekst wordt weergegeven

    const colliCountElement = document.querySelector('p');
    expect(colliCountElement).toBeInTheDocument();
    expect(colliCountElement).toHaveTextContent(`Totaal aantal colli: 10`); // Controleren of het juiste aantal colli tekst wordt weergegeven

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
