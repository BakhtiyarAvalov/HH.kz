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
        item = {item}
        key = {item.id}
    />))
    return <div>
        {showResumes}
    </div>
}