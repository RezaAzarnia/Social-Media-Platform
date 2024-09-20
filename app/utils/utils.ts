import { S3Client } from "@aws-sdk/client-s3";
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
export const client = new S3Client({
  region: "Iran",
  endpoint: process.env.LIARA_ENDPOINT || "",
  credentials: {
    accessKeyId: process.env.LIARA_ACCESS_KEY || "",
    secretAccessKey: process.env.LIARA_SECRET_KEY || "",
  },
});
