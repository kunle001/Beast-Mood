
export const createTokenUser = (user: { name: any; email: any; }) => {
  return {
    name: user.name,
    email: user.email,
  };
};