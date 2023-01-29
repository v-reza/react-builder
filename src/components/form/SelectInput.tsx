import { Fragment, useState } from 'react'
import { Listbox, Transition } from '@headlessui/react'
import { CheckIcon, SelectorIcon } from '@heroicons/react/solid'
import { classNames } from '../../utils/constant'
import clsx from 'clsx'
export type Options = {
  value: any
  label: string
}

export type SelectInputProps = {
  value?: string
  selects: Options[]
  onChange?: (val: any) => void
  placeholder?: string
  label?: string | boolean
}

export const SelectInput = (props: SelectInputProps) => {
  const { value = "", selects = [], placeholder, label } = props
  const onChange = (val: any) => {
    props.onChange && props.onChange(val)
  }
  const selectedLabel = selects.find((e) => e.value === value)?.label
  return (
    <Listbox value={value} onChange={onChange}>
      {({ open }) => (
        <>
          {label && (
            <Listbox.Label className="block text-sm font-medium text-gray-700">{label}</Listbox.Label>
          )}

          <div className="mt-1 relative">
            <Listbox.Button className={clsx({ "py-4": !selectedLabel && !placeholder, "py-2": selectedLabel ?? placeholder }, "bg-white relative w-full border border-gray-300 rounded-md shadow-sm pl-3 pr-10 text-left cursor-default focus:outline-none focus:ring-1 focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm")}>
              <span className="block truncate">{selectedLabel ?? placeholder}</span>
              <span className="absolute inset-y-0 right-0 flex items-center pr-2 pointer-events-none">
                <SelectorIcon className="h-5 w-5 text-gray-400" aria-hidden="true" />
              </span>
            </Listbox.Button>

            <Transition
              show={open}
              as={Fragment}
              leave="transition ease-in duration-100"
              leaveFrom="opacity-100"
              leaveTo="opacity-0"
            >
              <Listbox.Options className="absolute z-10 mt-1 w-full bg-white shadow-lg max-h-60 rounded-md py-1 text-base ring-1 ring-black ring-opacity-5 overflow-auto focus:outline-none sm:text-sm">
                {selects.map((e: Options, i) => (
                  <Listbox.Option
                    key={i}
                    className={({ active }) =>
                      classNames(
                        active ? 'text-white bg-indigo-600' : 'text-gray-900',
                        'cursor-default select-none relative py-2 pl-3 pr-9'
                      )
                    }
                    value={JSON.stringify({
                      value: e.value,
                      label: e.label,
                    })}
                  >
                    {({ selected, active }) => (
                      <>
                        <span className={classNames(e.label === selectedLabel ? 'font-semibold' : 'font-normal', 'block truncate')}>
                          {e.label}
                        </span>

                        {e.label === selectedLabel ? (
                          <span
                            className={classNames(
                              e.label === selectedLabel ? 'text-indigo-600' : 'text-white',
                              'absolute inset-y-0 right-0 flex items-center pr-4'
                            )}
                          >
                            <CheckIcon className="h-5 w-5" aria-hidden="true" />
                          </span>
                        ) : null}
                      </>
                    )}
                  </Listbox.Option>
                ))}
              </Listbox.Options>
            </Transition>
          </div>
        </>
      )}
    </Listbox>
  )
}

export default SelectInput