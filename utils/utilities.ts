import environment, { ENV_KEY } from "@/utils/env";
const env = environment();

export function getFormattedFullDate(
  argDate: Date,
  padLength: number = 2
): string {
  const year = argDate.getFullYear();
  const month = argDate.getMonth() + 1;
  const date = argDate.getDate();
  const hour = argDate.getHours() + 1;
  const minute = argDate.getMinutes();
  const second = argDate.getSeconds();
  const formattedDate =
    String(year) +
    "-" +
    String(month).padStart(padLength, "0") +
    "-" +
    String(date).padStart(padLength, "0") +
    " " +
    String(hour).padStart(padLength, "0") +
    ":" +
    String(minute).padStart(padLength, "0") +
    ":" +
    String(second).padStart(padLength, "0");

  return formattedDate;
}

export function canCommandExecuteUser(id: string): boolean {
  if (env.get(ENV_KEY.DISCORD_COMMAND_ALLOW_USER_IDS).includes(id)) {
    return true
  } else {
    return false
  }
}
