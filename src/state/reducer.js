import { state as defaultState, example as exampleState } from './state'
import { head, parent, add, move, remove, after } from './utils'

export const reducer = (state, action) => {
  switch (action.type) {
    case 'title':
      return updateTitle(state, action)
    case 'move':
      return moveEntry(state, action)
    case 'new':
      return newEntry(state, action)
    case 'add':
      return addEntry(state, action)
    case 'update':
      return updateEntry(state, action)
    case 'remove':
      return removeEntry(state, action)
    case 'clear':
      return defaultState
    case 'example':
      return exampleState
    default:
      return state
  }
}

function removeKey (key, object) {
  return Object.keys(object).reduce((o, k) => {
    if (k !== key) {
      o[k] = object[k]
    }
    return o
  }, {})
}

function updateTitle (state, action) {
  return { ...state, name: action.name }
}

function moveEntry (state, action) {
  const { structure } = state
  const { target, position, source } = action
  return {
    ...state,
    structure: move(
      [...parent(target, structure), 'nodes', position],
      source,
      structure
    )
  }
}

function newEntry (state, action) {
  const { id: n, structure, entities } = state
  const { entity, target } = action
  const id = n + 1
  return {
    ...state,
    id,
    structure: add(
      [...head(target, structure).slice(0, -1), 'nodes', 0],
      { id, nodes: [] },
      structure
    ),
    entities: { ...entities, [id]: { id, ...entity } }
  }
}

function addEntry (state, action) {
  const { id: n, structure, entities } = state
  const { entity, target } = action
  const id = n + 1
  return {
    ...state,
    id,
    structure: after(
      target,
      id,
      add(['nodes', -1], { id, nodes: [] }, structure)
    ),
    entities: { ...entities, [id]: { id, ...entity } }
  }
}

function updateEntry (state, action) {
  const { entities } = state
  const { entity } = action
  return {
    ...state,
    entities: {
      ...entities,
      [entity.id]: { ...entities[entity.id], ...entity }
    }
  }
}

function removeEntry (state, action) {
  const { entities, structure } = state
  const { id } = action
  return {
    ...state,
    structure: remove(id, structure),
    entities: removeKey(id, entities)
  }
}
