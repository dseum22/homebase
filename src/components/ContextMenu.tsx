import React, {
    createElement,
    FunctionComponent,
    MouseEventHandler,
    MutableRefObject,
    useEffect,
    useState,
} from 'react'
import { classNames } from '../lib/utilities'

const ContextMenu = (props: {
    children: JSX.Element[]
    targetRef: MutableRefObject<HTMLElement>
}) => {
    const [open, setOpen] = useState(false)
    const [position, setPosition] = useState({
        clientX: 0,
        clientY: 0,
    })
    const handleContextMenu = (e: MouseEvent) => {
        e.preventDefault()
        if (props.targetRef.current.contains(e.target as Node)) {
            const { clientX, clientY } = e
            setPosition({
                clientX,
                clientY,
            })
            setOpen(true)
        } else {
            setOpen(false)
        }
    }
    const handleClick = (e: MouseEvent) => {
        if (e.button === 0) {
            setOpen(false)
        }
    }
    useEffect(() => {
        document.addEventListener('contextmenu', handleContextMenu)
        document.addEventListener('click', handleClick)
        return () => {
            document.removeEventListener('contextmenu', handleContextMenu)
            document.removeEventListener('click', handleClick)
        }
    }, [])
    let style: {} = {
        left: position.clientX,
        top: position.clientY,
    }
    if (screen.width - position.clientX < 230) {
        style = {
            right: screen.width - position.clientX,
            top: position.clientY,
        }
    }

    return (
        <div
            className={classNames(
                open ? '' : 'hidden',
                'absolute w-56 bg-white shadow rounded-md py-2 z-20'
            )}
            style={style}
        >
            {props.children}
        </div>
    )
}

const Action = (props: {
    children: string
    icon: FunctionComponent<{
        className: string
    }>
    onClick: MouseEventHandler
}) => {
    return (
        <button
            className="w-full hover:bg-[#FBFBFB] px-4 py-2"
            type="button"
            onClick={props.onClick}
        >
            <div className="flex items-center justify-between">
                {props.children}
                {createElement(props.icon, {
                    className: 'w-5 h-5',
                })}
            </div>
        </button>
    )
}
ContextMenu.Action = Action

export default ContextMenu
