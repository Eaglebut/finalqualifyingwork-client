export class RegisterResponseDto {

    public email: string;
    public name: string;
    public surname: string;

    constructor(email: string, name: string, surname: string) {
        this.email = email;
        this.name = name;
        this.surname = surname;
    }

}

export default RegisterResponseDto;
