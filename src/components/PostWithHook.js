import React from 'react'
import styled from 'styled-components'
import { useResizer } from '../lib/re-siz-able'
import { PostContainer, Name, Close, Description } from './SocialPost'

const Arrow = styled.div`
  font-size: 3rem;
  user-select: none;
  position: absolute;
  bottom: 1rem;
  touch-action: none;

  :hover {
    color: #87cefa;
  }

  :active {
    cursor: grabbing;
  }
`

const EwArrow = styled(Arrow)`
  right: 7rem;
  cursor: ew-resize;
`

const NsArrow = styled(Arrow)`
  left: 1rem;
  cursor: ns-resize;
  writing-mode: vertical-lr;
`

const NwseArrow = styled(Arrow)`
  right: 0;
  cursor: nwse-resize;
  transform: rotate(45deg);
`

const getFontSize = height => {
  return Math.round(Math.log10(height / 25) * 100) / 100 + 'rem'
}

// Uncomment the default values and remove the ref for an alternative way of using useResizer()!
const resizerConfig = {
  minHeight: 270,
  maxHeight: 600,
  minWidth: 200,
  maxWidth: 800,
  preserveRatio: true,
  // defaultWidth: 400,
  // defaultHeight: 400,
}

const PostWithHook = () => {
  const { elementRef, width, height, handlePointerDown } = useResizer(
    resizerConfig
  )

  return (
    <PostContainer
      ref={elementRef}
      style={{
        width: width,
        height: height,
        fontSize: getFontSize(height),
      }}
    >
      <Name>John Doe</Name>
      <Close />
      <Description>
        That's a functional component using the useResizer hook! My width is{' '}
        {width} pixels. Try changing height to resize the font too.
      </Description>
      <NsArrow
        onMouseDown={handlePointerDown('bottom')}
        onTouchStart={handlePointerDown('bottom')}
      >
        {'<=>'}
      </NsArrow>
      <EwArrow
        onMouseDown={handlePointerDown('right')}
        onTouchStart={handlePointerDown('right')}
      >
        {'<=>'}
      </EwArrow>
      <NwseArrow
        onMouseDown={handlePointerDown('bottom-right')}
        onTouchStart={handlePointerDown('bottom-right')}
      >
        {'<=>'}
      </NwseArrow>
    </PostContainer>
  )
}

export default PostWithHook
