
export const delay = (ms: number): Promise<void> => {
  return new Promise(resolve => setTimeout(resolve, ms));
};

export const apiGetLinksData = async () => {
  // simulate network delay
  await delay(500);

  return {
    today: new Date(),

    // TODO: replace by the real api response
    data: [
      { portfolioIndex: 0, attributeIndex: 1, firstDayDate: '08/03/2023', lastDayDate: '08/01/2024' },
      { portfolioIndex: 0, attributeIndex: 1, firstDayDate: '08/02/2024', lastDayDate: '02/14/2025' },
      { portfolioIndex: 0, attributeIndex: 1, firstDayDate: '02/15/2025', lastDayDate: 'today' },
      { portfolioIndex: 0, attributeIndex: 0, firstDayDate: '10/16/2024', lastDayDate: 'today' },
      { portfolioIndex: 1, attributeIndex: 1, firstDayDate: '02/01/2025', lastDayDate: 'today' },
      { portfolioIndex: 2, attributeIndex: 2, firstDayDate: '12/15/2024', lastDayDate: 'today' },
    ],
  };
};