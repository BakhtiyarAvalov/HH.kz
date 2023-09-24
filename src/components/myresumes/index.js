import MyResume from "./myrsume"
    // первый вариант
    // export default function MyResumes(props){
    // const showResumes = props.resumes.map (i =>(<MyResume/>))

    // второй вариант
    // const{resumes}=props
    // const showResumes = resumes.map (item =>(<MyResume/>))

    // третий вариант
export default function MyResumes({resumes}){

    const showResumes = resumes.map (item =>(
    <MyResume 
        position = {item.position} 
        createdAt = {item.createdAt}
        show = {0}
        views = {0}
        applise = {0}
        kay = {item.id}
    />))
    return <div>
        {showResumes}
    </div>
}