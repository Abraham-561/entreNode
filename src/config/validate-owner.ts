export const protectAccountOwner = (
    ownerUserId: string,
    sessionUserId: string
  ): boolean => {
    if (ownerUserId !== sessionUserId) {
      return false;
    }
    return true;
  };
  