import React from 'react'
import "./DropDown.css"

interface IDropDown {
    dataSet : [{
        name : string
    }],
    title : string
}

const DropDown: React.FC<IDropDown> = ({dataSet, title}) => {
    return (
        <div className="dropdown">
            <button className="dropbtn">{title}</button>
            <div className="dropdown-content">
                {dataSet.map((ele)=>{
                    return <>
                        <div>
                            {ele.name}
                        </div>
                    </>
                })}
            </div> 
        </div>
    )
}

export default DropDown