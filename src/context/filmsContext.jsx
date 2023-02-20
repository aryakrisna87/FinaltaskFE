import { createContext, useState } from "react";

export const FilmsContext = createContext();
export const FilmsContextProvider = (props) => {
  const [users, setUsers] = useState();
  const [login, setLogin] = useState(false);
  const [register, setRegister] = useState(false);
  return (
    <FilmsContext.Provider value={{ users, setUsers, login, setLogin, register, setRegister }}>
      {props.children}
    </FilmsContext.Provider>
  );
};
