import { createContext, useReducer } from "react";
  const ThemeContext = createContext();
 
 const initialData = {theme: localStorage.getItem("theme") || "Light" };  // Light Is Defult Value
 const reducer = (state,action) => {
  switch (action.type) {
    case "CHANGE-THEME" :
      return { ...state, theme: action.newValue };
  
    default:
      break;
  }
 }

//  Add Mode To local Storage
function setToLocal(theme){
  localStorage.setItem("theme", theme);
}




export function ThemeProvider({ children }) {
  const [firstState, dispatch] = useReducer(reducer, initialData);
  const changeTheme = (newTheme)=>{
      setToLocal(newTheme)
      dispatch({type:"CHANGE-THEME" , newValue:newTheme})
    }
    return (
       <ThemeContext.Provider value={{ ...firstState , changeTheme , setToLocal}}>
        {children}
       </ThemeContext.Provider>
    );
  }
  
  export default ThemeContext;