import { LinkIcon } from '@heroicons/react/outline'
import React, {
    KeyboardEvent,
    MutableRefObject,
    useContext,
    useRef,
    useState,
} from 'react'
import { ArticlesContext, PathContext, SelectedContext } from '../lib/contexts'
import { classNames } from '../lib/utilities'
import EditModal from './EditModal'

const File = (props: {
    children: string
    item: ItemInterface
    setSelected: Function
    setContextMenuType: Function
    updateArticles: Function
    editItem: Function
}) => {
    const selected = useContext(SelectedContext)
    const articles = useContext(ArticlesContext)
    const buttonRef = useRef<HTMLButtonElement>(
        null
    ) as MutableRefObject<HTMLButtonElement>
    const [mutable, setMutable] = useState(false)
    const setSelected = () =>
        props.setSelected({
            item: props.item,
            enableMutable: () => setMutable(true),
        })
    const setContextMenuType = () => props.setContextMenuType('file')
    const updateArticles = (newArticles: { [index: string]: string }) =>
        props.updateArticles(newArticles)
    const handleContextMenu = () => {
        setSelected()
        setContextMenuType()
    }
    const handleDoubleClick = () =>
        window.open(props.item.href, '_blank', 'noreferrer')
    const handleKeyPress = (e: KeyboardEvent) => {
        if (
            selected?.item?.id === props.item.id &&
            e.key === 'Enter' &&
            !mutable
        ) {
            setMutable(true)
        }
    }
    if (mutable) {
        return (
            <>
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
                    onDoubleClick={handleDoubleClick}
                >
                    <div className="relative overflow-hidden w-52 h-full">
                        <div className="absolute w-full h-full text-gray-700 group-hover:text-gray-500 text-lg text-left whitespace-nowrap flex items-center gap-2">
                            <LinkIcon className="w-6 h-6 flex-shrink-0" />
                            {props.children}
                        </div>
                        <div className="absolute right-0 w-1/4 h-full bg-gradient-to-r from-transparent to-white group-hover:to-[#FBFBFB]"></div>
                    </div>
                </button>
                <EditModal
                    item={props.item}
                    name={articles[props.item.id]}
                    updateArticles={updateArticles}
                    setMutable={setMutable}
                    editItem={props.editItem}
                />
            </>
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
                onDoubleClick={handleDoubleClick}
                onKeyPress={handleKeyPress}
            >
                <div className="relative overflow-hidden w-52 h-full">
                    <div className="absolute w-full h-full text-gray-700 group-hover:text-gray-500 text-lg text-left whitespace-nowrap flex items-center gap-2">
                        <LinkIcon className="w-6 h-6 flex-shrink-0" />
                        {props.children}
                    </div>
                    <div className="absolute right-0 w-1/4 h-full bg-gradient-to-r from-transparent to-white group-hover:to-[#FBFBFB]"></div>
                </div>
            </button>
        )
    }
}

export default File
