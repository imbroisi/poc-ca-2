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
  inceptionDate: string; // ISO ou dd/MM/yyyy // MUDAR PRA START DATE
  // isDisable?: // pra indicar qual é editável
}

export interface Holding {
  id: HoldingId;
  name: string;
  inceptionDate: string;
  attributes: Attribute[];
}

export type VisibleLeftRow =
  | { kind: "holding"; holdingId: HoldingId; depth: 0; primaryLabel: React.ReactNode; secondaryLabel: React.ReactNode; hasChildren: boolean }
  | { kind: "attribute"; holdingId: HoldingId; attributeId: AttributeId; depth: 1; primaryLabel: React.ReactNode; secondaryLabel: React.ReactNode; hasChildren: false };
  