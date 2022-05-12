import * as O from 'fp-ts/lib/Option';
import React from 'react';
import { act } from 'react-dom/test-utils';

import { setup } from '@/tests/utils';

import { BaseSelect as component } from '../Select';
import { ISelectProps } from '../types';

describe('<Select />', () => {
  const onChange = jest.fn()
  const useStateMock = jest.fn()

  const originalUseState = React.useState

  const value = { id: '0', value: 'name_0' }

  const props: ISelectProps = {
    maybeValue: O.some(value),
    maybeOptions: O.some([
      value,
      { id: '1', value: 'name_1' },
    ]),
    onChange,
  }


  beforeEach(() => {
    React.useState = originalUseState
    onChange.mockClear()
    useStateMock.mockClear()
  })

  it('should match the snapshot', () => {
    const wrapper = setup({ component, props })
    expect(wrapper).toMatchSnapshot()
  })

  it('should match the snapshot (blank value)', () => {
    const wrapper = setup({ component, props: { ...props, maybeValue: O.none } })
    expect(wrapper).toMatchSnapshot()
  })

  it('should match the snapshot (show text)', () => {
    const wrapper = setup({ component, props: { ...props, maybeText: O.some('text') } })
    expect(wrapper).toMatchSnapshot()
  })

  it('should match the snapshot (show options)', () => {
    const wrapper = setup({ component, props, shouldMount: true })
    const value = wrapper.find('.value')
    void act(() => { value?.simulate('click') })
    expect(wrapper).toMatchSnapshot()
  })

  it('should hide list', () => {
    jest.spyOn(React, 'useState').mockImplementationOnce(init => [init, useStateMock])

    const wrapper = setup({ component, props, shouldMount: true })
    const firstItem = wrapper.find('li').first()

    void act(() => { firstItem.simulate('click') })

    expect(useStateMock).toHaveBeenCalledWith(false)
  })

  it('should select item', () => {
    const wrapper = setup({ component, props, shouldMount: true })

    const firstItem = wrapper.find('li').first()
    void act(() => { firstItem.simulate('click') })

    expect(onChange).toHaveBeenCalledWith(O.some(value))
  })
})
