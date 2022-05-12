import classNames from 'classnames';
import * as A from 'fp-ts/lib/Array';
import * as B from 'fp-ts/lib/boolean';
import { constVoid, pipe } from 'fp-ts/lib/function';
import * as O from 'fp-ts/lib/Option';
import React, { memo, useCallback, useMemo } from 'react';

import { noopComponent } from '@/utils/utils';

import { SelectStyled } from './Select.styled';
import { ISelectItem, ISelectProps } from './types';

export const BaseSelect = ({
  maybeValue, maybeOptions, className, onChange, disabled = false, maybeText = O.none,
}: ISelectProps) => {
  const [showOptions, setShowOptions] = React.useState(false)

  const onItemSelect = useCallback((item: ISelectItem) => {
    setShowOptions(false)
    onChange(O.fromNullable(item))
  }, [onChange])

  const onShowOptionsHandler = useCallback(() => pipe(
    !disabled,
    B.fold(constVoid, () => setShowOptions((prev) => !prev))
  ), [disabled])

  const renderedValue = useMemo(() => pipe(
    maybeValue,
    O.map(({ value }) => value),
    O.getOrElse(() => ''),
    v => <div className={classNames('value', className)} onClick={onShowOptionsHandler}>{v}</div>
  ), [maybeValue, onShowOptionsHandler])

  const renderedOptions = useMemo(() => pipe(
    maybeOptions,
    O.map(A.map(option => (
      <li key={option.id} value={option.id} onClick={() => onItemSelect(option)}>
        {option.value}
      </li>
    ))),
    O.map(O.fromPredicate(A.isNonEmpty)),
    O.chain(O.map(items => <ul className="list">{items}</ul>)),
    O.getOrElse(noopComponent),
  ), [maybeOptions, onItemSelect])

  const renderedText = useMemo(() => pipe(
    maybeText,
    O.map(text => <div className="text" onClick={onShowOptionsHandler}>{text}</div>),
    O.getOrElse(noopComponent)
  ), [maybeText, onShowOptionsHandler])

  return (
    <SelectStyled showOptions={showOptions} disabled={disabled}>

      <div className="wrapper">
        {renderedValue}
        {renderedOptions}
      </div>

      {renderedText}
    </SelectStyled>
  )
}

export const Select = memo(BaseSelect)
