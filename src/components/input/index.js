
export default function Input({label, placholder, type, onChange, size}){
    return(
        <fieldset className={"fielcet " + size}>
           <label>{label}</label>
            <input className="input" placeholder={placholder} type={type} onChange={onChange}/>
        </fieldset>
    )
}