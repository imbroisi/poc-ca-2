import { buildTreeIndex, TreeIndex } from '../buildTreeIndex';
import { TreeNodeBase } from '../../types/expandTypes';

describe('buildTreeIndex', () => {
  describe('empty tree', () => {
    test('should handle empty tree array', () => {
      const result = buildTreeIndex([]);
      
      expect(result.parentOf.size).toBe(0);
      expect(result.depthOf.size).toBe(0);
      expect(result.childrenOf.size).toBe(0);
    });
  });

  describe('single node tree', () => {
    test('should handle single node without children', () => {
      const tree: TreeNodeBase[] = [
        { id: 'root', label: 'Root Node' }
      ];
      
      const result = buildTreeIndex(tree);
      
      expect(result.parentOf.get('root')).toBe(null);
      expect(result.depthOf.get('root')).toBe(0);
      expect(result.childrenOf.get('root')).toEqual([]);
    });

    test('should handle single node with empty children array', () => {
      const tree: TreeNodeBase[] = [
        { id: 'root', label: 'Root Node', children: [] }
      ];
      
      const result = buildTreeIndex(tree);
      
      expect(result.parentOf.get('root')).toBe(null);
      expect(result.depthOf.get('root')).toBe(0);
      expect(result.childrenOf.get('root')).toEqual([]);
    });
  });

  describe('simple tree with children', () => {
    test('should handle tree with one level of children', () => {
      const tree: TreeNodeBase[] = [
        {
          id: 'root',
          label: 'Root Node',
          children: [
            { id: 'child1', label: 'Child 1' },
            { id: 'child2', label: 'Child 2' }
          ]
        }
      ];
      
      const result = buildTreeIndex(tree);
      
      // Root node
      expect(result.parentOf.get('root')).toBe(null);
      expect(result.depthOf.get('root')).toBe(0);
      expect(result.childrenOf.get('root')).toEqual(['child1', 'child2']);
      
      // Child nodes
      expect(result.parentOf.get('child1')).toBe('root');
      expect(result.depthOf.get('child1')).toBe(1);
      expect(result.childrenOf.get('child1')).toEqual([]);
      
      expect(result.parentOf.get('child2')).toBe('root');
      expect(result.depthOf.get('child2')).toBe(1);
      expect(result.childrenOf.get('child2')).toEqual([]);
    });
  });

  describe('complex nested tree', () => {
    test('should handle deeply nested tree structure', () => {
      const tree: TreeNodeBase[] = [
        {
          id: 'root1',
          label: 'Root 1',
          children: [
            {
              id: 'child1',
              label: 'Child 1',
              children: [
                { id: 'grandchild1', label: 'Grandchild 1' },
                {
                  id: 'grandchild2',
                  label: 'Grandchild 2',
                  children: [
                    { id: 'greatgrandchild1', label: 'Great-grandchild 1' }
                  ]
                }
              ]
            },
            { id: 'child2', label: 'Child 2' }
          ]
        },
        {
          id: 'root2',
          label: 'Root 2',
          children: [
            { id: 'child3', label: 'Child 3' }
          ]
        }
      ];
      
      const result = buildTreeIndex(tree);
      
      // Root nodes
      expect(result.parentOf.get('root1')).toBe(null);
      expect(result.depthOf.get('root1')).toBe(0);
      expect(result.childrenOf.get('root1')).toEqual(['child1', 'child2']);
      
      expect(result.parentOf.get('root2')).toBe(null);
      expect(result.depthOf.get('root2')).toBe(0);
      expect(result.childrenOf.get('root2')).toEqual(['child3']);
      
      // First level children
      expect(result.parentOf.get('child1')).toBe('root1');
      expect(result.depthOf.get('child1')).toBe(1);
      expect(result.childrenOf.get('child1')).toEqual(['grandchild1', 'grandchild2']);
      
      expect(result.parentOf.get('child2')).toBe('root1');
      expect(result.depthOf.get('child2')).toBe(1);
      expect(result.childrenOf.get('child2')).toEqual([]);
      
      expect(result.parentOf.get('child3')).toBe('root2');
      expect(result.depthOf.get('child3')).toBe(1);
      expect(result.childrenOf.get('child3')).toEqual([]);
      
      // Second level children
      expect(result.parentOf.get('grandchild1')).toBe('child1');
      expect(result.depthOf.get('grandchild1')).toBe(2);
      expect(result.childrenOf.get('grandchild1')).toEqual([]);
      
      expect(result.parentOf.get('grandchild2')).toBe('child1');
      expect(result.depthOf.get('grandchild2')).toBe(2);
      expect(result.childrenOf.get('grandchild2')).toEqual(['greatgrandchild1']);
      
      // Third level children
      expect(result.parentOf.get('greatgrandchild1')).toBe('grandchild2');
      expect(result.depthOf.get('greatgrandchild1')).toBe(3);
      expect(result.childrenOf.get('greatgrandchild1')).toEqual([]);
    });
  });

  describe('tree with multiple root nodes', () => {
    test('should handle multiple root nodes correctly', () => {
      const tree: TreeNodeBase[] = [
        { id: 'root1', label: 'Root 1' },
        { id: 'root2', label: 'Root 2' },
        { id: 'root3', label: 'Root 3' }
      ];
      
      const result = buildTreeIndex(tree);
      
      // All should be root nodes (parent = null, depth = 0)
      expect(result.parentOf.get('root1')).toBe(null);
      expect(result.depthOf.get('root1')).toBe(0);
      expect(result.childrenOf.get('root1')).toEqual([]);
      
      expect(result.parentOf.get('root2')).toBe(null);
      expect(result.depthOf.get('root2')).toBe(0);
      expect(result.childrenOf.get('root2')).toEqual([]);
      
      expect(result.parentOf.get('root3')).toBe(null);
      expect(result.depthOf.get('root3')).toBe(0);
      expect(result.childrenOf.get('root3')).toEqual([]);
    });
  });

  describe('tree integrity', () => {
    test('should create consistent maps with all nodes accounted for', () => {
      const tree: TreeNodeBase[] = [
        {
          id: 'a',
          label: 'A',
          children: [
            {
              id: 'b',
              label: 'B',
              children: [
                { id: 'd', label: 'D' },
                { id: 'e', label: 'E' }
              ]
            },
            { id: 'c', label: 'C' }
          ]
        }
      ];
      
      const result = buildTreeIndex(tree);
      const expectedNodes = ['a', 'b', 'c', 'd', 'e'];
      
      // All maps should have the same size
      expect(result.parentOf.size).toBe(expectedNodes.length);
      expect(result.depthOf.size).toBe(expectedNodes.length);
      expect(result.childrenOf.size).toBe(expectedNodes.length);
      
      // All expected nodes should be present in all maps
      expectedNodes.forEach(nodeId => {
        expect(result.parentOf.has(nodeId)).toBe(true);
        expect(result.depthOf.has(nodeId)).toBe(true);
        expect(result.childrenOf.has(nodeId)).toBe(true);
      });
    });
  });

  describe('return type validation', () => {
    test('should return correct TreeIndex structure', () => {
      const tree: TreeNodeBase[] = [
        { id: 'test', label: 'Test' }
      ];
      
      const result = buildTreeIndex(tree);
      
      // Check that result has correct structure
      expect(result).toHaveProperty('parentOf');
      expect(result).toHaveProperty('depthOf');
      expect(result).toHaveProperty('childrenOf');
      
      // Check that properties are Maps
      expect(result.parentOf).toBeInstanceOf(Map);
      expect(result.depthOf).toBeInstanceOf(Map);
      expect(result.childrenOf).toBeInstanceOf(Map);
    });
  });
});
