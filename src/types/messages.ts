/**
 * Interface representing a message.
 */
export interface IMessage {
  /** The role of the message sender. */
  role: 'user' | 'system';
  /** The content of the message. */
  content: string;
}
