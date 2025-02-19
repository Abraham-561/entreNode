export class UpdateUserDTO {
  constructor(
    public name?: string,
    public surname?: string,
    public email?: string,
    public cellphone?: string,
    public password?: string,
    public status?: boolean
  ) {}

  static update(obj: { [key: string]: any }): [string?, UpdateUserDTO?] {
    const { name, surname, email, cellphone, password, status } = obj;

    if (!name && !surname && !email && !cellphone && !password && status === undefined) {
      return ["No fields to update"];
    }

    return [undefined, new UpdateUserDTO(name, surname, email, cellphone, password, status)];
  }
}

  