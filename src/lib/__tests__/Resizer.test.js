import React from 'react'
import { render } from 'enzyme'
import Resizer from '../re-siz-able'

describe('Test Resizer', () => {
  it('should render correctly', () => {
    expect(
      render(
        <Resizer>
          <div>blah</div>
        </Resizer>
      )
    ).toMatchSnapshot()
  })
})
