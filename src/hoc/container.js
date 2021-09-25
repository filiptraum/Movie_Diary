import React from "react";

const Container = ({classNames, children}) => {
    return (
        <div className = {classNames}>
            <div className = 'container'>
                <div className = 'content'>
                    {children}
                </div>
            </div>
        </div>
    )
}

export default Container;