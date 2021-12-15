async (token) => {
  const record = await domain.entity.Session.getOne(['data'], { token });
  if (record && record.data) return record.data;
  return null;
};
