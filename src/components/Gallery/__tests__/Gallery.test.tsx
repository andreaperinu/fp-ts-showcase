import * as O from 'fp-ts/lib/Option';

import { setup } from '@/tests/utils';

import { Gallery as component } from '../Gallery';

const props: React.ComponentProps<typeof component> = {
	maybeImages: O.some(['url1', 'url2'])
}

describe('<Gallery />', () => {
	it('should match snapshot', () => {
		const wrapper = setup({ component, props })
	})
})
