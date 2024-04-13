import React from 'react'
import styledSkeleton from '@/styles/globals.module.css'

export const SkeletonTasks = () => {
    const skeletonItems = Array.from(
        {
            length: 5
        },
        (_, index) => (
            <div key={index} className={styledSkeleton.skeletonItem}>
            </div>
        ))

    return (
        <div className={styledSkeleton.skeletonContainer}>
            {skeletonItems}
        </div>
    )
}

