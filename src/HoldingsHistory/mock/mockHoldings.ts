import { Holding } from "../types/expandTypes";

// Holdings and attributes MUST always have unique ids. A single attribute from one holding SHOULD NEVER have the same id as another attribute from a different holding. Otherwise this may cause unintended bugs
export const mockHoldings: Holding[] = [
  {
    id: "holding-001",
    name: "Alpha Investing",
    inceptionDate: "2020-03-15",
    attributes: [
      {
        id: "attr-001",
        parentId: "holding-001",
        name: "CRM Service",
        inceptionDate: "2020-03-15"
      },
      {
        id: "attr-002",
        parentId: "holding-001",
        name: "InvestingEntity",
        inceptionDate: "2020-03-15"
      },
      {
        id: "attr-003",
        parentId: "holding-001",
        name: "Holding Contract Type",
        inceptionDate: "2020-03-15"
      },
      {
        id: "attr-004",
        parentId: "holding-001",
        name: "Tradable",
        inceptionDate: "2020-03-15"
      },
      {
        id: "attr-005",
        parentId: "holding-001",
        name: "Holding Type",
        inceptionDate: "2020-03-15"
      },
      {
        id: "attr-006",
        // attributeValueId --> genérico
        parentId: "holding-001",
        name: "Custody Location",
        inceptionDate: "2020-03-15"
      },
      {
        id: "attr-007",
        parentId: "holding-001",
        name: "Cash Account",
        inceptionDate: "2020-03-15"
      },
      {
        id: "attr-008",
        parentId: "holding-001",
        name: "Transfer Account",
        inceptionDate: "2020-03-15"
      },
      {
        id: "attr-009",
        parentId: "holding-001",
        name: "Service Type",
        inceptionDate: "2020-03-15"
      }
    ]
  },
  {
    id: "holding-002",
    name: "Beta Capital",
    inceptionDate: "2019-07-01",
    attributes: [
      {
        id: "attr-010",
        parentId: "holding-002",
        name: "CRM Service",
        inceptionDate: "2020-03-15"
      },
      {
        id: "attr-011",
        parentId: "holding-002",
        name: "InvestingEntity",
        inceptionDate: "2020-03-15"
      },
      {
        id: "attr-012",
        parentId: "holding-002",
        name: "Holding Contract Type",
        inceptionDate: "2020-03-15"
      },
      {
        id: "attr-013",
        parentId: "holding-002",
        name: "Tradable",
        inceptionDate: "2020-03-15"
      },
      {
        id: "attr-014",
        parentId: "holding-002",
        name: "Holding Type",
        inceptionDate: "2020-03-15"
      },
      {
        id: "attr-015",
        parentId: "holding-002",
        name: "Custody Location",
        inceptionDate: "2023-03-15"
      },
      {
        id: "attr-016",
        parentId: "holding-002",
        name: "Cash Account",
        inceptionDate: "2024-03-15"
      },
      {
        id: "attr-017",
        parentId: "holding-002",
        name: "Transfer Account",
        inceptionDate: "2025-08-15"
      },
      {
        id: "attr-018",
        parentId: "holding-002",
        name: "Service Type",
        inceptionDate: "2024-01-31"
      }
    ]
  },
  {
    id: "holding-003",
    name: "Gamma Investing",
    inceptionDate: "2022-01-10",
    attributes: [
      {
        id: "attr-019",
        parentId: "holding-003",
        name: "CRM Service",
        inceptionDate: "2020-03-15"
      },
      {
        id: "attr-020",
        parentId: "holding-003",
        name: "InvestingEntity",
        inceptionDate: "2020-03-15"
      },
      {
        id: "attr-021",
        parentId: "holding-003",
        name: "Holding Contract Type",
        inceptionDate: "2020-03-15"
      },
      {
        id: "attr-022",
        parentId: "holding-003",
        name: "Tradable",
        inceptionDate: "2020-03-15"
      },
      {
        id: "attr-023",
        parentId: "holding-003",
        name: "Holding Type",
        inceptionDate: "2022-10-15"
      },
      {
        id: "attr-024",
        parentId: "holding-003",
        name: "Custody Location",
        inceptionDate: "2024-03-15"
      },
      {
        id: "attr-025",
        parentId: "holding-003",
        name: "Cash Account",
        inceptionDate: "2025-04-16"
      },
      {
        id: "attr-026",
        parentId: "holding-003",
        name: "Transfer Account",
        inceptionDate: "2020-09-01"
      },
      {
        id: "attr-027",
        parentId: "holding-003",
        name: "Service Type",
        inceptionDate: "2023-08-25"
      }
    ]
  }
];
