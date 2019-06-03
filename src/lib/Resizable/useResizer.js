import { useState, useEffect, useRef } from 'react'

const useResizer = resizerConfig => {
  const {
    minWidth,
    maxWidth,
    minHeight,
    maxHeight,
    preserveRatio,
    defaultWidth,
    defaultHeight,
  } = {
    minWidth: 100,
    maxWidth: 600,
    minHeight: 100,
    maxHeight: 600,
    preserveRatio: false,
    defaultWidth: undefined,
    defaultHeight: undefined,
    ...resizerConfig,
  }

  const [width, setWidth] = useState(defaultWidth)
  const [height, setHeight] = useState(defaultHeight)
  const [mouseDown, setMouseDown] = useState(false)
  const [initialCursorPosition, setInitialCursorPosition] = useState(null)
  const [initialWidth, setInitialWidth] = useState()
  const [initialHeight, setInitialHeight] = useState()
  const elementRef = useRef()

  useEffect(() => {
    window.addEventListener('mousemove', handleMouseMove)
    window.addEventListener('mouseup', handleMouseUp)

    return () => {
      window.removeEventListener('mousemove', handleMouseMove)
      window.removeEventListener('mouseup', handleMouseUp)
    }
  }, [mouseDown])

  useEffect(() => {
    if (elementRef.current) {
      setWidth(elementRef.current.getBoundingClientRect().width)
      setHeight(elementRef.current.getBoundingClientRect().height)
    } else {
      if (!defaultHeight || !defaultWidth) {
        console.error(
          'Define both defaultHeight and defaultWidth for your component or use the elementRef!'
        )
      }
    }
  }, [])

  const handleMouseDown = handle => e => {
    setMouseDown(handle)
    setInitialCursorPosition({ x: e.pageX, y: e.pageY })
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
          checkNewWidth(initialWidth + (e.pageX - initialCursorPosition.x))
        )
        break

      case 'left':
        setWidth(
          checkNewWidth(initialWidth + (initialCursorPosition.x - e.pageX))
        )
        break

      case 'top':
        setHeight(
          checkNewHeight(initialHeight + (initialCursorPosition.y - e.pageY))
        )
        break

      case 'bottom':
        setHeight(
          checkNewHeight(initialHeight + (e.pageY - initialCursorPosition.y))
        )
        break

      case 'top-left':
        setDimentions(
          initialCursorPosition.y - e.pageY,
          initialCursorPosition.x - e.pageX,
          preserveRatio
        )
        break

      case 'top-right':
        setDimentions(
          initialCursorPosition.y - e.pageY,
          e.pageX - initialCursorPosition.x,
          preserveRatio
        )
        break

      case 'bottom-right':
        setDimentions(
          e.pageY - initialCursorPosition.y,
          e.pageX - initialCursorPosition.x,
          preserveRatio
        )
        break

      case 'bottom-left':
        setDimentions(
          e.pageY - initialCursorPosition.y,
          initialCursorPosition.x - e.pageX,
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
