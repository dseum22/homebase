import React, { Fragment, useState } from 'react'
import { Dialog, Transition } from '@headlessui/react'
import { CogIcon, RefreshIcon, TerminalIcon } from '@heroicons/react/outline'
import Accordian from './Accordian'
import { getStoredArticles, getStoredSystem } from '../lib/utilities'

const SettingsModal = () => {
    const [open, setOpen] = useState(false)
    return (
        <>
            <button
                className="rounded-full p-3 hover:bg-gray-100 transition-colors duration-200"
                type="button"
                onClick={() => setOpen(true)}
            >
                <CogIcon className="h-8 w-8" />
            </button>
            <Transition.Root show={open} as={Fragment}>
                <Dialog
                    as="div"
                    static
                    className="fixed z-10 inset-0 overflow-y-auto"
                    open={open}
                    onClose={setOpen}
                >
                    <div className="min-h-screen text-center">
                        <Transition.Child
                            as={Fragment}
                            enter="ease-out duration-300"
                            enterFrom="opacity-0"
                            enterTo="opacity-100"
                            leave="ease-in duration-200"
                            leaveFrom="opacity-100"
                            leaveTo="opacity-0"
                        >
                            <Dialog.Overlay className="fixed inset-0 bg-gray-500 bg-opacity-75 transition-opacity" />
                        </Transition.Child>
                        <span
                            className="inline-block align-middle h-screen"
                            aria-hidden="true"
                        >
                            &#8203;
                        </span>
                        <Transition.Child
                            as={Fragment}
                            enter="ease-out duration-300"
                            enterFrom="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
                            enterTo="opacity-100 translate-y-0 sm:scale-100"
                            leave="ease-in duration-200"
                            leaveFrom="opacity-100 translate-y-0 sm:scale-100"
                            leaveTo="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
                        >
                            <div className="inline-block bg-white rounded-lg text-left overflow-hidden shadow-xl transform transition-all align-middle w-[calc(100vw-6rem)] h-[calc(100vh-6rem)]">
                                <div className="flex flex-col justify-between h-full">
                                    <div className="flex-grow bg-white px-4 pt-5 pb-4 sm:p-6 sm:pb-4">
                                        <div className="h-full w-full overflow-auto space-y-3">
                                            <Accordian>
                                                <Accordian.Title>
                                                    General
                                                </Accordian.Title>
                                                <Accordian.Content>
                                                    <button
                                                        className="flex items-center gap-1 uppercase px-4 py-2 text-base font-medium text-blue-900 bg-blue-100 rounded-md hover:bg-blue-200 focus:outline-none"
                                                        type="button"
                                                        onClick={() => {
                                                            console.log(
                                                                JSON.stringify(
                                                                    getStoredSystem()
                                                                )
                                                            )
                                                            console.log(
                                                                JSON.stringify(
                                                                    getStoredArticles()
                                                                )
                                                            )
                                                        }}
                                                    >
                                                        Print{' '}
                                                        <TerminalIcon className="h-5 w-5" />
                                                    </button>
                                                </Accordian.Content>
                                            </Accordian>
                                            <Accordian>
                                                <Accordian.Title>
                                                    Advanced
                                                </Accordian.Title>
                                                <Accordian.Content>
                                                    <button
                                                        className="flex items-center gap-1 uppercase px-4 py-2 text-base font-medium text-red-900 bg-red-100 rounded-md hover:bg-red-200 focus:outline-none"
                                                        type="button"
                                                        onClick={() => {
                                                            localStorage.clear()
                                                            location.reload()
                                                        }}
                                                    >
                                                        Reset{' '}
                                                        <RefreshIcon className="h-5 w-5" />
                                                    </button>
                                                </Accordian.Content>
                                            </Accordian>
                                            <Accordian>
                                                <Accordian.Title>
                                                    About
                                                </Accordian.Title>
                                                <Accordian.Content>
                                                    <p>
                                                        Homebase was made to
                                                        provide a productive
                                                        center to your workflow.
                                                        Removing the need for
                                                        cramped bookmarks bar or
                                                        slow websites, it
                                                        improves efficiency and
                                                        just makes life a whole
                                                        lot easier. This was
                                                        created thanks to React,
                                                        Vite, Tailwind, and a
                                                        host of other packages.
                                                    </p>
                                                    <p className="mt-2">
                                                        Homebase 1.0 &copy;{' '}
                                                        {new Date().getFullYear()}{' '}
                                                        <a
                                                            href="https://denniseum.com"
                                                            target="_blank"
                                                            rel="noreferrer"
                                                        >
                                                            Dennis Eum
                                                        </a>
                                                    </p>
                                                </Accordian.Content>
                                            </Accordian>
                                        </div>
                                    </div>
                                    <div className="bg-gray-50 p-3 flex justify-end gap-4">
                                        <button
                                            type="button"
                                            className="inline-flex justify-center px-4 py-2 text-base font-medium text-red-900 bg-red-100 rounded-md hover:bg-red-200 focus:outline-none"
                                            onClick={() => setOpen(false)}
                                        >
                                            Cancel
                                        </button>
                                        <button
                                            type="button"
                                            className="inline-flex justify-center px-4 py-2 text-base font-medium text-blue-900 bg-blue-100 rounded-md hover:bg-blue-200 focus:outline-none"
                                            onClick={() => setOpen(false)}
                                        >
                                            Save
                                        </button>
                                    </div>
                                </div>
                            </div>
                        </Transition.Child>
                    </div>
                </Dialog>
            </Transition.Root>
        </>
    )
}

export default SettingsModal
