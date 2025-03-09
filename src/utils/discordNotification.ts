interface DiscordWebhookMessage {
  content?: string;
  embeds?: Array<{
    title: string;
    description: string;
    color?: number;
    fields?: Array<{
      name: string;
      value: string;
      inline?: boolean;
    }>;
  }>;
}

export const sendDiscordNotification = async (
  webhookUrl: string,
  message: DiscordWebhookMessage
) => {
  try {
    const response = await fetch(webhookUrl, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(message),
    });

    if (!response.ok) throw new Error('Failed to send Discord notification');
    return true;
  } catch (error) {
    console.error('Discord notification error:', error);
    return false;
  }
};