const getLatestState = (states) =>
  states.reduce(function (prev, current) {
    return prev && new Date(prev.date) > new Date(current.date)
      ? prev
      : current;
  });

export { getLatestState };
