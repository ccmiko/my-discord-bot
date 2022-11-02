import { Command } from ".";
import sendMessageOtherChannel from "../modals/sendMessageOtherChannel";
import {
  SlashCommandBuilder,
  ChatInputCommandInteraction,
  ModalBuilder,
  TextInputBuilder,
  TextInputStyle,
  ActionRowBuilder,
} from "discord.js";
import { canCommandExecuteUser } from "@/utils/utilities";

const command: Command = {
  data: new SlashCommandBuilder()
    .setName("send")
    .setDescription("他のチャンネルに任意のメッセージを送信します"),
  execute: async (interaction: ChatInputCommandInteraction): Promise<void> => {
    if (!canCommandExecuteUser(interaction.user.id)) {
      await interaction.reply({
        content: "*ん、まぁ、気が向いたらじゃな*",
        ephemeral: true,
      });
      return;
    }

    const modal = new ModalBuilder().setCustomId(sendMessageOtherChannel.modalId)
      .setTitle('🦊どこにメッセージを送って欲しいのじゃ？🦊');
    const channelInput = new TextInputBuilder()
      .setCustomId('channelInput')
      .setLabel("チャンネルIDを入力してくれ")
      .setStyle(TextInputStyle.Short)
      .setRequired(true);
    const messageInput = new TextInputBuilder()
      .setCustomId('messageInput')
      .setLabel("メッセージはどうする？")
      .setStyle(TextInputStyle.Paragraph)
      .setRequired(true);
    const row1 = new ActionRowBuilder().addComponents(channelInput);
    const row2 = new ActionRowBuilder().addComponents(messageInput);
    // TODO: ここの型定義を正す方法がわからない。。。 https://discordjs.guide/interactions/modals.html#building-and-responding-with-modals
    // @ts-ignore
    modal.addComponents(row1, row2);
    await interaction.showModal(modal);
  },
};

export default command;
