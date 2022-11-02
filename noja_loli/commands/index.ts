import { ChatInputCommandInteraction, SlashCommandBuilder } from "discord.js";
import test from "./test";
import sendMessageOtherChannel from "./sendMessageOtherChannel";
import { Logger } from '@/utils/logger';

type Command = {
  data: SlashCommandBuilder;
  execute: (interaction: ChatInputCommandInteraction, logger: Logger) => Promise<void>;
};

type Commands = {
  [key: string]: Command;
};

const commands: Commands = {
  [test.data.name]: test,
  [sendMessageOtherChannel.data.name]: sendMessageOtherChannel,
};
const commandRegisterList: Command[] = [
  test,
  sendMessageOtherChannel
];

export default commands;
export { commandRegisterList };
export type { Command, Commands };
