const red = 'rgba(239, 79, 119, 1)'
const orange = 'rgba(239, 123, 107, 1)'
const yellow = 'rgba(239, 175, 127, 1)'
const green = 'rgba(95, 175, 127, 1)'
const cyan = 'rgba(63,  175, 175, 1)'
const blue = 'rgba(0, 87, 158, 1)'
const purple = 'rgba(87, 63, 159, 1)'
const dark = 'rgba(63, 63, 63, 1)'

const colors = { red, orange, yellow, green, cyan, blue, purple }

const structure = {
  id: 'root',
  nodes: [
    { id: 1, nodes: [{ id: 4 }, { id: 5 }, { id: 6 }] },
    { id: 2, nodes: [{ id: 7 }, { id: 8 }] },
    { id: 3, nodes: [{ id: 9 }] }
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
    color: purple
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
  id: 9,
  structure,
  entities,
  colors
}
