async (ctx, { id, delta }) => {
  try {
    await domain.entity.Account.update(id, delta);
  } catch (error) {
    console.error(error);
    return new Error('Invalid data', 422);
  }
  return {};
};
