import { useState } from "react"


export default function Spec({spec, onChange, value}){
    return(
        <div className={`spec`} >
               {value === spec.id && <input name="spec" type="radio"  value={spec.id} id={`${spec.id}`} onChange={onChange} checked/>}
               {value !== spec.id && <input name="spec" type="radio"  value={spec.id} id={`${spec.id}`} onChange={onChange} />}
            <label htmlFor={`${spec.id}`}>{spec.name}</label>
        </div>
    )
}