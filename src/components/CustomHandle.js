import React from 'react'
import styled, { css } from 'styled-components'

const Handle = styled.div`
  position: absolute;
  opacity: 0;
  user-select: none;
  touch-action: none;

  ${({ position }) => {
    let positionSpecificCss

    switch (position) {
      case 'right':
        positionSpecificCss = css`
          width: 1.5rem;
          height: 100%;
          top: 0;
          right: 0;
          border-right: 1.5rem dashed #abcdef;
          cursor: ew-resize;
        `
        break

      case 'left':
        positionSpecificCss = css`
          width: 1.5rem;
          height: 100%;
          top: 0;
          left: 0;
          border-left: 1.5rem dashed #abcdef;
          cursor: ew-resize;
        `
        break

      case 'top':
        positionSpecificCss = css`
          width: 100%;
          height: 1.5rem;
          top: 0;
          border-top: 1.5rem dashed #abcdef;
          cursor: ns-resize;
        `
        break

      case 'bottom':
        positionSpecificCss = css`
          width: 100%;
          height: 1.5rem;
          bottom: 0;
          border-bottom: 1.5rem dashed #abcdef;
          cursor: ns-resize;
        `
        break

      case 'bottom-right':
        positionSpecificCss = css`
          width: 1.5rem;
          height: 1.5rem;
          bottom: 0;
          right: 0;
          border-bottom: 1.5rem dashed #abcdef;
          border-right: 1.5rem dashed #abcdef;
          cursor: se-resize;
        `
        break

      default:
        positionSpecificCss = ''
        break
    }

    return positionSpecificCss
  }};

  :hover {
    opacity: ${({ hideHandles }) => (hideHandles ? 0 : 0.7)};
  }

  :active {
    opacity: 1;
    cursor: grabbing;
  }
`

const CustomHandle = ({ position, hideHandles, onMouseDown, onTouchStart }) => (
  <Handle
    position={position}
    hideHandles={hideHandles}
    onMouseDown={onMouseDown}
    onTouchStart={onTouchStart}
  />
)

export default CustomHandle
