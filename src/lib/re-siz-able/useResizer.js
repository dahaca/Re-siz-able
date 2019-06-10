import { useState, useEffect, useRef } from 'react'

const useResizer = (
  {
    minWidth = 100,
    maxWidth = 1000,
    minHeight = 100,
    maxHeight = 1000,
    margin = 32,
    preserveRatio = false,
    defaultWidth,
    defaultHeight,
  } = {
    minWidth: 100,
    maxWidth: 1000,
    minHeight: 100,
    maxHeight: 1000,
    margin: 32,
    preserveRatio: false,
    defaultWidth: 250,
    defaultHeight: 250,
  }
) => {
  const [width, setWidth] = useState(defaultWidth)
  const [height, setHeight] = useState(defaultHeight)
  const [pointerDown, setPointerDown] = useState(false)
  const [initialCursorPosition, setInitialCursorPosition] = useState(null)
  const [initialWidth, setInitialWidth] = useState()
  const [initialHeight, setInitialHeight] = useState()
  const elementRef = useRef()

  useEffect(() => {
    window.addEventListener('mousemove', handlePointerMove)
    window.addEventListener('touchmove', handlePointerMove)
    window.addEventListener('mouseup', handlePointerUp)
    window.addEventListener('touchend', handlePointerUp)

    return () => {
      window.removeEventListener('mousemove', handlePointerMove)
      window.removeEventListener('touchmove', handlePointerMove)
      window.removeEventListener('mouseup', handlePointerUp)
      window.removeEventListener('touchend', handlePointerUp)
    }
  }, [pointerDown])

  useEffect(() => {
    if (elementRef.current) {
      if (!defaultWidth) {
        setWidth(Math.round(elementRef.current.getBoundingClientRect().width))
      }

      if (!defaultHeight)
        setHeight(Math.round(elementRef.current.getBoundingClientRect().height))
    } else {
      if (!defaultWidth || !defaultHeight) {
        console.error(
          'Define both defaultHeight and defaultWidth for your component or use the elementRef!'
        )
      }
    }
  }, [])

  const handlePointerDown = handle => e => {
    setPointerDown(handle)

    setInitialCursorPosition({
      x: Math.round(e.pageX || e.changedTouches[0].pageX),
      y: Math.round(e.pageY || e.changedTouches[0].pageY),
    })

    setInitialWidth(width)
    setInitialHeight(height)
  }

  const handlePointerUp = () => {
    if (pointerDown) {
      setPointerDown(null)
    }
  }

  const handlePointerMove = e => {
    if (!pointerDown) {
      return
    }

    const xPosition = Math.round(e.pageX ? e.pageX : e.changedTouches[0].pageX)
    const yPosition = Math.round(e.pageY ? e.pageY : e.changedTouches[0].pageY)

    const checkNewWidth = width => {
      const maxScreenWidth = Math.round(window.innerWidth) - margin * 2

      if (maxScreenWidth < maxWidth) {
        maxWidth = maxScreenWidth
      }

      if (width < minWidth) return minWidth
      if (width > maxWidth) return maxWidth

      return Math.round(width)
    }

    const checkNewHeight = height => {
      if (height < minHeight) return minHeight
      if (height > maxHeight) return maxHeight

      return Math.round(height)
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

    switch (pointerDown) {
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

  return { elementRef, width, height, handlePointerDown }
}

export default useResizer
