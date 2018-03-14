export const chain = (filters, req, res, context = {}) => (
  new Promise((resolve, fail) => {
    if (!filters || filters.length === 0) {
      resolve();
      return;
    }

    const getContext = () => (context);

    new Promise((fulfill, reject) => {
      const next = (err) => {
        if (err) {
          reject(err);
        } else {
          fulfill();
        }
      };
      const filter = filters[0];
      filter(req, res, next, getContext);
    })
    .then(() => {
      if (filters.length > 0) {
        chain(filters.slice(1), req, res, context)
          .then(resolve)
          .catch(fail);
      } else {
        resolve();
      }
    })
    .catch(fail);
  })
);

export default chain;
