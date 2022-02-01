import React, { useState } from 'react'

const ContentEditable = props => {
  const { tag: Tag = 'div', onInput = () => {}, children, attributes } = props
  const [html] = useState(children)
  return (
    <Tag
      {...attributes}
      onInput={onInput}
      contentEditable
      suppressContentEditableWarning
      dangerouslySetInnerHTML={{ __html: html }}
    />
  )
}

export default ContentEditable
