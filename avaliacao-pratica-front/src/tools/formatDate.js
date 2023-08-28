import dayjs from "dayjs";

export function formatDate (value) {
  return dayjs(value).format('DD/MM/YYYY HH:mm:ss')
}