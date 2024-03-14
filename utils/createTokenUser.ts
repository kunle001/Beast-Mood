
export const createTokenUser = (user: {
  _id: string; name: string; email: string;
}) => {
  return {
    name: user.name,
    email: user.email,
    userId: user._id,
  };
};