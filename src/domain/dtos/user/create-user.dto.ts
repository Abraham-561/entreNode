import { regularExp } from "../../../config";

export class CreateUserDTO {
  constructor(
    public name: string,
    public surname: string,
    public email: string,
    public cellphone: string,
    public password: string,
    public status: boolean
  ) {}

  static create(obj: { [key: string]: any }): [string?, CreateUserDTO?] {
    const { name, surname, email, cellphone, password, status } = obj;

    if (!name) return ["Name is required"];
    if (!surname) return ["Surname is required"];
    if (!email) return ["Email is required"];
    if (!regularExp.email.test(email)) return ["Invalid Email"];
    if (!cellphone) return ["Cellphone is required"];
    if (!password) return ["Missing password"];
    if (!regularExp.password.test(password))
      return [
        "The password must be at least 10 characters long and contain at least one uppercase letter, one lowercase letter, and one special character.",
      ];
    if (status === undefined) return ["Status is required"];

    return [undefined, new CreateUserDTO(name, surname, email, cellphone, password, status)];
  }
}
