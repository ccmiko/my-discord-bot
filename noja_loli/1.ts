import { REST, Routes } from "discord.js";
import environment, { ENV_KEY } from "@/utils/env";

const env = environment();
const commands = [
  {
    name: "ping",
    description: "Replies with Pong!",
  },
];
const rest = new REST({ version: "10" }).setToken(
  env.getString(ENV_KEY.DISCORD_TOKEN)
);

// サーバにコマンドを登録する
(async () => {
  try {
    console.log("Started refreshing application (/) commands.");

    await rest.put(
      // 特定のサーバ（ギルド）に対する登録
      Routes.applicationGuildCommands(
        env.getString(ENV_KEY.DISCORD_CLIENT_ID),
        env.getString(ENV_KEY.DISCORD_GUILD_ID)
      ),
      // アプリに紐づくグローバルな登録
      // Routes.applicationCommands(env.get(ENV_KEY.DISCORD_CLIENT_ID)),
      { body: commands }
    );

    console.log("Successfully reloaded application (/) commands.");
  } catch (error) {
    console.error(error);
  }
})();
