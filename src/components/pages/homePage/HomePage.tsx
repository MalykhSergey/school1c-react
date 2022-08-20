import { useContext, useEffect } from "react";
import { authenticationContext } from "../../../App";
import { StudentsHomePage } from "./StudentsHomePage";
import { TeachersHomePage } from "./TeachersHomePage";

export function HomePage() {
    const authentication = useContext(authenticationContext)
    let content = <></>;
    useEffect(()=>{document.title = "Главная"},[]);
    if (authentication.role === "Student")
        content = <StudentsHomePage />
    else if (authentication.role === "Teacher")
        content = <TeachersHomePage />
    return (
        content
    )
}