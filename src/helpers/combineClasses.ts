const combineClasses = (classNames: (string | undefined)[]) => {
  if (!classNames || classNames.length === 0) return;

  const result: string[] = [];
  classNames.forEach((className: string | undefined) => {
    if (typeof className === "undefined" || className === "") return;
    result.push(className);
  });

  return result.join(" ");
};

export default combineClasses;
