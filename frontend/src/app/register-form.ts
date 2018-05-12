export class RegisterForm {
    constructor(
        public firstname: string = "",
        public lastname: string = "",
        public email: string = "",
        public username: string = "",
        public password: string = "",
        public confirmPassword: string = "",
        public readTOS: boolean = false
      ) {  }
}
