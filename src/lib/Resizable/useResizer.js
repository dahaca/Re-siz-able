import { useState, useEffect, useRef } from 'react'
import { objectOf, oneOf } from 'prop-types'

const useResizer = resizerConfig => {
  const config = {
    minWidth: 100,
    maxWidth: 600,
    minHeight: 100,
    maxHeight: 600,
    preserveRatio: false,
    ...resizerConfig,
  }

  const [width, setWidth] = useState()
  const [height, setHeight] = useState()
  const [mouseDown, setMouseDown] = useState(false)
  const [initialPosition, setInitialPosition] = useState(null)
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
    setWidth(elementRef.current.getBoundingClientRect().width)
    setHeight(elementRef.current.getBoundingClientRect().height)
  }, [])

  const handleMouseDown = handle => e => {
    setMouseDown(handle)
    setInitialPosition({ x: e.pageX, y: e.pageY })
    setInitialWidth(elementRef.current.getBoundingClientRect().width)
    setInitialHeight(elementRef.current.getBoundingClientRect().height)
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
      if (width < config.minWidth) return config.minWidth
      if (width > config.maxWidth) return config.maxWidth

      return width
    }

    const checkNewHeight = height => {
      if (height < config.minHeight) return config.minHeight
      if (height > config.maxHeight) return config.maxHeight

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
          config.preserveRatio
        )
        break

      case 'top-right':
        setDimentions(
          initialPosition.y - e.pageY,
          e.pageX - initialPosition.x,
          config.preserveRatio
        )
        break

      case 'bottom-right':
        setDimentions(
          e.pageY - initialPosition.y,
          e.pageX - initialPosition.x,
          config.preserveRatio
        )
        break

      case 'bottom-left':
        setDimentions(
          e.pageY - initialPosition.y,
          initialPosition.x - e.pageX,
          config.preserveRatio
        )
        break

      default:
        console.error('Invalid handle type!')
        break
    }
  }

  return { elementRef, width, height, handleMouseDown }
}

useResizer.propTypes = {
  config: objectOf(
    oneOf(['minWidth', 'maxWidth', 'minHeight', 'maxHeight', 'preserveRatio'])
  ),
}

export default useResizer
