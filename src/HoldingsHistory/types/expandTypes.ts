// istanbul ignore file
export type HoldingId = string;
export type AttributeId = string;
export type TreeKey = string;

export interface TreeNodeBase {
  id: TreeKey;
  label: string; 
  children?: TreeNodeBase[];
}

export interface Attribute {
  id: AttributeId; // AttrValueId
  parentId: HoldingId;
  name: string;
  inceptionDate: string; // ISO ou yyyy/mm/dd //
}
export interface ValueLink {
  attributeId: number;
  valueLinkId: number;
  attributeValueId: number | null;
  label: string;
  startEffectiveDate: string;
  endEffectiveDate: string;
}

export interface Holding {
  holdingId: number;
  marsHoldingId: number;
  holdingName: string;
  clientId: string;
  name: string;
  inceptionDate: string;
  attributes: Attribute[];
  valueLinks: ValueLink[];
}

export type VisibleLeftRow =
  | { kind: "holding"; holdingId: HoldingId; depth: 0; primaryLabel: React.ReactNode; secondaryLabel: React.ReactNode; hasChildren: boolean }
  | { kind: "attribute"; holdingId: HoldingId; attributeId: AttributeId; depth: 1; primaryLabel: React.ReactNode; secondaryLabel: React.ReactNode; hasChildren: false };
  