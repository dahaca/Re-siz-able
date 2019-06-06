import { useState, useEffect, useRef } from 'react'

const useResizer = ({
  minWidth = 100,
  maxWidth = 1000,
  minHeight = 100,
  maxHeight = 1000,
  preserveRatio = false,
  defaultWidth,
  defaultHeight,
}) => {
  const [width, setWidth] = useState(defaultWidth)
  const [height, setHeight] = useState(defaultHeight)
  const [mouseDown, setMouseDown] = useState(false)
  const [initialCursorPosition, setInitialCursorPosition] = useState(null)
  const [initialWidth, setInitialWidth] = useState()
  const [initialHeight, setInitialHeight] = useState()
  const elementRef = useRef()

  useEffect(() => {
    window.addEventListener('mousemove', handleMouseMove)
    window.addEventListener('touchmove', handleMouseMove)
    window.addEventListener('mouseup', handleMouseUp)
    window.addEventListener('touchend', handleMouseUp)

    return () => {
      window.removeEventListener('mousemove', handleMouseMove)
      window.removeEventListener('touchmove', handleMouseMove)
      window.removeEventListener('mouseup', handleMouseUp)
      window.removeEventListener('touchend', handleMouseUp)
    }
  }, [mouseDown])

  useEffect(() => {
    if (elementRef.current) {
      if (!defaultWidth) {
        setWidth(elementRef.current.getBoundingClientRect().width)
      }
      if (!defaultHeight)
        setHeight(elementRef.current.getBoundingClientRect().height)
    } else {
      if (!defaultWidth || !defaultHeight) {
        console.error(
          'Define both defaultHeight and defaultWidth for your component or use the elementRef!'
        )
      }
    }
  }, [])

  const handleMouseDown = handle => e => {
    setMouseDown(handle)
    if (e.pageX) {
      setInitialCursorPosition({ x: e.pageX, y: e.pageY })
    } else {
      setInitialCursorPosition({
        x: e.changedTouches[0].pageX,
        y: e.changedTouches[0].pageY,
      })
    }
    setInitialWidth(width)
    setInitialHeight(height)
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

    const xPosition = e.pageX ? e.pageX : e.changedTouches[0].pageX
    const yPosition = e.pageY ? e.pageY : e.changedTouches[0].pageY

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
        setWidth(
          checkNewWidth(initialWidth + (xPosition - initialCursorPosition.x))
        )
        break

      case 'left':
        setWidth(
          checkNewWidth(initialWidth + (initialCursorPosition.x - xPosition))
        )
        break

      case 'top':
        setHeight(
          checkNewHeight(initialHeight + (initialCursorPosition.y - yPosition))
        )
        break

      case 'bottom':
        setHeight(
          checkNewHeight(initialHeight + (yPosition - initialCursorPosition.y))
        )
        break

      case 'top-left':
        setDimentions(
          initialCursorPosition.y - yPosition,
          initialCursorPosition.x - xPosition,
          preserveRatio
        )
        break

      case 'top-right':
        setDimentions(
          initialCursorPosition.y - yPosition,
          xPosition - initialCursorPosition.x,
          preserveRatio
        )
        break

      case 'bottom-right':
        setDimentions(
          yPosition - initialCursorPosition.y,
          xPosition - initialCursorPosition.x,
          preserveRatio
        )
        break

      case 'bottom-left':
        setDimentions(
          yPosition - initialCursorPosition.y,
          initialCursorPosition.x - xPosition,
          preserveRatio
        )
        break

      default:
        console.error('Invalid handle type!')
        break
    }
  }

  return { elementRef, width, height, handleMouseDown }
}

export default useResizer
