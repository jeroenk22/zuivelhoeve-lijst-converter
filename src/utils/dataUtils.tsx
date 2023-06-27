export function filterData(data: any[][]): any[][] {
  // Filter de gegevens op basis van kolom I
  const gefilterdeData = data.filter((rij, rowIndex) => {
    // Vervang 'kolomIndex' door het juiste indexnummer van kolom I (0-gebaseerd)
    const kolomIndex = 8; // Index van kolom I is 8 (0-gebaseerd)

    const celWaarde = rij[kolomIndex];

    // Voer de filterlogica uit om rijen met 0 of lege waarden in kolom I te verwijderen
    return celWaarde !== '' && celWaarde !== 0;
  });

  return gefilterdeData;
}

export function removeEntry(data: any[][], index: number): any[][] {
  const nieuweData = [...data];
  nieuweData.splice(index, 1);
  return nieuweData;
}

export function removeFirstEntry(data: any[][]): any[][] {
  return removeEntry(data, 0);
}

export function removeLastEntry(data: any[][]): any[][] {
  return removeEntry(data, data.length - 1);
}
