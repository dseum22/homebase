import { ChevronRightIcon } from '@heroicons/react/outline'
import React, { cloneElement, useContext } from 'react'
import { ArticlesContext, PathContext } from '../lib/contexts'

const Breadcrumbs = (props: { setPath: Function }) => {
    const path = useContext(PathContext)
    const articles = useContext(ArticlesContext)
    const children: JSX.Element[] = [
        <button
            className="rounded py-1 px-2 hover:bg-gray-100 transition-colors duration-200"
            onClick={() => props.setPath([])}
        >
            ROOT
        </button>,
    ]
    path.forEach((value, index) =>
        children.push(
            <ChevronRightIcon className="h-4 w-4 mx-2 flex-shrink-0" />,
            <button
                className="rounded py-1 px-2 hover:bg-gray-100 transition-colors duration-200 uppercase"
                onClick={() => props.setPath(path.slice(0, index + 1))}
            >
                {articles[value]}
            </button>
        )
    )
    return (
        <>
            {children.map((child, index) =>
                cloneElement(child, {
                    key: index,
                })
            )}
        </>
    )
}

export default Breadcrumbs
