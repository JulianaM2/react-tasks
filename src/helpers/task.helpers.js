const getLatestState = (states) =>
  states.reduce(function (prev, current) {
    return prev && new Date(prev.date) > new Date(current.date)
      ? prev
      : current;
  });

const getDateFromFullDateTime = (date) => {
  const month = date.getUTCMonth() + 1; //months from 1-12
  const day = date.getUTCDate();
  const year = date.getUTCFullYear();

  return year + "-" + month + "-" + day;
};

const findTaskIndex = (tasks, taskToModify) =>
  tasks.findIndex((task) => task === taskToModify);

export { findTaskIndex, getLatestState, getDateFromFullDateTime };
