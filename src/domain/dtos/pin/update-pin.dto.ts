export class UpdatePinDTO {
    constructor(public code?: string) {}
  
    static update(obj: { [key: string]: any }): [string?, UpdatePinDTO?] {
      const { code } = obj;
  
      if (!code) return ["Code is required"];
  
      return [undefined, new UpdatePinDTO(code)];
    }
  }
  