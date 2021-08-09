/// <reference types="vite/client" />

interface ItemInterface {
    id: string
    type: string
    children?: ItemInterface[]
    href?: string
}

interface ContextMenuInterface {
    icon: React.FunctionComponent
    name: string
    method: Function
}
