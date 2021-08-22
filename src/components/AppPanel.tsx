import {
    ArrowRightIcon,
    DocumentAddIcon,
    ExternalLinkIcon,
    FolderAddIcon,
    PencilIcon,
    TrashIcon,
} from '@heroicons/react/outline'
import React, {
    MutableRefObject,
    useContext,
    useEffect,
    useRef,
    useState,
} from 'react'
import { ArticlesContext, PathContext, SelectedContext } from '../lib/contexts'
import {
    generateId,
    getStoredSystem,
    setStoredArticles,
    setStoredSystem,
} from '../lib/utilities'
import ContextMenu from './ContextMenu'
import File from './File'
import Folder from './Folder'

const AppPanel = (props: { setPath: Function; setArticles: Function }) => {
    const path = useContext(PathContext)
    const articles = useContext(ArticlesContext)
    const panelRef = useRef<HTMLElement>(null) as MutableRefObject<HTMLElement>
    const [system, setSystem] = useState(getStoredSystem())
    const [selected, setSelected] = useState({} as any)
    const [contextMenuType, setContextMenuType] = useState('default')
    const handleClick = (e: MouseEvent) => {
        if (e.target === panelRef.current) {
            setSelected({})
            setContextMenuType('default')
        }
    }
    useEffect(() => {
        document.addEventListener('contextmenu', handleClick)
        document.addEventListener('click', handleClick)
        return () => {
            document.removeEventListener('contextmenu', handleClick)
            document.removeEventListener('click', handleClick)
        }
    }, [])
    const updateSystem = (newSystem: ItemInterface[]) => {
        setStoredSystem(newSystem)
        setSystem(newSystem)
    }
    const updateArticles = (newArticles: {}) => {
        setStoredArticles(newArticles)
        props.setArticles(newArticles)
    }
    const editItem = (newItem: ItemInterface) => {
        if (path.length === 0) {
            const tempSystem = system.filter((tempItem: ItemInterface) => {
                if (tempItem.id !== newItem.id) {
                    return tempItem
                }
            })
            updateSystem([...tempSystem, newItem])
        } else {
            let currentPath = [...path]
            const locate = (array: ItemInterface[]): any[] =>
                array.map((item: ItemInterface) => {
                    if (item.id === currentPath[0]) {
                        currentPath.shift()
                        if (currentPath.length === 0) {
                            const tempChildren = (
                                item.children as ItemInterface[]
                            ).filter(tempItem => {
                                if (tempItem.id !== newItem.id) {
                                    return tempItem
                                }
                            })
                            return {
                                ...item,
                                children: [...tempChildren, newItem],
                            }
                        } else {
                            return {
                                ...item,
                                children: locate(
                                    item.children as ItemInterface[]
                                ),
                            }
                        }
                    } else {
                        return item
                    }
                })
            updateSystem(locate(system))
        }
    }
    const displaySystem = () => {
        let currentSystem = system
        if (path.length > 0) {
            for (let i = 0; i < path.length; i++) {
                currentSystem = (() => {
                    for (const item of currentSystem) {
                        if (item.id === path[i]) {
                            return item.children
                        }
                    }
                })()
            }
        }
        if (currentSystem.length > 0) {
            return currentSystem.map((item: ItemInterface, index: number) => {
                switch (item.type) {
                    case 'folder':
                        return (
                            <Folder
                                key={item.id}
                                item={item}
                                setPath={props.setPath}
                                setSelected={setSelected}
                                setContextMenuType={setContextMenuType}
                                updateArticles={updateArticles}
                            >
                                {articles[item.id]}
                            </Folder>
                        )
                    case 'file':
                        return (
                            <File
                                key={item.id}
                                item={item}
                                setSelected={setSelected}
                                setContextMenuType={setContextMenuType}
                                updateArticles={updateArticles}
                                editItem={editItem}
                            >
                                {articles[item.id]}
                            </File>
                        )
                }
            })
        }
    }
    const createItem = (type: string) => {
        const newId = generateId()
        const items: { [index: string]: ItemInterface } = {
            folder: {
                id: newId,
                type: 'folder',
                children: [],
            },
            file: {
                id: newId,
                type: 'file',
                href: '#',
            },
        }
        if (path.length === 0) {
            updateSystem([...system, items[type]])
        } else {
            let currentPath = [...path]
            const locate = (array: ItemInterface[]): any[] =>
                array.map((item: ItemInterface) => {
                    if (item.id === currentPath[0]) {
                        currentPath.shift()
                        if (currentPath.length === 0) {
                            return {
                                ...item,
                                children: [
                                    ...(item.children as ItemInterface[]),
                                    items[type],
                                ],
                            }
                        } else {
                            return {
                                ...item,
                                children: locate(
                                    item.children as ItemInterface[]
                                ),
                            }
                        }
                    } else {
                        return item
                    }
                })
            updateSystem(locate(system))
        }
        updateArticles({
            ...articles,
            [newId]: 'Untitled',
        })
    }
    const deleteItem = () => {
        if (path.length === 0) {
            updateSystem(
                system.filter((tempItem: ItemInterface) => {
                    if (tempItem.id !== selected.item.id) {
                        return tempItem
                    }
                })
            )
        } else {
            let currentPath = [...path]
            const locate = (array: ItemInterface[]): any[] =>
                array.map((item: ItemInterface) => {
                    if (item.id === currentPath[0]) {
                        currentPath.shift()
                        if (currentPath.length === 0) {
                            return {
                                ...item,
                                children: (
                                    item.children as ItemInterface[]
                                ).filter(tempItem => {
                                    if (tempItem.id !== selected.item.id) {
                                        return tempItem
                                    }
                                }),
                            }
                        } else {
                            return {
                                ...item,
                                children: locate(
                                    item.children as ItemInterface[]
                                ),
                            }
                        }
                    } else {
                        return item
                    }
                })
            updateSystem(locate(system))
        }
        let tempArticles = articles
        delete tempArticles[selected.item.id]
        updateArticles(tempArticles)
    }
    const contextMenus: { [index: string]: ContextMenuInterface[] } = {
        default: [
            {
                icon: FolderAddIcon,
                name: 'Add folder',
                method: () => createItem('folder'),
            },
            {
                icon: DocumentAddIcon,
                name: 'Add file',
                method: () => createItem('file'),
            },
        ],
        folder: [
            {
                icon: ArrowRightIcon,
                name: 'Open',
                method: () => props.setPath([...path, selected.item.id]),
            },
            {
                icon: PencilIcon,
                name: 'Edit',
                method: () => selected.enableMutable(),
            },
            {
                icon: TrashIcon,
                name: 'Delete',
                method: () => deleteItem(),
            },
        ],
        file: [
            {
                icon: ExternalLinkIcon,
                name: 'Open',
                method: () => window.location.assign(selected.item.href),
            },
            {
                icon: PencilIcon,
                name: 'Edit',
                method: () => selected.enableMutable(),
            },
            {
                icon: TrashIcon,
                name: 'Delete',
                method: () => deleteItem(),
            },
        ],
    }
    return (
        <>
            <main ref={panelRef} className="py-10 h-full px-[5vw]">
                <div className="flex flex-wrap gap-6">
                    <SelectedContext.Provider value={selected}>
                        {displaySystem()}
                    </SelectedContext.Provider>
                </div>
            </main>
            <ContextMenu targetRef={panelRef}>
                {contextMenus[contextMenuType].map(
                    (contextMenu, index: number) => (
                        <ContextMenu.Action
                            key={index}
                            icon={contextMenu.icon}
                            onClick={() => contextMenu.method()}
                        >
                            {contextMenu.name}
                        </ContextMenu.Action>
                    )
                )}
            </ContextMenu>
        </>
    )
}

export default AppPanel
