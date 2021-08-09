export function FolderObject(this: any, name: string) {
    this.type = 'folder'
    this.name = name
    this.children = {}
}

export function FileObject(this: any, name: string) {
    this.type = 'file'
    this.name = name
    this.href = ''
}
