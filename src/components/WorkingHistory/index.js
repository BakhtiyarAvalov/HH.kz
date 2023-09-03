const monthsInRussian = [
    'январь', 'февраль', 'март', 'апрель', 'май', 'июнь', 'июль ', 'август', 'сентябрь', 'октябрь', 'ноябрь', 'декабрь' 
]
export default function WorkingHistory({workingHistory, remove}){
    const startDate = new Date(workingHistory.start_date)
    const endDate = new Date(workingHistory.and_date)

    return(
        <div className="working-history">
            <span>{monthsInRussian[startDate.getMonth()]} {startDate.getUTCFullYear()} - {monthsInRussian[endDate.getMonth()]} {endDate.getUTCFullYear()}</span>
            <h4>{workingHistory.company_name}</h4>
            <h4>{workingHistory.company_description}</h4>
            <span onClick={() => remove(workingHistory)}>Удалить</span> 
        </div>
    )
}