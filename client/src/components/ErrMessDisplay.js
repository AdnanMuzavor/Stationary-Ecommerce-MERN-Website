import React from 'react';

const ErrMessg=(props)=>{
    return(
        <>
<div className={`${props.type} container`}>
    <div className={`text-center ${props.size}`}>
        {props.children}
    </div>
</div>
        </>
    )
}

export default ErrMessg