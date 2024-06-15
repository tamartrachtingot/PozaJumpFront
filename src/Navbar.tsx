
import { NavLink } from 'react-router-dom';


export default function Navbar() { 

  return (
   
    <div>
      <NavLink to="/SignUp">הרשמה</NavLink>
      <NavLink to="/SignIn">כניסת משתמש רשום</NavLink>
      <NavLink to="/GetCategory">קטגוריות</NavLink>
      <NavLink to="/item">אייטמים</NavLink>
      
    </div>
  );
  
}

