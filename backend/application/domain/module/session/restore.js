async (token) => {
  const record = await domain.entity.Session.getByToken(token, ['data']);
  if (record && record.data) return record.data;
  return null;
};
