import React from 'react'
import EmailInput from '../../components/form/EmailInput'
import { MailIcon } from '@heroicons/react/solid'
export type LayoutLoginProps = {
  children: React.ReactNode // children as form component
}
const LayoutLogin = (props: LayoutLoginProps) => {
  return (
    <div className="h-screen">    
      <div className="flex min-h-full items-center justify-center px-4 sm:px-6 lg:px-8">
        <div className="w-full max-w-md space-y-8">
          <div>
            <img
              className="mx-auto h-12 w-auto"
              src="https://tailwindui.com/img/logos/mark.svg?color=indigo&shade=600"
              alt="Your Company"
            />
            <h2 className="mt-6 text-center text-3xl font-bold tracking-tight text-gray-900">
              Sign in to your account
            </h2>
          </div>
          {props.children}

        </div>
      </div>
    </div>
  )
}

export default LayoutLogin
