import { Command } from ".";
import { SlashCommandBuilder, ChatInputCommandInteraction } from "discord.js";

const command: Command = {
  data: new SlashCommandBuilder()
    .setName("test")
    .setDescription("動作確認コマンド"),
  execute: async (Interaction: ChatInputCommandInteraction): Promise<void> => {
    await Interaction.reply({
      content: "んむ、心配せずとも聞こえておるわ🦊",
      ephemeral: true,
    });
  },
};

export default command;
