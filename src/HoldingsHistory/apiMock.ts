/* istanbul ignore file */
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
      { portfolioIndex: 0, attributeIndex: 1, firstDayDate: '2023-08-03', lastDayDate: '2024-08-01' },
      { portfolioIndex: 0, attributeIndex: 1, firstDayDate: '2024-08-02', lastDayDate: '2025-02-14' },
      { portfolioIndex: 0, attributeIndex: 1, firstDayDate: '2025-02-15', lastDayDate: 'today' },
      { portfolioIndex: 0, attributeIndex: 0, firstDayDate: '2024-10-16', lastDayDate: 'today' },
      { portfolioIndex: 1, attributeIndex: 1, firstDayDate: '2025-02-01', lastDayDate: 'today' },
      { portfolioIndex: 2, attributeIndex: 2, firstDayDate: '2024-12-15', lastDayDate: 'today' },
    ],
  };
};