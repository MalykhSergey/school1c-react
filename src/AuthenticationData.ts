export class AuthenticationData {
    authenticated: boolean;
    role: string;
    authHeader: { Authorization: string };
    setState: (state: { authenticated: boolean, role: string, authHeader: { Authorization: string } }) => void;
    constructor(
        authenticated: boolean,
        role: string,
        authHeader: { Authorization: string },
        setState: (state: { authenticated: boolean, role: string, authHeader: { Authorization: string } }) => void
    ) {
        this.authenticated = authenticated;
        this.role = role;
        this.authHeader = authHeader;
        this.setState = setState;
    }
}