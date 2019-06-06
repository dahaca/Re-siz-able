import React from 'react'
import { render, mount } from 'enzyme'
import PostWithHook from '../PostWithHook'

describe('Test PostWithHook', () => {
  it('should render correctly', () => {
    expect(render(<PostWithHook />)).toMatchSnapshot()
  })

  it('should change width by 20px', () => {
    const post = mount(<PostWithHook />)
    const rightHandle = post.find('EwArrow')
    rightHandle.simulate('click')
  })
})
