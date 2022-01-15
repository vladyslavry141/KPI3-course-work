async (ctx, id, delta) => {
  try {
    const filteredDelta = lib.utils.filterFields(delta, [
      'accountId',
      'createdAt',
    ]);
    await domain.entity.Account.update(id, filteredDelta);
  } catch (error) {
    console.error(error);
    return new Error('Invalid data', 422);
  }
  return {};
};
