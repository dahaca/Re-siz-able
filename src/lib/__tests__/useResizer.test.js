import { useResizer } from '../re-siz-able'
// import { mount, simulate } from 'enzyme'
import { renderHook } from 'react-hooks-testing-library'

// const mockEvent = {
//   pageX: 100,
//   pageY: 100,
// }

describe('useResizer test', () => {
  it('Test the hook return', () => {
    const { result } = renderHook(() =>
      useResizer({ defaultHeight: 100, defaultWidth: 100 })
    )
    expect(result.current.width).toBe(100)
    expect(result.current.height).toBe(100)
    expect(result.current.elementRef.current).toBe(undefined)
    // expect(result.current.handlePointerDown).toBe()
  })

  // it('Change width', () => {
  //   const { result } = renderHook(() => useResizer())
  //   act(() => result.current.handlePointerDown('right')(mockEvent))

  //   const top = window.document.createElement('div')
  //   top.simulate('mousemove', { pageX: 101, pageY: 100 })
  //   top.simulate('mouseup')

  //   expect(result.current.width).toBe(101)
  // })
})
