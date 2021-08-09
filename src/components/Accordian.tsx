import React, { Children } from 'react'
import { Disclosure } from '@headlessui/react'
import { ChevronUpIcon } from '@heroicons/react/solid'
import { classNames } from '../lib/utilities'

const Accordian = (props: { children: JSX.Element[] }) => {
    return (
        <Disclosure as="div">
            {({ open }) => (
                <>
                    <Disclosure.Button className="flex justify-between items-center w-full px-4 py-2 text-xl font-medium text-left text-gray-900 bg-gray-100 rounded-lg hover:bg-gray-200 focus:outline-none focus-visible:ring focus-visible:ring-gray-500 focus-visible:ring-opacity-75">
                        <span>
                            {Children.map(props.children, child => {
                                if (child.type.displayName === 'Title') {
                                    return child
                                }
                            })}
                        </span>
                        <ChevronUpIcon
                            className={classNames(
                                open ? 'transform rotate-180' : '',
                                'w-8 h-8 text-gray-500'
                            )}
                        />
                    </Disclosure.Button>
                    <Disclosure.Panel className="px-4 pt-4 pb-2 text-lg text-gray-500">
                        {Children.map(props.children, child => {
                            if (child.type.displayName === 'Content') {
                                return child
                            }
                        })}
                    </Disclosure.Panel>
                </>
            )}
        </Disclosure>
    )
}

const Title = (props: { children: string }) => {
    return <>{props.children}</>
}
Title.displayName = 'Title'
Accordian.Title = Title

const Content = (props: { children: React.ReactNode }) => {
    return <>{props.children}</>
}
Content.displayName = 'Content'
Accordian.Content = Content

export default Accordian
