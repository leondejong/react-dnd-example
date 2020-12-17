import * as R from 'ramda'

// Check if Object, excludes: Array, Date, Null, Set, String, Undefined
export function isObject (v) {
  return Object.prototype.toString.call(v) === '[object Object]'
}

// Check if Array
export function isArray (v) {
  return Array.isArray(v)
}

// Check if String
export function isString (v) {
  return typeof v === 'string'
}

// Check if empty Object
export function emptyObject (v) {
  return isObject(v) && Object.keys(v).length === 0
}

// Check if empty Array
export function emptyArray (v) {
  return isArray(v) && v.length === 0
}

// Check if empty String
export function emptyString (v) {
  return isString(v) && v.length === 0
}

// Check if occupied Object
export function occupiedObject (v) {
  return isObject(v) && Object.keys(v).length > 0
}

// Check if occupied Array
export function occupiedArray (v) {
  return isArray(v) && v.length > 0
}

// Check if occupied String
export function occupiedString (v) {
  return isString(v) && v.length > 0
}

// Find path(s) of matching value in data structure
export function find (val, node, path = []) {
  if (node === val) {
    return [path]
  }
  if (isArray(node)) {
    return node.reduce(
      (p, _k, i) => [...p, ...find(val, node[i], [...path, i])],
      []
    )
  }
  if (isObject(node)) {
    return Object.keys(node).reduce(
      (p, k) => [...p, ...find(val, node[k], [...path, k])],
      []
    )
  }
  return []
}

// Get first path
export function head (entity, structure) {
  return R.pipe(find, R.head)(entity, structure)
}

// Get parent of first path
export function parent (entity, structure) {
  return R.pipe(head, R.init)(entity, structure)
}

// Fill data structure with entities
export function fill (node, entities) {
  if (Array.isArray(node)) {
    return node.map(n => fill(n, entities))
  }
  return {
    ...(node.id && { ...entities[node.id], id: node.id }),
    ...(node.nodes && { nodes: fill(node.nodes, entities) })
  }
}

// Add source to data structure at position
export function add (position, source, structure) {
  return R.assocPath(
    R.init(position),
    R.insert(R.last(position), source, R.path(R.init(position), structure)),
    structure
  )
}

// Update target with source in data structure
export function update (target, source, structure) {
  return R.assocPath(parent(target, structure), source, structure)
}

// Remove target from data structure
export function remove (target, structure) {
  return R.dissocPath(parent(target, structure), structure)
}

// Fetch target from data structure
export function fetch (target, structure) {
  return R.path(parent(target, structure), structure)
}

// Move target to position in data structure
export function move (position, target, structure) {
  return add(position, fetch(target, structure), remove(target, structure))
}

// Add source to target at position in data structure
export function insert (target, position, source, structure) {
  return move(
    R.update(-1, position, head(target, structure)),
    source,
    structure
  )
}

// Add source as last node of target in data structure
export function last (target, source, structure) {
  return insert(target, -1, source, structure)
}

// Add source as first node of target in data structure
export function first (target, source, structure) {
  return insert(target, 0, source, structure)
}

// Add source at position of target in data structure
export function at (target, source, structure) {
  return move(parent(target, structure), source, structure)
}

// Add source after target in data structure
export function after (target, source, structure) {
  return move(
    R.adjust(-1, R.add(1), parent(target, structure)),
    source,
    structure
  )
}

// Add source before target in data structure
export function before (target, source, structure) {
  const c = n => R.init(parent(n, structure))
  const e = (t, s) => R.equals(c(t), c(s))
  if (e(target, source) && R.last(target) > R.last(source)) return structure
  return at(target, source, structure)
}
