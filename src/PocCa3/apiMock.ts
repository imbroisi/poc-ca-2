
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
      { portfolioIndex: 0, attributeIndex: 1, firstDayDate: '04/03/2023', lastDayDate: '12/31/2023' },
      { portfolioIndex: 2, attributeIndex: 2, firstDayDate: '06/15/2023', lastDayDate: '08/30/2023' },
      { portfolioIndex: 0, attributeIndex: 1, firstDayDate: '03/01/2024', lastDayDate: '03/15/2024' },
      { portfolioIndex: 0, attributeIndex: 1, firstDayDate: '08/15/2024', lastDayDate: '03/15/2025' },
      { portfolioIndex: 0, attributeIndex: 0, firstDayDate: '10/16/2024', lastDayDate: '12/31/2024' },
      { portfolioIndex: 1, attributeIndex: 1, firstDayDate: '01/01/2024', lastDayDate: '03/20/2024' },
    ],
  };
};