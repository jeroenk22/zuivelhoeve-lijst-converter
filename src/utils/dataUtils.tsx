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

// Plaatsnamen capitalizen
export function capitalizeColumn(data: any[][], columnIndex: number): any[][] {
  const nieuweData = [...data];
  for (let i = 0; i < nieuweData.length; i++) {
    const rij = nieuweData[i];
    if (rij[columnIndex] !== undefined && typeof rij[columnIndex] === 'string') {
      const woorden = rij[columnIndex].split(" ");
      const gekapitaliseerdeWoorden = woorden.map((woord: string) => {
        if (woord === woord.toUpperCase()) {
          return woord.charAt(0) + woord.slice(1).toLocaleLowerCase();
        }
        return woord;
      });
      rij[columnIndex] = gekapitaliseerdeWoorden.join(" ");
    }
  }
  return nieuweData;
}

// Adres Zuivelhoeve Kijkduin corrigeren
export function updateData(data: any[][]): any[][] {
  const nieuweData = [...data];
  nieuweData.forEach((rij) => {
    if (rij[1] === "Kaas&Delicatessenwinkel Kijkduin BV" && rij[2] === "2554 GX") {
      rij[1] = "Deltaplein 280";
      rij[2] = "2554 GW";
    }
  });
  return nieuweData;
};


