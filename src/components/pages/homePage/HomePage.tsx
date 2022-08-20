import { useContext } from "react";
import { authenticationContext } from "../../../App";
import { StudentsHomePage } from "./StudentsHomePage";

export function HomePage() {
    const authentication = useContext(authenticationContext)
    let content = <></>;
    if (authentication.role === "Student")
        content = <StudentsHomePage />
    return (
        content
    )
}