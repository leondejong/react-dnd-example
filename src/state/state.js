const red = 'rgba(239, 79, 119, 1)'
const orange = 'rgba(239, 123, 107, 1)'
const yellow = 'rgba(239, 175, 127, 1)'
const green = 'rgba(95, 175, 127, 1)'
const cyan = 'rgba(0, 143, 143, 1)'
const blue = 'rgba(0, 87, 158, 1)'
const indigo = 'rgba(87, 63, 159, 1)'
const violet = 'rgba(159, 63, 159, 1)'
const dark = 'rgba(63, 63, 63, 1)'

const colors = { red, orange, yellow, green, cyan, blue, indigo, violet }

const structure = {
  id: 'root',
  nodes: [
    { id: 1, nodes: [{ id: 4 }, { id: 5 }, { id: 6 }] },
    { id: 2, nodes: [{ id: 7 }, { id: 8 }] },
    { id: 3, nodes: [{ id: 9 }, { id: 10 }] }
  ]
}

const entities = {
  1: {
    name: 'Todo',
    color: dark
  },
  2: {
    name: 'Progress',
    color: dark
  },
  3: {
    name: 'Done',
    color: dark
  },
  4: {
    name: 'Feature 1',
    content: `
      Description
      <br />
      ...
    `,
    color: yellow
  },
  5: {
    name: 'Feature 2',
    content: `
      Description
      <br />
      ...
    `,
    color: orange
  },
  6: {
    name: 'Feature 3',
    content: `
      Description
      <br />
      ...
    `,
    color: red
  },
  7: {
    name: 'Feature 4',
    content: `
      Description
      <br />
      ...
    `,
    color: green
  },
  8: {
    name: 'Feature 5',
    content: `
      Description
      <br />
      ...
    `,
    color: cyan
  },
  9: {
    name: 'Feature 6',
    content: `
      Description
      <br />
      ...
    `,
    color: violet
  },
  10: {
    name: 'Feature 7',
    content: `
      Description
      <br />
      ...
    `,
    color: indigo
  }
}

export const state = {
  name: 'Overview',
  id: 0,
  structure: { id: 'root', nodes: [] },
  entities: {},
  colors
}

export const example = {
  name: 'Features',
  id: 10,
  structure,
  entities,
  colors
}
