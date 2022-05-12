import * as O from 'fp-ts/lib/Option';

import { setup } from '@/tests/utils';

import { Image as component } from '../Image';

const props: React.ComponentProps<typeof component> = {
	maybeImage: O.some('url')
}

describe('<Image />', () => {
	it('should match snapshot', () => {
		const wrapper = setup({ component, props, shouldMount: true })
		expect(wrapper).toMatchSnapshot()
	})

	it('should match snapshot (fixed)', () => {
		const wrapper = setup({ component, props: { ...props, fixedSize: true }, shouldMount: true })
		expect(wrapper).toMatchSnapshot()
	})
})
