import { Holding } from "../types/expandTypes";

// Holdings and attributes MUST always have unique ids. A single attribute from one holding SHOULD NEVER have the same id as another attribute from a different holding. Otherwise this may cause unintended bugs
export const mockHoldings: Holding[] = [
  {
    "holdingId": 1,
    "marsHoldingId": 2,
    "holdingName": "Alpha Investing",
    "clientId": "0240",
    "inceptionDate": "2025-07-29T03:00:00.000Z",
    "name": "Alpha Investing",
    "attributes": [],
    "valueLinks": [
      {
        "attributeId": 1,
        "valueLinkId": 1,
        "attributeValueId": 1,
        "label": "[Some Attribute Value] Some Business Value 1", // if "" or null means "attribute value = null"
        "startEffectiveDate": "2024-10-17T03:00:00.000Z",
        "endEffectiveDate": "today"
      },
      {
        "attributeId": 1,
        "valueLinkId": 3,
        "attributeValueId": 2,
        "label": "[Some Attribute Value 2] Some Business Value 3",
        "startEffectiveDate": "2023-02-16T03:00:00.000Z",
        "endEffectiveDate": "2024-02-16:00:00.000Z"
      },      
      {
        "attributeId": 1,
        "valueLinkId": 2,
        "attributeValueId": 2,
        "label": "[Some Attribute Value 2] Some Business Value 2",
        "startEffectiveDate": "2024-02-17T03:00:00.000Z",
        "endEffectiveDate": "2024-10-16T03:00:00.000Z"
      },


    ]
  },
  {
    "holdingId": 3,
    "marsHoldingId": 4,
    "holdingName": "Gamma Investing",
    "name": "Gamma Investing",
    "attributes": [],
    "clientId": "0240",
    "inceptionDate": "2025-07-29T03:00:00.000Z",
    "valueLinks": [
      {
        "attributeId": 1,
        "valueLinkId": 1,
        "attributeValueId": null,
        "label": "",
        "startEffectiveDate": "2025-08-17T03:00:00.000Z",
        "endEffectiveDate": "today"
      },
      {
        "attributeId": 1,
        "valueLinkId": 1,
        "attributeValueId": 1,
        "label": "[Some Attribute Value 3] Some Business Value 3",
        "startEffectiveDate": "2024-04-17T03:00:00.000Z",
        "endEffectiveDate": "2025-08-16T03:00:00.000Z"
      },
    ]
  },
  {
    "holdingId": 4,
    "marsHoldingId": 5,
    "holdingName": "Delta Investing",
    "name": "Delta Investing",
    "attributes": [],
    "clientId": "0240",
    "inceptionDate": "2025-07-29T03:00:00.000Z",
    "valueLinks": [
      {
        "attributeId": 4,
        "valueLinkId": 4,
        "attributeValueId": 4,
        "label": "[Some Attribute Value 4] Some Business Value 4",
        "startEffectiveDate": "2024-11-17T03:00:00.000Z",
        "endEffectiveDate": "today"
      }
    ]
  },
  {
    "holdingId": 5,
    "marsHoldingId": 6,
    "holdingName": "Epsilon Partners",
    "name": "Epsilon Partners",
    "attributes": [],
    "clientId": "0241",
    "inceptionDate": "2025-08-01T03:00:00.000Z",
    "valueLinks": [
      {
        "attributeId": 5,
        "valueLinkId": 5,
        "attributeValueId": 5,
        "label": "[Technology Fund] Growth Investment Strategy",
        "startEffectiveDate": "2025-02-15T03:00:00.000Z",
        "endEffectiveDate": "today"
      }
    ]
  },
  {
    "holdingId": 6,
    "marsHoldingId": 7,
    "holdingName": "Zeta Wealth Management",
    "name": "Zeta Wealth Management",
    "attributes": [],
    "clientId": "0242",
    "inceptionDate": "2025-08-02T03:00:00.000Z",
    "valueLinks": [
      {
        "attributeId": 6,
        "valueLinkId": 6,
        "attributeValueId": 6,
        "label": "[Real Estate Portfolio] Property Investment Fund",
        "startEffectiveDate": "2024-12-20T03:00:00.000Z",
        "endEffectiveDate": "today"
      }
    ]
  },
  {
    "holdingId": 7,
    "marsHoldingId": 8,
    "holdingName": "Eta Financial Group",
    "name": "Eta Financial Group",
    "attributes": [],
    "clientId": "0243",
    "inceptionDate": "2025-08-03T03:00:00.000Z",
    "valueLinks": [
      {
        "attributeId": 7,
        "valueLinkId": 7,
        "attributeValueId": 7,
        "label": "[Healthcare Sector] Medical Innovation Fund",
        "startEffectiveDate": "2024-06-25T03:00:00.000Z",
        "endEffectiveDate": "today"
      }
    ]
  },
  {
    "holdingId": 8,
    "marsHoldingId": 9,
    "holdingName": "Theta Investment Solutions",
    "name": "Theta Investment Solutions",
    "attributes": [],
    "clientId": "0244",
    "inceptionDate": "2025-08-04T03:00:00.000Z",
    "valueLinks": [
      {
        "attributeId": 8,
        "valueLinkId": 8,
        "attributeValueId": 8,
        "label": "[Energy Sector] Renewable Energy Portfolio",
        "startEffectiveDate": "2024-06-01T03:00:00.000Z",
        "endEffectiveDate": "today"
      }
    ]
  },
  {
    "holdingId": 9,
    "marsHoldingId": 10,
    "holdingName": "Iota Capital Advisors",
    "name": "Iota Capital Advisors",
    "attributes": [],
    "clientId": "0245",
    "inceptionDate": "2025-08-05T03:00:00.000Z",
    "valueLinks": [
      {
        "attributeId": 9,
        "valueLinkId": 9,
        "attributeValueId": 9,
        "label": "[Banking Sector] Financial Services Fund",
        "startEffectiveDate": "2025-02-05T03:00:00.000Z",
        "endEffectiveDate": "today"
      }
    ]
  },
  {
    "holdingId": 10,
    "marsHoldingId": 11,
    "holdingName": "Kappa Asset Management",
    "name": "Kappa Asset Management",
    "attributes": [],
    "clientId": "0246",
    "inceptionDate": "2025-08-06T03:00:00.000Z",
    "valueLinks": [
      {
        "attributeId": 10,
        "valueLinkId": 10,
        "attributeValueId": 10,
        "label": "[Consumer Goods] Retail Investment Strategy",
        "startEffectiveDate": "2025-04-10T03:00:00.000Z",
        "endEffectiveDate": "today"
      }
    ]
  },
  {
    "holdingId": 11,
    "marsHoldingId": 12,
    "holdingName": "Lambda Venture Capital",
    "name": "Lambda Venture Capital",
    "attributes": [],
    "clientId": "0247",
    "inceptionDate": "2025-08-07T03:00:00.000Z",
    "valueLinks": [
      {
        "attributeId": 2,
        "valueLinkId": 11,
        "attributeValueId": 2,
        "label": "HERE 1[Startup Portfolio] Early Stage Investment Fund",
        "startEffectiveDate": "2025-03-15T03:00:00.000Z",
        "endEffectiveDate": "today"
      },
      {
        "attributeId": 2,
        "valueLinkId": 11,
        "attributeValueId": 2,
        "label": "HERE 1[Startup Portfolio] Early Stage Investment Fund",
        "startEffectiveDate": "2024-03-15T03:00:00.000Z",
        "endEffectiveDate": "2025-03-14T03:00:00.000Z"
      }
    ]
  },
  {
    "holdingId": 12,
    "marsHoldingId": 13,
    "holdingName": "Mu Holdings",
    "name": "Mu Holdings",
    "attributes": [],
    "clientId": "0248",
    "inceptionDate": "2025-08-08T03:00:00.000Z",
    "valueLinks": [
      {
        "attributeId": 3,
        "valueLinkId": 12,
        "attributeValueId": 3,
        "label": "[Infrastructure] Transportation Investment Fund",
        "startEffectiveDate": "2024-10-20T03:00:00.000Z",
        "endEffectiveDate": "today"
      }
    ]
  },
  {
    "holdingId": 13,
    "marsHoldingId": 14,
    "holdingName": "Nu Capital Partners",
    "name": "Nu Capital Partners",
    "attributes": [],
    "clientId": "0249",
    "inceptionDate": "2025-08-09T03:00:00.000Z",
    "valueLinks": [
      {
        "attributeId": 8,
        "valueLinkId": 13,
        "attributeValueId": 8,
        "label": "[Manufacturing] Industrial Growth Fund",
        "startEffectiveDate": "2025-03-25T03:00:00.000Z",
        "endEffectiveDate": "today"
      }
    ]
  },
  {
    "holdingId": 14,
    "marsHoldingId": 15,
    "holdingName": "Xi Investment Group",
    "name": "Xi Investment Group",
    "attributes": [],
    "clientId": "0250",
    "inceptionDate": "2025-08-10T03:00:00.000Z",
    "valueLinks": [
      {
        "attributeId": 1,
        "valueLinkId": 14,
        "attributeValueId": 1,
        "label": "[Telecommunications] Digital Communications Fund",
        "startEffectiveDate": "2024-10-01T03:00:00.000Z",
        "endEffectiveDate": "today"
      }
    ]
  },
  {
    "holdingId": 15,
    "marsHoldingId": 16,
    "holdingName": "Omicron Financial Services",
    "name": "Omicron Financial Services",
    "attributes": [],
    "clientId": "0251",
    "inceptionDate": "2025-08-11T03:00:00.000Z",
    "valueLinks": [
      {
        "attributeId": 9,
        "valueLinkId": 15,
        "attributeValueId": 9,
        "label": "[Insurance Sector] Risk Management Portfolio",
        "startEffectiveDate": "2025-05-05T03:00:00.000Z",
        "endEffectiveDate": "today"
      }
    ]
  },
  {
    "holdingId": 16,
    "marsHoldingId": 17,
    "holdingName": "Pi Wealth Advisors",
    "name": "Pi Wealth Advisors",
    "attributes": [],
    "clientId": "0252",
    "inceptionDate": "2025-08-12T03:00:00.000Z",
    "valueLinks": [
      {
        "attributeId": 2,
        "valueLinkId": 16,
        "attributeValueId": 2,
        "label": "[Entertainment] Media & Content Investment",
        "startEffectiveDate": "2025-05-10T03:00:00.000Z",
        "endEffectiveDate": "today"
      }
    ]
  },
  {
    "holdingId": 17,
    "marsHoldingId": 18,
    "holdingName": "Rho Asset Management",
    "name": "Rho Asset Management",
    "attributes": [],
    "clientId": "0253",
    "inceptionDate": "2025-08-13T03:00:00.000Z",
    "valueLinks": [
      {
        "attributeId": 2,
        "valueLinkId": 17,
        "attributeValueId": 2,
        "label": "[Agriculture] Sustainable Farming Fund",
        "startEffectiveDate": "2024-07-15T03:00:00.000Z",
        "endEffectiveDate": "today"
      }
    ]
  },
  {
    "holdingId": 18,
    "marsHoldingId": 19,
    "holdingName": "Sigma Investment Solutions",
    "name": "Sigma Investment Solutions",
    "attributes": [],
    "clientId": "0254",
    "inceptionDate": "2025-08-14T03:00:00.000Z",
    "valueLinks": [
      {
        "attributeId": 3,
        "valueLinkId": 18,
        "attributeValueId": 3,
        "label": "[Aerospace] Aviation Technology Fund",
        "startEffectiveDate": "2024-11-20T03:00:00.000Z",
        "endEffectiveDate": "today"
      }
    ]
  },
  {
    "holdingId": 19,
    "marsHoldingId": 20,
    "holdingName": "Tau Capital Group",
    "name": "Tau Capital Group",
    "attributes": [],
    "clientId": "0255",
    "inceptionDate": "2025-08-15T03:00:00.000Z",
    "valueLinks": [
      {
        "attributeId": 4,
        "valueLinkId": 19,
        "attributeValueId": 4,
        "label": "[Biotechnology] Life Sciences Portfolio",
        "startEffectiveDate": "2024-07-25T03:00:00.000Z",
        "endEffectiveDate": "today"
      }
    ]
  },
  {
    "holdingId": 20,
    "marsHoldingId": 21,
    "holdingName": "Upsilon Ventures",
    "name": "Upsilon Ventures",
    "attributes": [],
    "clientId": "0256",
    "inceptionDate": "2025-08-16T03:00:00.000Z",
    "valueLinks": [
      {
        "attributeId": 8,
        "valueLinkId": 20,
        "attributeValueId": 8,
        "label": "[Automotive] Electric Vehicle Investment",
        "startEffectiveDate": "2024-11-01T03:00:00.000Z",
        "endEffectiveDate": "today"
      }
    ]
  },
  {
    "holdingId": 21,
    "marsHoldingId": 22,
    "holdingName": "Phi Financial Partners",
    "name": "Phi Financial Partners",
    "attributes": [],
    "clientId": "0257",
    "inceptionDate": "2025-08-17T03:00:00.000Z",
    "valueLinks": [
      {
        "attributeId": 6,
        "valueLinkId": 21,
        "attributeValueId": 6,
        "label": "[Logistics] Supply Chain Optimization Fund",
        "startEffectiveDate": "2025-06-05T03:00:00.000Z",
        "endEffectiveDate": "today"
      }
    ]
  },
  {
    "holdingId": 22,
    "marsHoldingId": 23,
    "holdingName": "Chi Investment Holdings",
    "name": "Chi Investment Holdings",
    "attributes": [],
    "clientId": "0258",
    "inceptionDate": "2025-08-18T03:00:00.000Z",
    "valueLinks": [
      {
        "attributeId": 10,
        "valueLinkId": 22,
        "attributeValueId": 10,
        "label": "[Cybersecurity] Digital Security Portfolio",
        "startEffectiveDate": "2025-05-10T03:00:00.000Z",
        "endEffectiveDate": "today"
      }
    ]
  },
  {
    "holdingId": 23,
    "marsHoldingId": 24,
    "holdingName": "Psi Capital Advisors",
    "name": "Psi Capital Advisors",
    "attributes": [],
    "clientId": "0259",
    "inceptionDate": "2025-08-19T03:00:00.000Z",
    "valueLinks": [
      {
        "attributeId": 3,
        "valueLinkId": 23,
        "attributeValueId": 3,
        "label": "[Education Technology] Learning Innovation Fund",
        "startEffectiveDate": "2025-05-15T03:00:00.000Z",
        "endEffectiveDate": "today"
      }
    ]
  },
  {
    "holdingId": 24,
    "marsHoldingId": 25,
    "holdingName": "Omega Asset Management",
    "name": "Omega Asset Management",
    "attributes": [],
    "clientId": "0260",
    "inceptionDate": "2025-08-20T03:00:00.000Z",
    "valueLinks": [
      {
        "attributeId": 4,
        "valueLinkId": 24,
        "attributeValueId": 4,
        "label": "[Clean Energy] Solar & Wind Investment Portfolio",
        "startEffectiveDate": "2025-04-20T03:00:00.000Z",
        "endEffectiveDate": "today"
      }
    ]
  }
];
