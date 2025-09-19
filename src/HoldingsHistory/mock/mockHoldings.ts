import { Holding } from "../types/expandTypes";

// Holdings and attributes MUST always have unique ids. A single attribute from one holding SHOULD NEVER have the same id as another attribute from a different holding. Otherwise this may cause unintended bugs
export const mockHoldings: Holding[] = [
  // {
  //   "holdingId": number,
  //   "marsHoldingId": number,
  //   "holdingName": string,
  //   "clientId": string, // "0240"
  //   "inceptionDate": "2025-07-29T03:00:00.000Z",
  //   "valueLinks": [
  //     {
  //       "attributeId": number,
  //       "valueLinkId": number,
  //       "attributeValueId": number,
  //       "label": "[<AttributeValue value>] <business value>",
  //       "startEffectiveDate": "2025-07-29T03:00:00.000Z",
  //       "endEffectiveDate": "2025-08-17T03:00:00.000Z",
  //     },
  //   ],
  // },
  // {
  //   "holdingId": number,
  //   "marsHoldingId": number,
  //   "holdingName": string,
  //   "clientId": string, // "0240"
  //   "valueLinks": [
  //     {
  //       "attributeId": number,
  //       "valueLinkId": number,
  //       "label": "[<AttributeValue value>] <business value>",
  //       "startEffectiveDate": "2025-07-29T03:00:00.000Z",
  //       "endEffectiveDate": "2025-08-17T03:00:00.000Z",
  //     },
  //   ]
  // },

];
