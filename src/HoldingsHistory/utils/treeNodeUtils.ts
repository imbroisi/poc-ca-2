import { TreeIndex, TreeKey, TreeNodeBase } from "../types/treeNodeTypes";

// Retorna um Set de ids visíveis (útil para a tabela da direita)
export function makeVisibilitySet(tree: TreeNodeBase[], expanded: ReadonlySet<TreeKey>): Set<TreeKey> {
  const visible = new Set<TreeKey>();
  const dfs = (nodes: TreeNodeBase[], parentVisible: boolean) => {
    for (const n of nodes) {
      // raiz sempre visível; filhos visíveis somente se o pai estiver expandido
      const isRoot = !("parent" in n) || parentVisible; // parent implícito
      if (isRoot || parentVisible) {
        visible.add(n.id);
      }
      const canShowChildren = expanded.has(n.id);
      if (n.children?.length) dfs(n.children, canShowChildren && visible.has(n.id));
    }
  };
  dfs(tree, true);
  return visible;
}

// Percorre toda a árvore e coleta ids
export function collectAllIds(tree: TreeNodeBase[]): TreeKey[] {
  const out: TreeKey[] = [];
  const walk = (nodes?: TreeNodeBase[]) => nodes?.forEach((n) => { out.push(n.id); walk(n.children); });
  walk(tree);
  return out;
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

// Achata a árvore em ordem de exibição considerando o estado de expansão
export function flattenVisible(tree: TreeNodeBase[], expanded: ReadonlySet<TreeKey>): Array<{ node: TreeNodeBase; depth: number }>{
  const items: Array<{ node: TreeNodeBase; depth: number }> = [];
  const dfs = (nodes: TreeNodeBase[], depth: number) => {
    for (const n of nodes) {
      items.push({ node: n, depth });
      if (n.children?.length && expanded.has(n.id)) dfs(n.children, depth + 1);
    }
  };
  dfs(tree, 0);
  return items;
}
