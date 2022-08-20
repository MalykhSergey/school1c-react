import { AnswerBody, Name, Password } from "./StringsLegthConstants";

export let TooLongAnswerBody = "Введите более короткий ответ! Ответ должен быть " + lengthDescription(AnswerBody);
export let TooShortAnswerBody = "Введите более длинный ответ! Ответ должен быть " + lengthDescription(AnswerBody);
export let TooLongName = "Введите более короткое имя! Имя должно быть " + lengthDescription(Name);
export let TooShortName = "Введите более длинное имя! Имя должно быть " + lengthDescription(Name);
export let TooLongPassword = "Введите более короткий пароль! Пароль должен быть " + lengthDescription(Password);
export let TooShortPassword = "Введите более длинный пароль! Пароль должен быть " + lengthDescription(Password);
function lengthDescription(legnthConstant: { min: number, max: number }) {
    return "длинее " + legnthConstant.min + " и короче " + legnthConstant.max + " символов.";
}