async (token, data, fields = {}) => {
  const record = { token, data: JSON.stringify(data), ...fields };
  await domain.entity.Session.create(record);
};
