// Make a unique id with around 5 characters

export const generateId = () => {
  return Math.random().toString(36).substring(2, 7);
};
