import { shallow } from 'enzyme';

import { Button } from '../Button';

describe('<Button />', () => {
	it('should match snapshot', () => {
		const wrapper = shallow(<Button />)
		expect(wrapper).toMatchSnapshot()
	})
})
