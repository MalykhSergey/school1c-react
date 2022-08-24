import { ClassDTO, getNameWithNumberOfClass } from "../../../dtos/ClassDTO";
import { FieldState } from "../../../Fields";
import { NotificationAlert } from "../../NotificationAlert";


export function ClassSelect(props: { classes: Array<ClassDTO>, classIdField: FieldState, setClassIdField: (classIdField: FieldState) => void }) {
    let classList = props.classes.map((schoolClass) => {
        return (
            <option key={schoolClass.classId} value={schoolClass.classId}>{getNameWithNumberOfClass(schoolClass)}</option>
        )
    });
    return (
        <div className="form-group">
            <label htmlFor="className">Название класса</label>
            <select name="className" id="className" className="form-select mb-3" onChange={(event) => {
                props.setClassIdField({ value: event.currentTarget.value, isValid: true, message: "" })
            }}>
                <option value="">Выберите класс</option>
                {classList}
            </select>
            {!props.classIdField.isValid &&
                <NotificationAlert succesful={false} message={props.classIdField.message} />}
        </div>
    )
}