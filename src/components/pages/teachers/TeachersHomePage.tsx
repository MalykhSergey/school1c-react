import { useContext, useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { authenticationContext } from "../../../App";
import { ClassDTO, getNameWithNumberOfClass } from "../../../dtos/ClassDTO";
import { loadClassesForTeacher } from "./utils";

export function TeachersHomePage() {
    let [classes, setClasses] = useState(new Array<ClassDTO>());
    let authentication = useContext(authenticationContext);
    useEffect(() => {
        loadClassesForTeacher(authentication, setClasses);
    }, [])
    let classList = classes.map((schoolClass) => {
        return (
            <h4 key={schoolClass.classId}>
                <Link className="text-decoration-none" to={"/tasks/?classId=" + schoolClass.classId} state={schoolClass}>{getNameWithNumberOfClass(schoolClass)}</Link>
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