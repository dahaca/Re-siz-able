import React, { useState, useEffect, useRef } from 'react'
import styled from 'styled-components'
import {
  element,
  number,
  bool,
  string,
  arrayOf,
  oneOf,
  object,
} from 'prop-types'
import generateStyles from './utils/generateStyles'

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

  > :first-child {
    width: ${({ width }) => width && '100%'};
    height: ${({ height }) => height && '100%'};
  }
`

const Resizer = ({
  children,
  handles = ['left', 'right'],
  minWidth = 100,
  maxWidth = 600,
  minHeight = 100,
  maxHeight = 600,
  hideHandles,
  preserveRatio,
  customHandle,
  className,
}) => {
  const [width, setWidth] = useState()
  const [height, setHeight] = useState()
  const [mouseDown, setMouseDown] = useState(false)
  const [initialPosition, setInitialPosition] = useState(null)
  const [initialWidth, setInitialWidth] = useState()
  const [initialHeight, setInitialHeight] = useState()
  const childElement = useRef()
  const Handle = customHandle ? customHandle : DefaultHandle

  useEffect(() => {
    window.addEventListener('mousemove', handleMouseMove)
    window.addEventListener('mouseup', handleMouseUp)

    return () => {
      window.removeEventListener('mousemove', handleMouseMove)
      window.removeEventListener('mouseup', handleMouseUp)
    }
  }, [mouseDown])

  useEffect(() => {
    setWidth(childElement.current.getBoundingClientRect().width)
    setHeight(childElement.current.getBoundingClientRect().height)
  }, [])

  const handleMouseDown = handle => e => {
    setMouseDown(handle)
    setInitialPosition({ x: e.pageX, y: e.pageY })
    setInitialWidth(childElement.current.getBoundingClientRect().width)
    setInitialHeight(childElement.current.getBoundingClientRect().height)
  }

  const handleMouseUp = () => {
    if (mouseDown) {
      setMouseDown(null)
    }
  }

  const handleMouseMove = e => {
    if (!mouseDown) {
      return
    }

    const checkNewWidth = width => {
      if (width < minWidth) return minWidth
      if (width > maxWidth) return maxWidth

      return width
    }

    const checkNewHeight = height => {
      if (height < minHeight) return minHeight
      if (height > maxHeight) return maxHeight

      return height
    }

    const setDimentions = (deltaHeight, deltaWidth, preserveRatio) => {
      if (preserveRatio) {
        const delta = Math.max(deltaWidth, deltaHeight)

        setHeight(checkNewHeight(initialHeight + delta))
        setWidth(checkNewWidth(initialWidth + delta))

        return
      }

      setHeight(checkNewHeight(initialHeight + deltaHeight))
      setWidth(checkNewWidth(initialWidth + deltaWidth))
    }

    switch (mouseDown) {
      case 'right':
        setWidth(checkNewWidth(initialWidth + (e.pageX - initialPosition.x)))
        break

      case 'left':
        setWidth(checkNewWidth(initialWidth + (initialPosition.x - e.pageX)))
        break

      case 'top':
        setHeight(checkNewHeight(initialHeight + (initialPosition.y - e.pageY)))
        break

      case 'bottom':
        setHeight(checkNewHeight(initialHeight + (e.pageY - initialPosition.y)))
        break

      case 'top-left':
        setDimentions(
          initialPosition.y - e.pageY,
          initialPosition.x - e.pageX,
          preserveRatio
        )
        break

      case 'top-right':
        setDimentions(
          initialPosition.y - e.pageY,
          e.pageX - initialPosition.x,
          preserveRatio
        )
        break

      case 'bottom-right':
        setDimentions(
          e.pageY - initialPosition.y,
          e.pageX - initialPosition.x,
          preserveRatio
        )
        break

      case 'bottom-left':
        setDimentions(
          e.pageY - initialPosition.y,
          initialPosition.x - e.pageX,
          preserveRatio
        )
        break

      default:
        console.error('Invalid handle type!')
        break
    }
  }

  const renderChildWithRef = () => {
    try {
      const child = React.Children.only(children)

      return React.cloneElement(child, {
        ref: childElement,
      })
    } catch (err) {
      console.error('The Resizer component can have only one child!')
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
          onMouseDown={handleMouseDown(handle)}
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
  maxHeigh: number,
  hideHandles: bool,
  preserveRatio: bool,
  customHandle: object,
  className: string,
}

export default Resizer
