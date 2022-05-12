import * as O from 'fp-ts/lib/Option';
import { BaseComponent } from '../../types';

export interface ISelectProps extends BaseComponent {
	maybeValue: O.Option<ISelectItem>
	maybeOptions: O.Option<ISelectItem[]>
	maybeText?: O.Option<string>
	disabled?: boolean
	onChange: (item: O.Option<ISelectItem>) => void
}

export interface ISelectItem {
	id: string
	value: string
}

export interface ISelectStyledProps {
	showOptions: boolean
	disabled: boolean
}
