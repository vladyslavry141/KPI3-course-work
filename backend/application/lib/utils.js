({
  async tryReturn(ctx, fn) {
    try {
      return await fn(ctx);
    } catch (error) {
      if (!error.code) throw error;
      console.error(error);
      return error;
    }
  },

  async tryReturnObj(ctx, fn, field) {
    const result = await this.tryReturn(ctx, fn);
    if (result instanceof Error) return result;
    return { [field]: result };
  },

  filterObject: (obj, fn) => Object.fromEntries(Object.entries(obj).filter(fn)),

  filterFields: (obj, fields = []) =>
    lib.utils.filterObject(obj, ([key]) => !fields.includes(key)),
});
