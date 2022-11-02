import "dotenv/config";

const ENV_VALUE = {
  DISCORD_TOKEN: process.env.DISCORD_TOKEN || "",
  DISCORD_CLIENT_ID: process.env.DISCORD_CLIENT_ID || "",
  DISCORD_GUILD_ID: process.env.DISCORD_GUILD_ID || "",
  DISCORD_NEW_MEMBER_ADD_ROLE_ID:
    process.env.DISCORD_NEW_MEMBER_ADD_ROLE_ID || "",
  DISCORD_COMMAND_ALLOW_USER_IDS:
    process.env.DISCORD_COMMAND_ALLOW_USER_IDS?.split(",") || [],
  LOG_LEVEL: process.env.LOG_LEVEL || "error",
  DISCORD_NEW_MEMBER_PLZ_CHECK_URL: process.env.DISCORD_NEW_MEMBER_PLZ_CHECK_URL || "",
  DISCORD_NEW_MEMBER_NOTICE_CHANNEL_ID: process.env.DISCORD_NEW_MEMBER_NOTICE_CHANNEL_ID || "",
  EXAMPLE_VALUE: process.env.EXAMPLE_VALUE || "",
} as const;

export type ENV_KEY_TYPE = keyof typeof ENV_VALUE;
export type ENV_VALUE_TYPE = typeof ENV_VALUE[ENV_KEY_TYPE];
type KEYS = { [key in ENV_KEY_TYPE]: ENV_KEY_TYPE };

// 外部から扱いやすいようENV_VALUEのキーの一覧を抽出します。
const ENV_KEY = Object.keys(ENV_VALUE).reduce<KEYS>((object, key) => {
  object[key as ENV_KEY_TYPE] = key as ENV_KEY_TYPE;
  return object;
}, {} as KEYS);

// テストライブラリでmockingしやすいよう関数の戻り値で取得するようにします。
const environment = () => {
  const get: (key: ENV_KEY_TYPE) => ENV_VALUE_TYPE = (key: ENV_KEY_TYPE) =>
    ENV_VALUE[key] || "";
  const getString: (key: ENV_KEY_TYPE) => string = (key: ENV_KEY_TYPE) =>
    String(ENV_VALUE[key]) || "";

  return {
    get,
    getString,
  };
};

export default environment;
export { ENV_KEY };
