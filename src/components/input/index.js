
export default function Input({label, placholder, type, onChange, size}){
    return(
        <fieldset className={"fieldset " + size}>
           <label>{label}</label>
            <input className="input" placeholder={placholder} type={type} onChange={onChange}/>
        </fieldset>
    )
}