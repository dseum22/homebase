import { createContext } from 'react'

export const PathContext = createContext([] as string[])
export const ArticlesContext = createContext({} as { [index: string]: string })
export const SystemContext = createContext([])
export const SelectedContext = createContext(
    {} as {
        item: ItemInterface
        enableMutable: Function
        enableLink?: Function
    }
)
