async (token, data, fields = {}) => {
  const record = { token, data, ...fields };
  return domain.entity.Session.create(record);
};
