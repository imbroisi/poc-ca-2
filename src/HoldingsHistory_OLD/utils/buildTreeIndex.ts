import { TreeKey, TreeNodeBase } from "../types/expandTypes";

export interface TreeIndex {
  parentOf: Map<TreeKey, TreeKey | null>;
  depthOf: Map<TreeKey, number>;
  childrenOf: Map<TreeKey, TreeKey[]>;
}

export function buildTreeIndex(tree: TreeNodeBase[]): TreeIndex {
  const parentOf = new Map<TreeKey, TreeKey | null>();
  const depthOf = new Map<TreeKey, number>();
  const childrenOf = new Map<TreeKey, TreeKey[]>();

  const dfs = (nodes: TreeNodeBase[], parent: TreeKey | null, depth: number) => {
    for (const n of nodes) {
      parentOf.set(n.id, parent);
      depthOf.set(n.id, depth);
      if (n.children?.length) {
        childrenOf.set(n.id, n.children.map((c) => c.id));
        dfs(n.children, n.id, depth + 1);
      } else {
        childrenOf.set(n.id, []);
      }
    }
  };
  dfs(tree, null, 0);
  return { parentOf, depthOf, childrenOf };
}