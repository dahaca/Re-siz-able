import React from 'react'
import styled from 'styled-components'
import useResizer from '../lib/Resizable/useResizer'
import { PostContainer, Name, Close, Description } from './SocialPost'

const Arrow = styled.div`
  font-size: 3rem;
  user-select: none;
  position: absolute;
  bottom: 1rem;

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

const resizerConfig = {
  minHeight: 270,
  minWidth: 300,
  maxWidth: 800,
  preserveRatio: true,
}

const PostWithHook = () => {
  const { elementRef, width, height, handleMouseDown } = useResizer(
    resizerConfig
  )

  return (
    <PostContainer ref={elementRef} style={{ width: width, height: height }}>
      <Name>John Doe</Name>
      <Close />
      <Description>
        That's a functional component using the useResizer hook! <br /> Fancy.
      </Description>
      <NsArrow onMouseDown={handleMouseDown('bottom')}>{'<=>'}</NsArrow>
      <EwArrow onMouseDown={handleMouseDown('right')}>{'<=>'}</EwArrow>
      <NwseArrow onMouseDown={handleMouseDown('bottom-right')}>
        {'<=>'}
      </NwseArrow>
    </PostContainer>
  )
}

export default PostWithHook
