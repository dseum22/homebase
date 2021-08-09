export const classNames = (...classes: string[]) =>
    classes.filter(Boolean).join(' ')

export const getStoredSystem = () => {
    const system = localStorage.getItem('system')
    if (!system) {
        localStorage.setItem('system', '[]')
        return []
    }
    return JSON.parse(system as string)
}

export const setStoredSystem = (system: ItemInterface[]) => {
    localStorage.setItem('system', JSON.stringify(system))
}

export const generateId = () => `_${Math.random().toString(36).substr(2, 9)}`

export const getStoredArticles = () => {
    const articles = localStorage.getItem('articles')
    if (!articles) {
        localStorage.setItem('articles', '{}')
        return {}
    }
    return JSON.parse(articles as string)
}

export const setStoredArticles = (articles: {}) => {
    localStorage.setItem('articles', JSON.stringify(articles))
}
