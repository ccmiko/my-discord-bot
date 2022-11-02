import { Modal } from ".";
import {
  ModalSubmitInteraction,
  CacheType,
  TextChannel
} from "discord.js";


const modal: Modal = {
  modalId: 'sendMessageModal',
  execute: async (interaction: ModalSubmitInteraction<CacheType>): Promise<void> => {
    const channelInput = interaction.fields.getTextInputValue('channelInput');
    const messageInput = interaction.fields.getTextInputValue('messageInput');
    const ohterChannel = interaction?.guild?.channels?.cache?.get(
      channelInput
    );
    (ohterChannel as TextChannel).send(messageInput);
    await interaction.reply({ content: 'おくったぞい！くふふ、わしえらいじゃろ？', ephemeral: true, });
  }
}

export default modal;
