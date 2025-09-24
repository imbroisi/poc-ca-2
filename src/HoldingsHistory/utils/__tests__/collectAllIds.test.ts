import { collectAllIds } from '../collectAllIds';
import { TreeNodeBase } from '../../types/expandTypes';

describe('collectAllIds', () => {
  describe('empty tree', () => {
    test('should return empty array for empty tree', () => {
      const result = collectAllIds([]);
      expect(result).toEqual([]);
    });
  });

  describe('single node tree', () => {
    test('should return single id for single node without children', () => {
      const tree: TreeNodeBase[] = [
        { id: 'root', label: 'Root Node' }
      ];
      
      const result = collectAllIds(tree);
      expect(result).toEqual(['root']);
    });

    test('should return single id for single node with empty children array', () => {
      const tree: TreeNodeBase[] = [
        { id: 'root', label: 'Root Node', children: [] }
      ];
      
      const result = collectAllIds(tree);
      expect(result).toEqual(['root']);
    });

    test('should return single id for single node with undefined children', () => {
      const tree: TreeNodeBase[] = [
        { id: 'root', label: 'Root Node', children: undefined }
      ];
      
      const result = collectAllIds(tree);
      expect(result).toEqual(['root']);
    });
  });

  describe('tree with children', () => {
    test('should collect all ids from tree with one level of children', () => {
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
      
      const result = collectAllIds(tree);
      expect(result).toEqual(['root', 'child1', 'child2']);
    });

    test('should collect all ids in depth-first order', () => {
      const tree: TreeNodeBase[] = [
        {
          id: 'root',
          label: 'Root',
          children: [
            {
              id: 'child1',
              label: 'Child 1',
              children: [
                { id: 'grandchild1', label: 'Grandchild 1' },
                { id: 'grandchild2', label: 'Grandchild 2' }
              ]
            },
            { id: 'child2', label: 'Child 2' }
          ]
        }
      ];
      
      const result = collectAllIds(tree);
      expect(result).toEqual(['root', 'child1', 'grandchild1', 'grandchild2', 'child2']);
    });
  });

  describe('complex nested tree', () => {
    test('should collect all ids from deeply nested tree', () => {
      const tree: TreeNodeBase[] = [
        {
          id: 'a',
          label: 'A',
          children: [
            {
              id: 'b',
              label: 'B',
              children: [
                {
                  id: 'd',
                  label: 'D',
                  children: [
                    { id: 'g', label: 'G' }
                  ]
                },
                { id: 'e', label: 'E' }
              ]
            },
            {
              id: 'c',
              label: 'C',
              children: [
                { id: 'f', label: 'F' }
              ]
            }
          ]
        }
      ];
      
      const result = collectAllIds(tree);
      expect(result).toEqual(['a', 'b', 'd', 'g', 'e', 'c', 'f']);
    });
  });

  describe('multiple root nodes', () => {
    test('should collect ids from multiple root nodes', () => {
      const tree: TreeNodeBase[] = [
        { id: 'root1', label: 'Root 1' },
        { id: 'root2', label: 'Root 2' },
        { id: 'root3', label: 'Root 3' }
      ];
      
      const result = collectAllIds(tree);
      expect(result).toEqual(['root1', 'root2', 'root3']);
    });

    test('should collect all ids from multiple root nodes with children', () => {
      const tree: TreeNodeBase[] = [
        {
          id: 'root1',
          label: 'Root 1',
          children: [
            { id: 'child1', label: 'Child 1' },
            { id: 'child2', label: 'Child 2' }
          ]
        },
        {
          id: 'root2',
          label: 'Root 2',
          children: [
            { id: 'child3', label: 'Child 3' }
          ]
        },
        { id: 'root3', label: 'Root 3' }
      ];
      
      const result = collectAllIds(tree);
      expect(result).toEqual(['root1', 'child1', 'child2', 'root2', 'child3', 'root3']);
    });
  });

  describe('mixed children scenarios', () => {
    test('should handle tree with mixed children (some with children, some without)', () => {
      const tree: TreeNodeBase[] = [
        {
          id: 'root',
          label: 'Root',
          children: [
            { id: 'leaf1', label: 'Leaf 1' }, // No children
            {
              id: 'branch1',
              label: 'Branch 1',
              children: [
                { id: 'leaf2', label: 'Leaf 2' },
                { id: 'leaf3', label: 'Leaf 3' }
              ]
            },
            { id: 'leaf4', label: 'Leaf 4' }, // No children
            {
              id: 'branch2',
              label: 'Branch 2',
              children: []
            }
          ]
        }
      ];
      
      const result = collectAllIds(tree);
      expect(result).toEqual(['root', 'leaf1', 'branch1', 'leaf2', 'leaf3', 'leaf4', 'branch2']);
    });
  });

  describe('id uniqueness and order', () => {
    test('should preserve order of traversal', () => {
      const tree: TreeNodeBase[] = [
        {
          id: 'first',
          label: 'First',
          children: [
            { id: 'first-child', label: 'First Child' }
          ]
        },
        {
          id: 'second',
          label: 'Second',
          children: [
            { id: 'second-child', label: 'Second Child' }
          ]
        }
      ];
      
      const result = collectAllIds(tree);
      expect(result).toEqual(['first', 'first-child', 'second', 'second-child']);
    });

    test('should handle duplicate ids (function doesn\'t deduplicate)', () => {
      // Note: This tests the current behavior - the function doesn't deduplicate
      const tree: TreeNodeBase[] = [
        {
          id: 'duplicate',
          label: 'First',
          children: [
            { id: 'child', label: 'Child' }
          ]
        },
        {
          id: 'duplicate', // Same id as above
          label: 'Second',
          children: [
            { id: 'child', label: 'Another Child' } // Same id as above
          ]
        }
      ];
      
      const result = collectAllIds(tree);
      expect(result).toEqual(['duplicate', 'child', 'duplicate', 'child']);
      expect(result.length).toBe(4); // Should include duplicates
    });
  });

  describe('edge cases', () => {
    test('should handle nodes with various id types (string variations)', () => {
      const tree: TreeNodeBase[] = [
        { id: '', label: 'Empty ID' },
        { id: '123', label: 'Numeric String ID' },
        { id: 'special-chars_$%', label: 'Special Characters ID' },
        {
          id: 'unicode-πάπα',
          label: 'Unicode ID',
          children: [
            { id: '   spaces   ', label: 'ID with spaces' }
          ]
        }
      ];
      
      const result = collectAllIds(tree);
      expect(result).toEqual(['', '123', 'special-chars_$%', 'unicode-πάπα', '   spaces   ']);
    });

    test('should return array (not mutate input)', () => {
      const tree: TreeNodeBase[] = [
        {
          id: 'test',
          label: 'Test',
          children: [
            { id: 'child', label: 'Child' }
          ]
        }
      ];
      
      const originalTree = JSON.parse(JSON.stringify(tree)); // Deep copy
      const result = collectAllIds(tree);
      
      expect(result).toBeInstanceOf(Array);
      expect(tree).toEqual(originalTree); // Tree should not be mutated
    });
  });
});
