export class UpdateCredentialDTO {
    constructor(
      public account?: string,
      public password?: string,
      public description?: string,
      public code_1?: string,
      public code_2?: string
    ) {}
  
    static update(obj: { [key: string]: any }): [string?, UpdateCredentialDTO?] {
      const { account, password, description, code_1, code_2 } = obj;
  
      if (!account && !password && !description && !code_1 && !code_2) {
        return ["At least one field is required"];
      }
  
      return [undefined, new UpdateCredentialDTO(account, password, description, code_1, code_2)];
    }
  }
  