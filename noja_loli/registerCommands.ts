import { REST, Routes } from "discord.js";
import { commandRegisterList } from "./commands";
import environment, { ENV_KEY } from "@/utils/env";
import { logger } from '@/utils/logger';

logger.create();
const env = environment();
const commands = commandRegisterList.map((item) => item.data.toJSON())
const rest = new REST({ version: "10" }).setToken(
  env.getString(ENV_KEY.DISCORD_TOKEN)
);

(async () => {
  try {
    logger.info(`コマンドの登録を開始します。`);
    logger.debug(JSON.stringify(commands));

    await rest.put(
      Routes.applicationGuildCommands(
        env.getString(ENV_KEY.DISCORD_CLIENT_ID),
        env.getString(ENV_KEY.DISCORD_GUILD_ID)
      ),
      {
        body: commands,
      }
    );

    logger.info(`正常に終了しました☆`);
  } catch (error) {
    logger.error(`失敗しました☆`);
    logger.error(error);
  }
})();
