import React from 'react';

interface FilteredDataProps {
  filteredRowCount: number;
  tableData: any[][];
}

const FilteredData: React.FC<FilteredDataProps> = ({
  filteredRowCount,
  tableData,
}) => {
  // Extracteer de eerste rij van tableData als de tabelkop
  const tableHeader = tableData.length > 0 ? tableData[0] : [];

  // Sla de rest van tableData op als de tabelrijen (exclusief de eerste rij)
  const tableRows = tableData.slice(1);

  return (
    <div>
      <p>Aantal Zuivelhoeve adressen: {filteredRowCount}</p>
      <table>
        <thead>
          <tr>
            <th>#</th>{/* Nieuwe header met '#' */}
            {/* Genereer de <th> elementen met de waarden uit tableHeader */}
            {tableHeader.map((headerCell, index) => (
              <th key={index}>{headerCell}</th>
            ))}
          </tr>
        </thead>
        <tbody>
          {/* Genereer de tabelrijen met de waarden uit tableRows */}
          {tableRows.map((row, rowIndex) => (
            <tr key={rowIndex}>
              <td>{rowIndex + 1}</td>{/* Rijnummer */}
              {row.map((cell, cellIndex) => (
                <td key={cellIndex}>{cell}</td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default FilteredData;
