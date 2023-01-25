import ErrorMassage from "../errorMassage/ErrorMassage";
import { Link } from "react-router-dom";


const Page404 = () => {
    return (
        <div>
            <ErrorMassage/>
            <Link to='/' style={{textDecoration: 'underline'}}>Back to the main page</Link>
        </div>
    )
}

export default Page404;