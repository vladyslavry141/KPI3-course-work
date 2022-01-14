async (token) => {
  const record = await domain.entity.Session.getByToken(['data'], { token });
  if (record && record.data) return record.data;
  return null;
};
