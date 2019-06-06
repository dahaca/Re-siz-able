import React from 'react'
import { render } from 'enzyme'
import SocialPost from '../SocialPost'

describe('Test SocialPost', () => {
  it('should render correctly', () => {
    expect(render(<SocialPost />)).toMatchSnapshot()
  })
})
