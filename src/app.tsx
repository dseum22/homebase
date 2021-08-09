import React, { useState } from 'react'
import AppPanel from './components/AppPanel'
import Breadcrumbs from './components/Breadcrumbs'
import SettingsModal from './components/SettingsModal'
import { ArticlesContext, PathContext } from './lib/contexts'
import { getStoredArticles } from './lib/utilities'

const App = () => {
    const [path, setPath] = useState([])
    const [articles, setArticles] = useState(getStoredArticles())
    return (
        <>
            <div className="flex flex-col h-screen">
                <PathContext.Provider value={path}>
                    <ArticlesContext.Provider value={articles}>
                        <AppPanel setPath={setPath} setArticles={setArticles} />
                        <div
                            className="flex-shrink-0 flex items-center justify-between w-full h-24 bg-white border-t border-gray-300 px-3"
                            onContextMenu={() => false}
                        >
                            <div className="whitespace-nowrap overflow-auto w-[calc(100vw-5.75rem)] h-full flex items-center px-3">
                                <Breadcrumbs setPath={setPath} />
                            </div>
                            <SettingsModal />
                        </div>
                    </ArticlesContext.Provider>
                </PathContext.Provider>
            </div>
        </>
    )
}

export default App
