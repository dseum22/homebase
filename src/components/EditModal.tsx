import React, {
    ChangeEvent,
    Fragment,
    KeyboardEvent,
    useContext,
    useEffect,
    useRef,
    useState,
} from 'react'
import { Dialog, Transition } from '@headlessui/react'
import { PencilIcon } from '@heroicons/react/outline'
import { ArticlesContext } from '../lib/contexts'

const EditModal = (props: {
    item: ItemInterface
    name: string
    updateArticles: Function
    setMutable: Function
    editItem: Function
}) => {
    const articles = useContext(ArticlesContext)
    const [open, setOpen] = useState(true)
    const [data, setData] = useState({
        name: props.name,
        href: props.item.href,
    })
    const nameInputRef = useRef(null)
    useEffect(() => {
        if (!open) {
            props.setMutable(false)
        }
    }, [open])
    const handleChange = (e: ChangeEvent<HTMLInputElement>) =>
        setData({
            ...data,
            [e.target.name]: e.target.value,
        })
    const handleSubmit = () => {
        if (String(data.href).includes('https://')) {
            props.editItem({
                ...props.item,
                href: data.href,
            })
        } else {
            props.editItem({
                ...props.item,
                href: `https://${data.href}`,
            })
        }
        props.updateArticles({ ...articles, [props.item.id]: data.name })
        setOpen(false)
    }
    const handleKeyPress = (e: KeyboardEvent) => {
        if (e.key === 'Enter') {
            handleSubmit()
        }
    }
    return (
        <Transition.Root appear show={open} as={Fragment}>
            <Dialog
                as="div"
                static
                className="fixed z-10 inset-0 overflow-y-auto"
                initialFocus={nameInputRef}
                open={open}
                onClose={() => {}}
            >
                <div className="flex items-end justify-center min-h-screen pt-4 px-4 pb-20 text-center sm:block sm:p-0">
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
                        className="hidden sm:inline-block sm:align-middle sm:h-screen"
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
                        <div className="inline-block align-bottom bg-white rounded-lg text-left overflow-hidden shadow-xl transform transition-all sm:my-8 sm:align-middle sm:max-w-lg sm:w-full">
                            <div className="bg-white px-4 pt-5 pb-4 sm:p-6 sm:pb-4">
                                <div className="sm:flex sm:items-start">
                                    <div className="mx-auto flex-shrink-0 flex items-center justify-center h-12 w-12 rounded-full bg-blue-100 sm:mx-0 sm:h-10 sm:w-10">
                                        <PencilIcon
                                            className="h-6 w-6 text-blue-600"
                                            aria-hidden="true"
                                        />
                                    </div>
                                    <div className="mt-3 text-center sm:mt-0 sm:ml-4 sm:text-left flex-grow">
                                        <Dialog.Title
                                            as="h3"
                                            className="text-lg leading-6 font-medium text-gray-900"
                                        >
                                            Edit properties
                                        </Dialog.Title>
                                        <div className="mt-2">
                                            <div className="form-floating w-full">
                                                <input
                                                    ref={nameInputRef}
                                                    className="form-field"
                                                    name="name"
                                                    type="text"
                                                    value={data.name}
                                                    onChange={handleChange}
                                                    onKeyPress={handleKeyPress}
                                                ></input>
                                                <label>Name</label>
                                            </div>
                                            <div className="form-floating mt-2 w-full">
                                                <input
                                                    className="form-field"
                                                    name="href"
                                                    type="url"
                                                    value={data.href}
                                                    onChange={handleChange}
                                                    onKeyPress={handleKeyPress}
                                                ></input>
                                                <label>Link</label>
                                            </div>
                                        </div>
                                    </div>
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
                                    onClick={handleSubmit}
                                >
                                    Save
                                </button>
                            </div>
                        </div>
                    </Transition.Child>
                </div>
            </Dialog>
        </Transition.Root>
    )
}

export default EditModal
