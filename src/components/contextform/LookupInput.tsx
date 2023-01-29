import React, { useCallback, useEffect, useMemo } from 'react'
import { SelectInputProps, SelectInput as Base, Options } from '../form'
import useFieldContext from './useFieldContext'
import { useGet } from '../../hooks'
import _ from "lodash"
import { useFormContext } from './FormContext'

export type LookupInputProps = {
  resource: string
  source: string
  pks: string[]
  valueSource: string | string[]
} & Omit<SelectInputProps, "selects">

export const LookupInput = (props: LookupInputProps) => {
  const { label, onChange } = useFieldContext(props)
  const { form, setForm } = useFormContext()
  
  const { data } = useGet({
    resource: props.resource,
  })

  const labelValue = (valueSource: string[], value: any) => {
    return valueSource.map((e) => value[e]).join(" - ")
  }


  const onChangeConvert = useCallback((value: any) => {
    if (!value) {
      onChange(null)
    }
    const parseValue = JSON.parse(value)
    setForm((oldForm: any) => {
      let val = {
        ...oldForm
      }
      val = _.set(val, props.source, {
        ...parseValue,
        _id_: JSON.parse(parseValue.value)[props.pks[0]]
      })
      return {
        ...val
      }
    })
  }, [onChange])


  const stringValue = useMemo(() => {
    let val = {} as Options
    val = _.get(form, props.source)
    return val?.value
  }, [onChange, JSON.stringify(_.get(form, props.source))])

  const selects: Options[] = data ? data.map((e: any) => {
    return {
      value: JSON.stringify(_.pick(e, props.pks)),
      label: typeof props.valueSource === "string" ? e[props.valueSource] : labelValue(props.valueSource, e)
    }
  }) : []

  return (
    <Base selects={selects} onChange={onChangeConvert} label={label} {...props} value={stringValue} />
  )
}

export default LookupInput