/* istanbul ignore file */
// import { mockHoldings } from "./mock/mockHoldings";

export const delay = (ms: number): Promise<void> => {
  return new Promise(resolve => setTimeout(resolve, ms));
};

export const apiGetLinksData = async () => {
  // simulate network delay
  await delay(500);

  console.log("POS 1 ===>>>> apiGetLinksData");

  return {
    today: new Date(),

    // TODO: replace by the real api response
    data: [
      { portfolioIndex: 0, attributeIndex: 1, firstDayDate: '2023-08-03', lastDayDate: '2024-08-01', holdingId: "holding-001", attributeId: "attr-002" },
      { portfolioIndex: 0, attributeIndex: 1, firstDayDate: '2024-08-02', lastDayDate: '2025-02-14', holdingId: "holding-001", attributeId: "attr-002" },
      { portfolioIndex: 0, attributeIndex: 1, firstDayDate: '2025-02-15', lastDayDate: 'today', holdingId: "holding-001", attributeId: "attr-002"  },
      { portfolioIndex: 0, attributeIndex: 0, firstDayDate: '2024-10-16', lastDayDate: 'today', holdingId: "holding-001", attributeId: "attr-001" },
      { portfolioIndex: 0, attributeIndex: 2, firstDayDate: '2024-10-16', lastDayDate: 'today', holdingId: "holding-001", attributeId: "attr-001" },
      { portfolioIndex: 0, attributeIndex: 3, firstDayDate: '2024-10-16', lastDayDate: 'today', holdingId: "holding-001", attributeId: "attr-001" },
      { portfolioIndex: 0, attributeIndex: 4, firstDayDate: '2024-10-16', lastDayDate: 'today', holdingId: "holding-001", attributeId: "attr-001" },
      { portfolioIndex: 0, attributeIndex: 5, firstDayDate: '2024-10-16', lastDayDate: 'today', holdingId: "holding-001", attributeId: "attr-001" },
      { portfolioIndex: 0, attributeIndex: 6, firstDayDate: '2024-10-16', lastDayDate: 'today', holdingId: "holding-001", attributeId: "attr-001" },
      { portfolioIndex: 0, attributeIndex: 7, firstDayDate: '2024-10-16', lastDayDate: 'today', holdingId: "holding-001", attributeId: "attr-001" },
      { portfolioIndex: 0, attributeIndex: 9, firstDayDate: '2024-10-16', lastDayDate: 'today', holdingId: "holding-001", attributeId: "attr-001" },
      { portfolioIndex: 0, attributeIndex: 8, firstDayDate: '2024-05-16', lastDayDate: 'today', holdingId: "holding-001", attributeId: "attr-001" },
      { portfolioIndex: 1, attributeIndex: 0, firstDayDate: '2025-02-01', lastDayDate: 'today', holdingId: "holding-002", attributeId: "attr-011"},
      { portfolioIndex: 1, attributeIndex: 1, firstDayDate: '2025-02-01', lastDayDate: 'today', holdingId: "holding-002", attributeId: "attr-011"},
      { portfolioIndex: 1, attributeIndex: 8, firstDayDate: '2025-02-01', lastDayDate: 'today', holdingId: "holding-002", attributeId: "attr-011"},
      { portfolioIndex: 2, attributeIndex: 0, firstDayDate: '2024-12-15', lastDayDate: 'today', holdingId: "holding-003", attributeId: "attr-012" },
      { portfolioIndex: 2, attributeIndex: 2, firstDayDate: '2024-12-15', lastDayDate: 'today', holdingId: "holding-003", attributeId: "attr-012" },
      { portfolioIndex: 2, attributeIndex: 8, firstDayDate: '2024-12-15', lastDayDate: 'today', holdingId: "holding-003", attributeId: "attr-012" },
    ],
  };
};

// export const getHoldingsAndAttributesListData = async () => {
//   // simulate network delay
//   await delay(500);
//   return {
//     data: mockHoldings || [],
//   }
// }