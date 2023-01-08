import React from 'react'
import { TextInputProps, TextInput as Base } from '../form'
import useFieldContext from './useFieldContext'

type Props = {
  source: string
} & TextInputProps

export const TextInput = (props: Props) => {
  const { value, onChange, label } = useFieldContext(props)
  return (
    <Base {...props} value={value} label={label} onChange={onChange} />
  )
}

export default TextInput