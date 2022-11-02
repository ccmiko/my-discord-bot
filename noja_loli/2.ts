import { Client, GatewayIntentBits } from "discord.js";
import environment, { ENV_KEY } from "@/utils/env";

const env = environment();
const client = new Client({ intents: [GatewayIntentBits.Guilds] });

client.on("ready", () => {
  console.log(`Logged in as ${client?.user?.tag}!`);
});

// 別で登録したコマンドに応答する
client.on("interactionCreate", async (interaction) => {
  if (!interaction.isChatInputCommand()) return;
  if (
    !env
      .get(ENV_KEY.DISCORD_COMMAND_ALLOW_USER_IDS)
      .includes(interaction.user.id)
  ) {
    await interaction.reply("実行権限がないよ！");
    return;
  }

  if (interaction.commandName === "ping") {
    await interaction.reply("Pong!");
  }
});

client.login(env.getString(ENV_KEY.DISCORD_TOKEN));
