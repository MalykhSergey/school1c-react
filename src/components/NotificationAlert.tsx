export function NotificationAlert(props: { succesful: boolean, message: string }) {
    return (
        <div className={"alert alert-" + (props.succesful ? "success" : "danger")} role="alert">
            {props.message}
        </div>
    )
}