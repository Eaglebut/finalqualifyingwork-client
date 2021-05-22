export class RegisterRequestDto {
    public email: string;
    public password: string;
    public name: string;
    public surname: string;

    constructor(email: string, password: string, name: string, surname: string) {
        this.email = email;
        this.password = password;
        this.name = name;
        this.surname = surname;
    }
}

export default RegisterRequestDto;