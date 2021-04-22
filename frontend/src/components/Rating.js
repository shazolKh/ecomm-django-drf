import React from 'react';

export default function Rating({value, color, text}) {
    const list = []

    for (let i = 1; i < 6; i++){
        list.push(
            <span>
                <i style={{color}} className={
                    value >= i
                        ? 'fas fa-star'
                        : value >= i - 0.5
                        ? 'fas fa-star-half-alt'
                        : 'far fa-star'
                }>

                </i>
            </span>
        )
    }
    return (
        <div className={"rating"}>
            {list}
            <span>{text && text}</span>
        </div>
    )
}