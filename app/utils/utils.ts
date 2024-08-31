import { formatDistance } from "date-fns";

export const showCreatedTime = (createdTime: Date) => {
  return formatDistance((new Date(), createdTime), new Date(), {
    addSuffix: true,
  }).replace("about", "");
};

export function debounce(mainFunction: (args: string) => void, delay: number) {
  let timer: NodeJS.Timeout;
  return function (args: string) {
    clearTimeout(timer);
    timer = setTimeout(() => {
      mainFunction(args);
    }, delay);
  };
}
