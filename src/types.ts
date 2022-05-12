import { IStoreState } from "./store/types";

export interface BaseComponent {
	className?: string
}

export interface IMockedStoreBase {
	initialState?: Partial<IStoreState>
	dispatch?: jest.Mock
	state?: Partial<IStoreState>
}

export type SetupType<T> = IMockedStoreBase & {
	component: React.ComponentType<T>,
	props: T
	shouldMount?: boolean
	shouldHaveRouter?: boolean
}
