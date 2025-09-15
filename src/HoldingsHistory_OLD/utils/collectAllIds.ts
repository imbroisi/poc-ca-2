import { TreeKey, TreeNodeBase } from "../types/expandTypes";

export function collectAllIds(tree: TreeNodeBase[]): TreeKey[] {
  const out: TreeKey[] = [];
  const walk = (nodes?: TreeNodeBase[]) => nodes?.forEach((n) => { out.push(n.id); walk(n.children); });
  walk(tree);
  return out;
}