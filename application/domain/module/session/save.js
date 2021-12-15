async (token, data) => {
  return domain.entity.Session.update(token, { data: JSON.stringify(data) });
};
