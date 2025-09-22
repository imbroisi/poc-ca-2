/* istanbul ignore file */
import { mockHoldings } from "./mock/mockHoldings";

export const delay = (ms: number): Promise<void> => {
  return new Promise(resolve => setTimeout(resolve, ms));
};

export const apiGetLinksData = async () => {
  // simulate network delay
  await delay(500);

  return {
    // today: new Date(),

    // TODO: replace by the real api response
    data: {
      today: new Date(),
      holdings: mockHoldings  

      // [
      //   { label: '[92] Woodtiger, LP', portfolioIndex: 0, attributeIndex: 0, firstDayDate: '2024-10-16', lastDayDate: 'today', holdingId: "holding-001", attributeId: "attr-001" },
      //   { label: 'Tradable 1', portfolioIndex: 0, attributeIndex: 0, firstDayDate: '2023-08-03', lastDayDate: '2024-10-15', holdingId: "holding-001", attributeId: "attr-002" },
      //   { portfolioIndex: 0, attributeIndex: 1, firstDayDate: '2025-02-15', lastDayDate: 'today', holdingId: "holding-001", attributeId: "attr-002" },
      //   { portfolioIndex: 0, attributeIndex: 2, firstDayDate: '2024-10-16', lastDayDate: 'today', holdingId: "holding-001", attributeId: "attr-001" },
      //   { portfolioIndex: 0, attributeIndex: 3, firstDayDate: '2024-10-16', lastDayDate: 'today', holdingId: "holding-001", attributeId: "attr-001" },
      //   { portfolioIndex: 0, attributeIndex: 4, firstDayDate: '2024-09-16', lastDayDate: 'today', holdingId: "holding-001", attributeId: "attr-001" },
      //   { portfolioIndex: 0, attributeIndex: 5, firstDayDate: '2023-10-16', lastDayDate: 'today', holdingId: "holding-001", attributeId: "attr-001" },
      //   { portfolioIndex: 0, attributeIndex: 6, firstDayDate: '2024-10-16', lastDayDate: 'today', holdingId: "holding-001", attributeId: "attr-001" },
      //   { portfolioIndex: 0, attributeIndex: 7, firstDayDate: '2024-10-16', lastDayDate: 'today', holdingId: "holding-001", attributeId: "attr-001" },
      //   { portfolioIndex: 0, attributeIndex: 8, firstDayDate: '2024-05-16', lastDayDate: 'today', holdingId: "holding-001", attributeId: "attr-001" },
      //   { portfolioIndex: 1, attributeIndex: 0, firstDayDate: '2025-02-01', lastDayDate: 'today', holdingId: "holding-002", attributeId: "attr-011" },
      //   { portfolioIndex: 1, attributeIndex: 1, firstDayDate: '2025-02-01', lastDayDate: 'today', holdingId: "holding-002", attributeId: "attr-011" },
      //   { portfolioIndex: 1, attributeIndex: 8, firstDayDate: '2025-02-01', lastDayDate: 'today', holdingId: "holding-002", attributeId: "attr-011" },
      //   { portfolioIndex: 2, attributeIndex: 0, firstDayDate: '2024-12-15', lastDayDate: 'today', holdingId: "holding-003", attributeId: "attr-012" },
      //   { portfolioIndex: 2, attributeIndex: 2, firstDayDate: '2024-12-15', lastDayDate: 'today', holdingId: "holding-003", attributeId: "attr-012" },
      //   { portfolioIndex: 2, attributeIndex: 8, firstDayDate: '2024-12-15', lastDayDate: 'today', holdingId: "holding-003", attributeId: "attr-012" },
      //   { portfolioIndex: 19, attributeIndex: 0, firstDayDate: '2023-08-03', lastDayDate: 'today', holdingId: "holding-001", attributeId: "attr-002" },
      // ],
    },
  };
};

// export const getHoldingsAndAttributesListData = async () => {
//   // simulate network delay
//   await delay(500);
//   return {
//     data: mockHoldings || [],
//   }
// }