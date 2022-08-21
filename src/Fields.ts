export class Field {
    min: number;
    max: number;
    tooShortMessage: string;
    tooLongMessage: string;

    constructor($min: number, $max: number, $tooShortMessage: string, $tooLongMessage: string) {
        this.max = $max;
        this.min = $min;
        this.tooShortMessage = $tooShortMessage + " длинее " + $min + " и короче " + $max + " символов.";
        this.tooLongMessage = $tooLongMessage + " длинее " + $min + " и короче " + $max + " символов.";
    }
}
export class FieldState {
    value: string;
    isValid: boolean;
    message: string;

    constructor(value: string, isValid: boolean, message: string) {
        this.value = value;
        this.isValid = isValid;
        this.message = message;
    }
}
export let NameField = new Field(5, 55, "Введите более длинное имя! Имя должно быть", "Введите более короткое имя! Имя должно быть ");
export let PasswordField = new Field(5, 20, "Введите более длинный пароль! Пароль должен быть", "Введите более короткий пароль! Пароль должен быть ");
export let TaskNameField = new Field(5, 50, "Введите более длинный заголовок! Заголовок должен быть", "Введите более короткий заголовок! Заголовок должен быть ");
export let TaskBodyField = new Field(5, 2000, "Введите более длинное задание! Задание должно быть", "Введите более короткое задание! Задание должно быть ");
export let AnswerBodyField = new Field(5, 5000, "Введите более длинный ответ! Ответ должен быть", "Введите более короткий ответ! Ответ должен быть ");
export function changeField(event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>, field: Field, setFieldState: (state: FieldState) => void,) {
    let value = event.currentTarget.value;
    if (value.length < field.min)
        setFieldState({ value: value, isValid: false, message: field.tooShortMessage });
    else if (value.length > field.max)
        setFieldState({ value: value, isValid: false, message: field.tooLongMessage });
    else setFieldState({ value: value, isValid: true, message: "" });
}