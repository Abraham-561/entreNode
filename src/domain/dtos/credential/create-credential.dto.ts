export class CreateCredentialDTO {
    constructor(
      public account: string,
      public password: string,
      public description: string,
      public code1: string,
      public code2: string,
      public securityBoxId: string,
      public pinId: string
    ) {}
  
    static create(obj: { [key: string]: any }): [string?, CreateCredentialDTO?] {
      const { account, password, description, code1, code2, securityBoxId, pinId } = obj;
  
      if (!account) return ["Account is required"];
      if (!password) return ["Password is required"];
      if (!securityBoxId) return ["Security Box ID is required"];
      if (!pinId) return ["PIN ID is required"];
  
      return [undefined, new CreateCredentialDTO(account, password, description, code1, code2, securityBoxId, pinId)];
    }
  }
  