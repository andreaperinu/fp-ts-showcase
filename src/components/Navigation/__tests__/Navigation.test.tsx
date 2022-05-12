import { setup } from '@/tests/utils';

import { Navigation as component } from '../Navigation';

describe('<Navigation />', () => {
	it('should match snapshot', () => {
		const wrapper = setup({ component, props: {}, shouldMount: true, shouldHaveRouter: true, })
		expect(wrapper).toMatchSnapshot()
	})
})