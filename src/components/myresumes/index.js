import MyResume from "./mytrsume"
    // первый вариант
    // export default function MyResumes(props){
    // const showResumes = props.resumes.map (item =>(<MyResume/>))

    // второй вариант
    // const{resumes}=props
    // const showResumes = resumes.map (item =>(<MyResume/>))

    // третий вариант
export default function MyResumes({resumes}){

    const showResumes = resumes.map (item =>(<MyResume item={item} />))
    return <div>
        {showResumes}
    </div>
}