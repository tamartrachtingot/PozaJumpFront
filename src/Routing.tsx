
import { Route, Routes, useRoutes } from 'react-router-dom';
import ShowItem from './features/Item/ShowItem';
import SignIn from './features/User/SignIn';
import SignUp from './features/User/SignUp';
import GetCategory from './features/Category/GetCategory';
import HomePage from './app/HomePage';



const Routing = () => {
    let element = useRoutes([
        { path: "SignIn", element: <SignIn/> },
        { path: "getCategory", element: <GetCategory/> },
        { path: "SignUp", element: <SignUp/> },  
        { path:"items", element: <ShowItem/>},
        
    ]);
 

    return element;
}
export default Routing;