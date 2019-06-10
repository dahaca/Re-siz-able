import React from 'react'
import { render } from 'enzyme'
import Resizer from '../re-siz-able'
import CustomHandle from '../../components/CustomHandle'

describe('Test Resizer', () => {
  beforeEach(() => {})

  it('should render', () => {
    expect(
      render(
        <Resizer>
          <div>blah</div>
        </Resizer>
      )
    ).toMatchSnapshot()
  })

  it('should render with props', () => {
    expect(
      render(
        <Resizer
          handles={['right', 'bottom']}
          minHeight={100}
          minWidth={100}
          maxHeight={1000}
          maxWidth={1000}
        >
          <div>blah</div>
        </Resizer>
      )
    ).toMatchSnapshot()
  })

  it('should render with a custom handle', () => {
    expect(
      render(
        <Resizer handles={['right', 'bottom']} customHandle={CustomHandle}>
          <div>blah</div>
        </Resizer>
      )
    ).toMatchSnapshot()
  })

  // it('should change size by 20px', () => {
  //   const component = mount(
  //     <Resizer customHandle={CustomHandle}>
  //       <div>blah</div>
  //     </Resizer>
  //   )

  //   console.log(component.props())
  // })
})
