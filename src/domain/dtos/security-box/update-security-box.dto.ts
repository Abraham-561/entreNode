export class UpdateSecurityBoxDTO {
    constructor(
      public name?: string,
      public favorite?: boolean,
      public icon?: string,
      public status?: string
    ) {}
  
    static update(obj: { [key: string]: any }): [string?, UpdateSecurityBoxDTO?] {
      const { name, favorite, icon, status } = obj;
  
      if (!name && favorite === undefined && !icon && !status) {
        return ["At least one field is required"];
      }
  
      return [undefined, new UpdateSecurityBoxDTO(name, favorite, icon, status)];
    }
  }
  