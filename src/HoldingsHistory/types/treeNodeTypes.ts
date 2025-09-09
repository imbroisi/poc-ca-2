export type TreeKey = string;

export interface TreeNodeBase {
  id: TreeKey;            // chave estável e única
  label: string;          // título padrão; sobrescreva no renderer
  children?: TreeNodeBase[];
  // você pode estender esse contrato em seu domínio com generics/composição
}

// Índices úteis para computar visibilidade/ancestralidade sem re-walk custoso
export interface TreeIndex {
  parentOf: Map<TreeKey, TreeKey | null>;
  depthOf: Map<TreeKey, number>;
  childrenOf: Map<TreeKey, TreeKey[]>;
}

/** =========================
 * Estado global de expansão
 * ========================= */

type ExpandState = {
  expanded: ReadonlySet<TreeKey>; // nós expandidos (pais visíveis)
  activeRowId: TreeKey | null;    // opcional: linha ativa/highlight
};

export type ExpandAction =
  | { type: "TOGGLE"; id: TreeKey }
  | { type: "EXPAND"; id: TreeKey }
  | { type: "COLLAPSE"; id: TreeKey }
  | { type: "EXPAND_ALL"; ids: TreeKey[] }
  | { type: "COLLAPSE_ALL" }
  | { type: "SET_ACTIVE"; id: TreeKey | null };