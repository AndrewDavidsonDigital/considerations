import { describe, it, expect } from 'vitest';
import { dataURItoBlob } from '../image';

describe('dataURItoBlob', () => {
  it('should convert a PNG data URI to a Blob', () => {
    const pngDataURI = 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAYAAAAfFcSJAAAADUlEQVR42mP8z8BQDwAEhQGAhKmMIQAAAABJRU5ErkJggg==';
    const blob = dataURItoBlob(pngDataURI);
    
    expect(blob).toBeInstanceOf(Blob);
    expect(blob.type).toBe('image/png');
    expect(blob.size).toBeGreaterThan(0);
  });

  it('should convert a JPEG data URI to a Blob', () => {
    const jpegDataURI = 'data:image/jpeg;base64,/9j/4AAQSkZJRgABAQEAYABgAAD/2wBDAAgGBgcGBQgHBwcJCQgKDBQNDAsLDBkSEw8UHRofHh0aHBwgJC4nICIsIxwcKDcpLDAxNDQ0Hyc5PTgyPC4zNDL/2wBDAQkJCQwLDBgNDRgyIRwhMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjL/wAARCAAIAAoDASIAAhEBAxEB/8QAFQABAQAAAAAAAAAAAAAAAAAAAAb/xAAUEAEAAAAAAAAAAAAAAAAAAAAA/8QAFQEBAQAAAAAAAAAAAAAAAAAAAAX/xAAUEQEAAAAAAAAAAAAAAAAAAAAA/9oADAMBAAIRAxEAPwCdABmX/9k=';
    const blob = dataURItoBlob(jpegDataURI);
    
    expect(blob).toBeInstanceOf(Blob);
    expect(blob.type).toBe('image/jpeg');
    expect(blob.size).toBeGreaterThan(0);
  });

  it('should convert an SVG data URI to a Blob', () => {
    const svgDataURI = 'data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHdpZHRoPSIxIiBoZWlnaHQ9IjEiPjxyZWN0IHdpZHRoPSIxIiBoZWlnaHQ9IjEiIGZpbGw9IiNmZmYiLz48L3N2Zz4=';
    const blob = dataURItoBlob(svgDataURI);
    
    expect(blob).toBeInstanceOf(Blob);
    expect(blob.type).toBe('image/svg+xml');
    expect(blob.size).toBeGreaterThan(0);
  });

  it('should return null for empty data URI', () => {
    const emptyDataURI = 'data:image/png;base64,';
    const result = dataURItoBlob(emptyDataURI);
    
    expect(result).toBeNull();
  });

  it('should return null for invalid data URI format', () => {
    const invalidDataURI = 'invalid-data-uri';
    const result = dataURItoBlob(invalidDataURI);
    
    expect(result).toBeNull();
  });

  it('should handle different MIME types', () => {
    const textDataURI = 'data:text/plain;base64,SGVsbG8gV29ybGQ=';
    const blob = dataURItoBlob(textDataURI);
    
    expect(blob).toBeInstanceOf(Blob);
    expect(blob.type).toBe('text/plain');
    expect(blob.size).toBeGreaterThan(0);
  });
}); 