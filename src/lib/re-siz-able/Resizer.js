import React from 'react'
import styled from 'styled-components'
import {
  element,
  number,
  bool,
  string,
  arrayOf,
  oneOfType,
  oneOf,
  object,
  func,
} from 'prop-types'
import generateStyles from './utils/generateStyles'
import useResizer from './useResizer'

const DefaultHandle = styled.div`
  position: absolute;
  opacity: 0;
  user-select: none;

  ${({ position }) => generateStyles(position)};

  :hover {
    opacity: ${({ hideHandles }) => (hideHandles ? 0 : 0.7)};
  }

  :active {
    opacity: ${({ hideHandles }) => (hideHandles ? 0 : 1)};
    cursor: grabbing;
  }
`

const Wrapper = styled.div`
  position: relative;
  touch-action: none;

  > :first-child {
    width: ${({ width }) => width && '100%'};
    height: ${({ height }) => height && '100%'};
  }
`

const Resizer = ({
  children,
  handles = ['left', 'right'],
  minWidth = 100,
  maxWidth = 1000,
  minHeight = 100,
  maxHeight = 1000,
  margin,
  hideHandles,
  preserveRatio,
  customHandle,
  className,
}) => {
  const { elementRef, width, height, handlePointerDown } = useResizer({
    minWidth,
    maxWidth,
    minHeight,
    maxHeight,
    preserveRatio,
    margin,
  })

  if (handles.length === 0) {
    console.error(
      'You must include at least one handle name in the handles array!'
    )
  }

  const Handle = customHandle ? customHandle : DefaultHandle

  const renderChildWithRef = () => {
    try {
      const child = React.Children.only(children)
      return React.cloneElement(child, {
        ref: elementRef,
      })
    } catch (err) {
      console.error('The Resizer component must have exactly one child!')
    }
  }

  return (
    <Wrapper
      width={width}
      height={height}
      style={{ width: width, height: height }}
      className={className}
    >
      {renderChildWithRef()}

      {handles.map(handle => (
        <Handle
          key={handle}
          position={handle}
          onMouseDown={handlePointerDown(handle)}
          onTouchStart={handlePointerDown(handle)}
          hideHandles={hideHandles}
        />
      ))}
    </Wrapper>
  )
}

Resizer.propTypes = {
  children: element.isRequired,
  handles: arrayOf(
    oneOf([
      'right',
      'left',
      'top',
      'bottom',
      'top-left',
      'top-right',
      'bottom-right',
      'bottom-left',
    ])
  ),
  minWidth: number,
  maxWidth: number,
  minHeight: number,
  maxHeight: number,
  margin: number,
  hideHandles: bool,
  preserveRatio: bool,
  customHandle: oneOfType([object, element, func]),
  className: string,
}

export default Resizer
