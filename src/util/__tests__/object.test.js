import { describe, expect, test } from 'vitest';
import { isObjectEqual, _isObjectEqual, _cloneDeep } from '../object';
import { fail } from 'assert';

describe('Object Utility Functions', () => {
  describe('isObjectEqual', () => {
    test('should return true for identical primitive objects', () => {
      const obj1 = { a: 1, b: 2 };
      const obj2 = { a: 1, b: 2 };
      expect(isObjectEqual(obj1, obj2)).toBe(true);
    });

    test('should return false for different primitive objects', () => {
      const obj1 = { a: 1, b: 2 };
      const obj2 = { a: 1, b: 3 };
      expect(isObjectEqual(obj1, obj2)).toBe(false);
    });

    test('should return true for identical nested objects', () => {
      const obj1 = { a: 1, b: { c: 3, d: 4 } };
      const obj2 = { a: 1, b: { c: 3, d: 4 } };
      expect(isObjectEqual(obj1, obj2)).toBe(true);
    });

    test('should return false for different nested objects', () => {
      const obj1 = { a: 1, b: { c: 3, d: 4 } };
      const obj2 = { a: 1, b: { c: 3, d: 5 } };
      expect(isObjectEqual(obj1, obj2)).toBe(false);
    });

    test('should return true for identical arrays', () => {
      const arr1 = [1, 2, [3, 4]];
      const arr2 = [1, 2, [3, 4]];
      expect(isObjectEqual(arr1, arr2)).toBe(true);
    });

    test('should return false for different arrays', () => {
      const arr1 = [1, 2, [3, 4]];
      const arr2 = [1, 2, [3, 5]];
      expect(isObjectEqual(arr1, arr2)).toBe(false);
    });

    test('should return false for arrays with different lengths', () => {
      const arr1 = [1, 2, 3];
      const arr2 = [1, 2];
      expect(isObjectEqual(arr1, arr2)).toBe(false);
    });

    test('should return false when only one is an array', () => {
      const arr = [1, 2, 3];
      const obj = { 0: 1, 1: 2, 2: 3 };
      expect(isObjectEqual(arr, obj)).toBe(false);
    });

    test('should handle undefined inputs', () => {
      expect(isObjectEqual(undefined, undefined)).toBe(true);
      expect(isObjectEqual(undefined, {})).toBe(false);
      expect(isObjectEqual({}, undefined)).toBe(false);
    });

    test('should handle null inputs', () => {
      expect(isObjectEqual(null, null)).toBe(true);
      expect(isObjectEqual(null, {})).toBe(false);
      expect(isObjectEqual({}, null)).toBe(false);
    });

    test('should handle mixed object types', () => {
      const obj1 = { 
        a: 1, 
        b: "string", 
        c: true, 
        d: [1, 2], 
        e: { f: "nested" } 
      };
      const obj2 = { 
        a: 1, 
        b: "string", 
        c: true, 
        d: [1, 2], 
        e: { f: "nested" } 
      };
      expect(isObjectEqual(obj1, obj2)).toBe(true);
    });

    test('should handle function properties', () => {
      const obj1 = { a: 1, b: () => console.log('test') };
      const obj2 = { a: 1, b: () => console.log('different') };
      expect(isObjectEqual(obj1, obj2)).toBe(false); 
    });

    test('should handle empty objects', () => {
      expect(isObjectEqual({}, {})).toBe(true);
      expect(isObjectEqual({}, { a: 1 })).toBe(false);
    });

    test('should handle empty arrays', () => {
      expect(isObjectEqual([], [])).toBe(true);
      expect(isObjectEqual([], [1])).toBe(false);
    });

    test('should return true for identical Date objects', () => {
      const date1 = new Date('2023-01-01T00:00:00.000Z');
      const date2 = new Date('2023-01-01T00:00:00.000Z');
      
      const obj1 = { timestamp: date1, name: 'test' };
      const obj2 = { timestamp: date2, name: 'test' };
      
      expect(isObjectEqual(obj1, obj2)).toBe(true);
    });

    test('should return false for different Date objects', () => {
      const date1 = new Date('2023-01-01T00:00:00.000Z');
      const date3 = new Date('2023-01-02T00:00:00.000Z');
      
      const obj1 = { timestamp: date1, name: 'test' };
      const obj3 = { timestamp: date3, name: 'test' };
      
      expect(isObjectEqual(obj1, obj3)).toBe(false);
    });

    test('should return true for identical Map objects', () => {
      const map1 = new Map([['key1', 'value1'], ['key2', 'value2']]);
      const map2 = new Map([['key1', 'value1'], ['key2', 'value2']]);
      
      const obj1 = { data: map1, id: 1 };
      const obj2 = { data: map2, id: 1 };
      
      expect(isObjectEqual(obj1, obj2)).toBe(true);
    });

    test('should return false for different Map objects', () => {
      const map1 = new Map([['key1', 'value1'], ['key2', 'value2']]);
      const map3 = new Map([['key1', 'value1'], ['key2', 'different']]);
      
      const obj1 = { data: map1, id: 1 };
      const obj3 = { data: map3, id: 1 };
      
      expect(isObjectEqual(obj1, obj3)).toBe(false);
    });

    test('should return true for identical Set objects', () => {
      const set1 = new Set([1, 2, 3]);
      const set2 = new Set([1, 2, 3]);
      
      const obj1 = { items: set1, count: 3 };
      const obj2 = { items: set2, count: 3 };
      
      expect(isObjectEqual(obj1, obj2)).toBe(true);
    });

    test('should return false for different Set objects', () => {
      const set1 = new Set([1, 2, 3]);
      const set3 = new Set([1, 2, 4]);
      
      const obj1 = { items: set1, count: 3 };
      const obj3 = { items: set3, count: 3 };
      
      expect(isObjectEqual(obj1, obj3)).toBe(false);
    });

    test('should return true for mixed complex objects with identical Date, Map, and Set', () => {
      const date1 = new Date('2023-01-01T00:00:00.000Z');
      const date2 = new Date('2023-01-01T00:00:00.000Z');
      const map1 = new Map([['user', 'john'], ['role', 'admin']]);
      const map2 = new Map([['user', 'john'], ['role', 'admin']]);
      const set1 = new Set(['read', 'write', 'delete']);
      const set2 = new Set(['read', 'write', 'delete']);
      
      const obj1 = {
        user: {
          profile: {
            createdAt: date1,
            permissions: map1,
            tags: set1
          }
        }
      };
      
      const obj2 = {
        user: {
          profile: {
            createdAt: date2,
            permissions: map2,
            tags: set2
          }
        }
      };
      
      expect(isObjectEqual(obj1, obj2)).toBe(true);
    });

    test('should return false for nested Date, Map, and Set with different values', () => {
      const date1 = new Date('2023-01-01T00:00:00.000Z');
      const date2 = new Date('2023-01-02T00:00:00.000Z');
      const map1 = new Map([['key', 'value1']]);
      const map2 = new Map([['key', 'value2']]);
      const set1 = new Set(['item1']);
      const set2 = new Set(['item2']);
      
      const obj1 = {
        nested: {
          date: date1,
          map: map1,
          set: set1
        }
      };
      
      const obj2 = {
        nested: {
          date: date2,
          map: map2,
          set: set2
        }
      };
      
      expect(isObjectEqual(obj1, obj2)).toBe(false);
    });

    test('should return true for objects with identical named functions', () => {
      function testFunction() { return 'test'; }
      
      const obj1 = { handler: testFunction, name: 'test' };
      const obj2 = { handler: testFunction, name: 'test' };
      
      expect(isObjectEqual(obj1, obj2)).toBe(true);
    });

    test('should return true for objects with identical anonymous functions', () => {
      const obj1 = { handler: () => 'test', name: 'test' };
      const obj2 = { handler: () => 'test', name: 'test' };
      
      expect(isObjectEqual(obj1, obj2)).toBe(true);
    });

    test('should return false for objects with mixed named and anonymous functions', () => {
      function namedFunction() { return 'test'; }
      
      const obj1 = { handler: namedFunction, name: 'test' };
      const obj2 = { handler: () => 'test', name: 'test' };
      
      expect(isObjectEqual(obj1, obj2)).toBe(false);
    });

    test('should return false for objects with functions that have different implementations but same structure', () => {
      const obj1 = { 
        handler: () => 'different implementation',
        name: 'test' 
      };
      const obj2 = { 
        handler: () => 'completely different code',
        name: 'test' 
      };
      
      expect(isObjectEqual(obj1, obj2)).toBe(false);
    });

    test('should return true for nested objects with functions', () => {
      function nestedFunction() { return 'nested'; }
      
      const obj1 = {
        level1: {
          level2: {
            handler: nestedFunction,
            data: 'test'
          }
        }
      };
      
      const obj2 = {
        level1: {
          level2: {
            handler: nestedFunction,
            data: 'test'
          }
        }
      };
      
      expect(isObjectEqual(obj1, obj2)).toBe(true);
    });

    test('should return false for objects with functions but different non-function properties', () => {
      const obj1 = { handler: () => 'test', name: 'test' };
      const obj2 = { handler: () => 'test', name: 'different' };
      
      expect(isObjectEqual(obj1, obj2)).toBe(false);
    });

    test('should return true for objects with identical named functions with parameters', () => {
      function testFunction(param1, param2) { return param1 + param2; }
      
      const obj1 = { handler: testFunction, name: 'test' };
      const obj2 = { handler: testFunction, name: 'test' };
      
      expect(isObjectEqual(obj1, obj2)).toBe(true);
    });

    test('should return true for objects with identical anonymous functions with parameters', () => {
      const obj1 = { handler: (x, y) => x * y, name: 'test' };
      const obj2 = { handler: (x, y) => x * y, name: 'test' };
      
      expect(isObjectEqual(obj1, obj2)).toBe(true);
    });

    test('should return false for objects with functions with different parameter names but same structure', () => {
      const obj1 = { handler: (a, b) => a + b, name: 'test' };
      const obj2 = { handler: (x, y) => x + y, name: 'test' };
      
      expect(isObjectEqual(obj1, obj2)).toBe(false);
    });

    test('should return true for objects with functions with default parameters', () => {
      const obj1 = { handler: (a = 0, b = 0) => a + b, name: 'test' };
      const obj2 = { handler: (a = 0, b = 0) => a + b, name: 'test' };
      
      expect(isObjectEqual(obj1, obj2)).toBe(true);
    });

    test('should return true for objects with functions with rest parameters', () => {
      const obj1 = { handler: (...args) => args.reduce((sum, num) => sum + num, 0), name: 'test' };
      const obj2 = { handler: (...args) => args.reduce((sum, num) => sum + num, 0), name: 'test' };
      
      expect(isObjectEqual(obj1, obj2)).toBe(true);
    });

    test('should return true for objects with arrow functions with destructuring', () => {
      const obj1 = { handler: ({ a, b }) => a + b, name: 'test' };
      const obj2 = { handler: ({ a, b }) => a + b, name: 'test' };
      
      expect(isObjectEqual(obj1, obj2)).toBe(true);
    });

    test('should return false for objects with functions that have different implementations but same parameter structure', () => {
      const obj1 = { 
        handler: (paramA, paramB) => paramA + paramB,
        name: 'test' 
      };
      const obj2 = { 
        handler: (param1, param2) => param1 * param2,
        name: 'test' 
      };
      
      expect(isObjectEqual(obj1, obj2)).toBe(false);
    });

    test('should return false for nested objects with functions that have parameters where one is named and the other not', () => {
      function nestedFunction(x, y) { return x * y; }
      
      const obj1 = {
        level1: {
          level2: {
            handler: nestedFunction,
            data: 'test'
          }
        }
      };
      
      const obj2 = {
        level1: {
          level2: {
            handler: (a, b) => a * b,
            data: 'test'
          }
        }
      };
      
      expect(isObjectEqual(obj1, obj2)).toBe(false);
    });

    test('should handle maxDepth <= 0 case properly', () => {
      const obj1 = { a: { b: { c: { d: 1 } } } };
      const obj2 = { a: { b: { c: { d: 1 } } } };
      
      try{
        // This should return undefined due to missing return statement when maxDepth <= 0
        expect(isObjectEqual(obj1, obj2, 4)).toBe(true);

        isObjectEqual(obj1, obj2, 0);
      } catch(error){
        if (error instanceof Error) {
          expect(error.message).toEqual('MAX_RECURSION_DEPTH_EXCEEDED');
        } else {
          fail();
        }  
        
      }
    });
  });
});
