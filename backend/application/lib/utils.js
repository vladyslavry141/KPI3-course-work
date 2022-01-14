({
  async tryReturn(context, args, fn) {
    try {
      return await fn(context, args);
    } catch (error) {
      if (!error.code) throw error;
      return error;
    }
  },
});
