import { useContext, useEffect, useState } from "react"
import { Link } from "react-router-dom";
import { authenticationContext } from "../../../App";
import { ClassDTO } from "../../../dtos/ClassDTO";

export function TeachersHomePage() {
    let [classes, setClasses] = useState(new Array<ClassDTO>());
    let authentication = useContext(authenticationContext);
    useEffect(() => {
        async function loadClasses() {
            let result = await fetch("http://127.0.0.1:8080/api/teacher/classes", {
                method: "GET",
                headers: authentication.authHeader,
            });
            if (!result.ok) return;
            else {
                setClasses(await result.json())
            }
        }
        loadClasses();
    }, [])
    let classList = classes.map((schoolClass) => {
        return (
            <h4 key={schoolClass.classId}>
                <Link className="text-decoration-none" to={"/tasks/?classId="+schoolClass.classId} state={schoolClass}>{schoolClass.className}</Link>
            </h4>
        )
    });
    return (
        <>
            <h1>Классы:</h1>
            <ul>{classList}</ul>
        </>
    )
}