/**
 * Create a new element type
 * @param type The type of element to create.
 * @returns The element type symbol.
 */
export function createElementType(type: string): symbol {
  return Symbol(type);
}
