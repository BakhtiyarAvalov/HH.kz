import { useState, useEffect } from "react"

export default function AddLang({onChange}){
    const [foreignLanguages, setForeignLanguages] = useState([])
    const remove = (index) => {
        const langs = [...foreignLanguages];
        langs.splice(index, 1)
        setForeignLanguages(langs)
    }
    const onSelect = (e) =>{
        const [index, key] = e.target.name.split("-")
        const langs = [...foreignLanguages];
        langs[index][key] = e.target.value;
        setForeignLanguages(langs)

        onChange(langs)
    }

    const lns = foreignLanguages.map((ln, index) =>(
        <div key={index} className=" lns fieldset-md selectdate selectdate-noday">
           <span className="remove" onClick={()=> remove(index)}>x</span>
            <select placeholder="Языки" name = {index + "-name"} className="input" value={foreignLanguages[index].name} onChange={onSelect}>
                <option disabled>Выберите язык</option>
                <option value="Казахский">Казахский</option>
                <option value="Английский">Английский</option>
                <option value="Русский">Русский</option>
            </select>
            <select placeholder="Уровень" name = {index + "-level"} className="input" value={foreignLanguages[index].level} onChange={onSelect}>
                <option value="A1">А1 - начальный</option>
                <option value="A2">А2 - элементарный</option>
                <option value="B1">В1 - средний</option>
                <option value="B2">В2 - средний продвинутый</option>
                <option value="C1">С1 - продвинутый</option>
                <option value="C2">С2 - в совершенстве</option>
            </select>
        </div>
    ))
    return(
        <div className="eds">
            {lns}
            <a onClick={()=> setForeignLanguages ([...foreignLanguages, {name: "", level: ""}])}>Добавить язык</a>
        </div>
    )
}