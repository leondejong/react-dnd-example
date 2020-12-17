// Get CSS property value
export function getProperty (n, p) {
  if (n instanceof window.Element) {
    return parseInt(window.getComputedStyle(n, null).getPropertyValue(p))
  } else {
    return 0
  }
}

// Get point index in list
export function getIndex (points, point, k = 'y') {
  return points.reduce((a, c, i) => (c[k] < point[k] ? i + 1 : a), 0)
}

// Get position of point relative to rectangle
export function getRelativePosition (rect, point) {
  return { x: point.x - rect.left, y: point.y - rect.top }
}

// Get midpoints of elements relative to root
export function getMidpoints (root) {
  const r = root.getBoundingClientRect()
  return [...root.children].map(n => {
    const c = n.getBoundingClientRect()
    return getRelativePosition(r, {
      x: (c.left + c.right) / 2,
      y: (c.top + c.bottom) / 2
    })
  })
}

// Get vertical index of position in root elements
export function getVerticalIndex (root, offset) {
  return getIndex(
    getMidpoints(root),
    getRelativePosition(root.getBoundingClientRect(), offset)
  )
}

// Get bounding rectangles of root elements
export function getNodeBounds (root) {
  return [...root.children].map(n => n.getBoundingClientRect())
}

// Calculate indicator top position
export function getIndicatorTop (root, position) {
  const node = [...root.children][position - 1]
  const bounds = getNodeBounds(root)[position - 1]
  const margin = getProperty(node, 'margin-bottom')
  if (position < 1) return 0
  return bounds.bottom + margin - root.getBoundingClientRect().top
}

// Adjust target position based on source position
export function normalizePosition (position, source, target, subject) {
  if (target.id !== source.id) return position
  const index = source.nodes.findIndex(s => s.id === subject.id)
  if (position <= index) return position
  return position - 1
}
