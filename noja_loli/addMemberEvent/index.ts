import {
  GuildMember,
  TextChannel,
  EmbedBuilder,
} from "discord.js";
import environment, { ENV_KEY } from "@/utils/env";
import { Logger } from '@/utils/logger';

const env = environment();

export default async function (member: GuildMember, logger: Logger) {
  const ohterChannel = member?.guild?.channels?.cache?.get(
    env.getString(ENV_KEY.DISCORD_NEW_MEMBER_NOTICE_CHANNEL_ID)
  );
  if (!ohterChannel) {
    logger.error(
      `投稿先のチャンネルが存在しないぞい・・・ チャンネルID: ${env.getString(ENV_KEY.DISCORD_NEW_MEMBER_NOTICE_CHANNEL_ID)}`
    )
    return
  }

  await member.roles.add(env.get(ENV_KEY.DISCORD_NEW_MEMBER_ADD_ROLE_ID));
  logger.info(`${member.user.tag}さんにロール付与したぞい`);

  const message = `<@${member.user.id}> 、よく来たの〜。初期ロールを付与したぞ🦊`;

  const url = env.getString(ENV_KEY.DISCORD_NEW_MEMBER_PLZ_CHECK_URL)
  if (url) {
    const exampleEmbed = new EmbedBuilder()
      .setColor(0x0099ff)
      .setTitle("こちらも要チェックじゃ！")
      .setURL(url);
    (ohterChannel as TextChannel).send({
      content: message,
      embeds: [exampleEmbed],
    });
  } else {
    (ohterChannel as TextChannel).send({
      content: message,
    });
  }

}
