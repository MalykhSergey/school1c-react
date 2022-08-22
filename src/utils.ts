import { AuthenticationData } from "./AuthenticationData";
import { ClassDTO } from "./dtos/ClassDTO";

export async function loadClassesForTeacher(authentication: AuthenticationData, setClasses: (classes: Array<ClassDTO>) => void) {
    let result = await fetch("http://127.0.0.1:8080/api/teacher/classes", {
        method: "GET",
        headers: { Authorization: authentication.authHeader }
    });
    if (!result.ok) return;
    else {
        setClasses(await result.json())
    }
}