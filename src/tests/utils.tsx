import { mount, ReactWrapper, shallow, ShallowWrapper } from 'enzyme';
import * as B from 'fp-ts/lib/boolean';
import { pipe } from 'fp-ts/lib/function';
import { MemoryRouter } from 'react-router';

import * as Store from '@/store/store';
import { IMockedStoreBase, SetupType } from '@/types';

export const defineStore = ({ initialState = {}, state = {}, dispatch = jest.fn() }: IMockedStoreBase) => {
	Object.assign(Store, {
		useStore: jest.fn(() => [{ ...initialState, ...state }, dispatch]),
	})
}

function routerPipe<T>(props: T, shouldHaveRouter: boolean) {
	return (Component: React.ComponentType<T>): JSX.Element => pipe(
		shouldHaveRouter,
		B.fold(
			() => <Component {...props} />,
			() => <MemoryRouter initialEntries={[{ key: 'test' }]}><Component {...props} /></MemoryRouter>
		)
	)
}

const mountPipe = (shouldMount: boolean) => (component: JSX.Element) => pipe(
	shouldMount,
	B.fold<ShallowWrapper | ReactWrapper>(
		() => shallow(component),
		() => mount(component)
	)
)

export function setup<T>({
	component, props, shouldHaveRouter = false, shouldMount = false,
	initialState, state, dispatch
}: SetupType<T>): ShallowWrapper | ReactWrapper {

	defineStore({ initialState, state, dispatch })

	return pipe(
		component,
		routerPipe(props, shouldHaveRouter),
		mountPipe(shouldMount)
	)
}

export const findByDataTest = (
	wrapper: ShallowWrapper | ReactWrapper, name: string
): ShallowWrapper | ReactWrapper => wrapper.find(`[data-test='component-${name}']`)
