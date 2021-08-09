import { FolderIcon } from '@heroicons/react/outline'
import React, {
    ChangeEvent,
    KeyboardEvent,
    MutableRefObject,
    useContext,
    useEffect,
    useRef,
    useState,
} from 'react'
import { ArticlesContext, PathContext, SelectedContext } from '../lib/contexts'
import { classNames } from '../lib/utilities'

const Folder = (props: {
    children: string
    item: ItemInterface
    setPath: Function
    setSelected: Function
    setContextMenuType: Function
    updateArticles: Function
}) => {
    const path = useContext(PathContext)
    const selected = useContext(SelectedContext)
    const articles = useContext(ArticlesContext)
    const inputRef = useRef<HTMLInputElement>(
        null
    ) as MutableRefObject<HTMLInputElement>
    const buttonRef = useRef<HTMLButtonElement>(
        null
    ) as MutableRefObject<HTMLButtonElement>
    const [text, setText] = useState(props.children)
    const [mutable, setMutable] = useState(false)
    useEffect(() => {
        if (mutable) {
            inputRef.current.focus()
        }
    }, [mutable])
    const setPath = () => props.setPath([...path, props.item.id])
    const setSelected = () =>
        props.setSelected({
            item: props.item,
            enableMutable: () => setMutable(true),
        })
    const setContextMenuType = () => props.setContextMenuType('folder')
    const updateArticles = (newArticles: { [index: string]: string }) =>
        props.updateArticles(newArticles)
    const handleContextMenu = () => {
        setSelected()
        setContextMenuType()
    }
    const handleChange = (e: ChangeEvent<HTMLInputElement>) =>
        setText(e.target.value)
    const handleKeyPress = (e: KeyboardEvent) => {
        if (selected?.item?.id === props.item.id && e.key === 'Enter') {
            if (mutable) {
                updateArticles({ ...articles, [props.item.id]: text })
                setMutable(false)
            } else {
                setMutable(true)
            }
        }
    }
    if (mutable) {
        return (
            <input
                ref={inputRef}
                className="h-14 bg-white shadow rounded-md px-4 group hover:bg-[#FBFBFB] w-60 text-gray-700 text-lg focus:outline-none ring-2 ring-gray-500"
                type="text"
                value={text}
                onChange={handleChange}
                onKeyPress={handleKeyPress}
            ></input>
        )
    } else {
        return (
            <button
                ref={buttonRef}
                className={classNames(
                    selected?.item?.id === props.item.id
                        ? 'ring-2 ring-gray-500'
                        : '',
                    'h-14 bg-white shadow rounded-md px-4 group hover:bg-[#FBFBFB] focus:outline-none'
                )}
                type="button"
                onClick={setSelected}
                onContextMenu={handleContextMenu}
                onDoubleClick={setPath}
                onKeyPress={handleKeyPress}
            >
                <div className="relative overflow-hidden w-52 h-full">
                    <div className="absolute w-full h-full text-gray-700 group-hover:text-gray-500 text-lg text-left whitespace-nowrap flex items-center gap-2">
                        <FolderIcon className="w-6 h-6 flex-shrink-0" />
                        {text}
                    </div>
                    <div className="absolute right-0 w-1/4 h-full bg-gradient-to-r from-transparent to-white group-hover:to-[#FBFBFB]"></div>
                </div>
            </button>
        )
    }
}

export default Folder
