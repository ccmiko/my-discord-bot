import {
  Client,
  GatewayIntentBits,
  Events,
  GuildMember,
  TextChannel,
  EmbedBuilder,
} from "discord.js";
import environment, { ENV_KEY } from "@/utils/env";
import commands from "./commands";
import { getFormattedFullDate } from "@/utils/utilities";
import { logger } from '@/utils/logger';

const env = environment();
const intents = Object.values(GatewayIntentBits);
const client = new Client({ intents: intents as unknown as GatewayIntentBits });

client.on(Events.ClientReady, (item) => {
  logger.create();
  logger.info(`Logged in as ${client?.user?.tag}!`)
});

// コマンドに応答する汎用的なやつ
client.on(Events.InteractionCreate, async (interaction) => {
  logger.create();

  if (!interaction.isChatInputCommand()) return;
  if (
    !env
      .get(ENV_KEY.DISCORD_COMMAND_ALLOW_USER_IDS)
      .includes(interaction.user.id)
  ) {
    await interaction.reply({
      content: "**実行権限がないよ！**",
      ephemeral: true,
    });
    return;
  }

  const command = commands[interaction.commandName];

  if (!command) {
    logger.error(`No command matching ${interaction.commandName} was found.`);
    return;
  }

  try {
    await command.execute(interaction, logger);
  } catch (error) {
    logger.error(error);
    await interaction.reply({
      content: "There was an error while executing this command!",
      ephemeral: true,
    });
  }
});

// メンバー追加時
client.on(Events.GuildMemberAdd, async (member: GuildMember) => {
  const ohterChannel = member?.guild?.channels?.cache?.get(
    "1018600337571061850"
  );
  if (!ohterChannel) {
    return;
  }
  if (
    !env.get(ENV_KEY.DISCORD_COMMAND_ALLOW_USER_IDS).includes(member.user.id)
  ) {
    await (ohterChannel as TextChannel).send({
      content: "実行権限がないよ！",
    });
    return;
  }

  // ロール付与
  await member.roles.add(env.get(ENV_KEY.DISCORD_NEW_MEMBER_ADD_ROLE_ID));
  logger.info(
    `${getFormattedFullDate(member.guild.joinedAt)} - 新メンバー${member.user.tag
    }さんにロール付与しました。`
  );
  // const ohterChannel = member?.guild?.channels?.cache?.get(
  //   "1018600337571061850"
  // );
  // if (!ohterChannel) {
  //   return;
  // }
  // ユーザメンション
  // (ohterChannel as TextChannel).send(
  //   `<@${member.user.id}> に @everyone を付与したぞい`
  // );
  // ロールメンション
  // (ohterChannel as TextChannel).send(`@everyone`);
  // チャンネルリンク
  // (ohterChannel as TextChannel).send(
  //   `<#${"1019044683684515940"}> をチェックじゃぞ`
  // );

  // 組み合わせ
  // (ohterChannel as TextChannel).send(
  //   `<@${
  //     member.user.id
  //   }> がjoinしたの。初期ロールを付与したぞい。\n<#${"1019044683684515940"}> をチェックせよ`
  // );

  // const exampleEmbed = new EmbedBuilder()
  //   .setColor(0x0099ff)
  //   .setTitle("Some title")
  //   .setURL("https://discord.js.org/")
  //   .setAuthor({
  //     name: "Some name",
  //     iconURL: "https://i.imgur.com/AfFp7pu.png",
  //     url: "https://discord.js.org",
  //   })
  //   .setDescription("Some description here")
  //   .setThumbnail("https://i.imgur.com/AfFp7pu.png")
  //   .addFields(
  //     { name: "Regular field title", value: "Some value here" },
  //     { name: "\u200B", value: "\u200B" },
  //     { name: "Inline field title", value: "Some value here", inline: true },
  //     { name: "Inline field title", value: "Some value here", inline: true }
  //   )
  //   .addFields({
  //     name: "Inline field title",
  //     value: "Some value here",
  //     inline: true,
  //   })
  //   .setImage("https://i.imgur.com/AfFp7pu.png")
  //   .setTimestamp()
  //   .setFooter({
  //     text: "Some footer text here",
  //     iconURL: "https://i.imgur.com/AfFp7pu.png",
  //   });
  const message = `<@${member.user.id}> 、よく来たの〜。初期ロールを付与したぞい🦊`;
  const exampleEmbed = new EmbedBuilder()
    .setColor(0x0099ff)
    .setTitle("こちらも要チェックじゃ")
    .setURL(
      "https://discord.com/channels/761055235418357790/761055235418357794/1018594831569801368"
    );
  // .setAuthor({
  //   name: "のじゃろりアドミニストレータ",
  //   iconURL: "https://i.imgur.com/AfFp7pu.png",
  //   url: "https://discord.js.org",
  // })
  // .setDescription("このサーバの説明じゃぞ")
  // .setThumbnail("https://i.imgur.com/AfFp7pu.png")
  // .addFields(
  //   { name: "Regular field title", value: "Some value here" },
  //   { name: "\u200B", value: "\u200B" },
  //   { name: "Inline field title", value: "Some value here", inline: true },
  //   { name: "Inline field title", value: "Some value here", inline: true }
  // )
  // .addFields({
  //   name: "Inline field title",
  //   value: "Some value here",
  //   inline: true,
  // })
  // .setImage("https://i.imgur.com/AfFp7pu.png")
  // .setTimestamp()
  // .setFooter({
  //   text: "Some footer text here",
  //   iconURL: "https://i.imgur.com/AfFp7pu.png",
  // })

  (ohterChannel as TextChannel).send({
    content: message,
    embeds: [exampleEmbed],
  });
});

client.login(env.getString(ENV_KEY.DISCORD_TOKEN));
