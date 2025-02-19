export class CreatePinDTO {
    constructor(public code: string, public userId: string) {}
  
    static create(obj: { [key: string]: any }): [string?, CreatePinDTO?] {
      const { code, userId } = obj;
  
      if (!code) return ["Code is required"];
      if (!userId) return ["User ID is required"];
  
      return [undefined, new CreatePinDTO(code, userId)];
    }
  }
  