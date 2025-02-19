export class CreateSecurityBoxDTO {
    constructor(
      public name: string,
      public favorite: boolean,
      public icon: string,
      public status: string,
      public userId: string
    ) {}
  
    static create(obj: { [key: string]: any }): [string?, CreateSecurityBoxDTO?] {
      const { name, favorite, icon, status, userId } = obj;
  
      if (!name) return ["Name is required"];
      if (!userId) return ["User ID is required"];
  
      return [undefined, new CreateSecurityBoxDTO(name, favorite, icon, status, userId)];
    }
  }
  