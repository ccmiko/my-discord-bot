import {
  ModalSubmitInteraction,
  CacheType
} from "discord.js";
import sendMessageOtherChannel from "./sendMessageOtherChannel";
import { Logger } from '@/utils/logger';

type Modal = {
  modalId: string;
  execute: (interaction: ModalSubmitInteraction<CacheType>, logger: Logger) => Promise<void>;
};

type Modals = {
  [key: string]: Modal;
};

const modals: Modals = {
  [sendMessageOtherChannel.modalId]: sendMessageOtherChannel,
};
const modalList: Modal[] = [
  sendMessageOtherChannel
];

export default modals;
export { modalList };
export type { Modal, Modals };
