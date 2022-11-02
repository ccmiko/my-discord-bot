import {
  Client,
  GatewayIntentBits,
  Events,
  GuildMember,
} from "discord.js";
import environment, { ENV_KEY } from "@/utils/env";
import commands from "./commands";
import modals from "./modals";
import addMemberEvent from "./addMemberEvent";
import { logger } from '@/utils/logger';

const env = environment();
const intents = Object.values(GatewayIntentBits);
const client = new Client({ intents: intents as unknown as GatewayIntentBits });

// 起動時
client.on(Events.ClientReady, (item) => {
  logger.create();
  logger.info(`${client?.user?.tag}、"ろぐいん"したぞい！`)
});

// コマンドの受信時
client.on(Events.InteractionCreate, async (interaction) => {
  logger.create();

  if (interaction.isModalSubmit()) {
    // モーダルの応答
    logger.info(`受信したモーダルID: ${interaction.customId}`);

    try {
      const modal = modals[interaction.customId];
      if (!modal) {
        await interaction.reply({
          content: "*すまんな、儂の知らない言葉のようじゃ・・・*",
          ephemeral: true,
        });
        return;
      }
      logger.debug(JSON.stringify(modal));

      await modal.execute(interaction, logger);
    } catch (error) {
      logger.error(`失敗したようじゃ・・・`);
      logger.error(error);

      await interaction.reply({
        content: "*む・・・あー、・・・・まぁ、そういう日もあるじゃろ・・・？*",
        ephemeral: true,
      });
    }
  }

  if (interaction.isChatInputCommand()) {
    // コマンドの応答
    logger.info(`受信したコマンド: ${interaction.commandName}`);

    try {
      const command = commands[interaction.commandName];
      if (!command) {
        await interaction.reply({
          content: "*すまんな、儂の知らない言葉のようじゃ・・・*",
          ephemeral: true,
        });
        return;
      }
      logger.debug(JSON.stringify(command));

      await command.execute(interaction, logger);
    } catch (error) {
      logger.error(`失敗したようじゃ・・・`);
      logger.error(error);

      await interaction.reply({
        content: "*む〜〜、む、むむむむ？・・・これは失敗したかもしれぬ・・・*",
        ephemeral: true,
      });
    }
  };

});

// サーバーメンバー追加時
client.on(Events.GuildMemberAdd, async (member: GuildMember) => {
  logger.create();
  logger.info(`新しいメンバーがきたぞい！`)
  await addMemberEvent(member, logger)
});

client.login(env.getString(ENV_KEY.DISCORD_TOKEN));
