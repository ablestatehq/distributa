import { Client, Messaging, ID } from 'node-appwrite';

export default async ({ req, res, error, log }) => {
  const client = new Client()
    .setEndpoint(process.env.APPWRITE_FUNCTION_API_ENDPOINT)
    .setProject(process.env.APPWRITE_FUNCTION_PROJECT_ID)
    .setKey(process.env.APPWRITE_FUNCTION_API_KEY);

  const messaging = new Messaging(client);

  try {
    const body = JSON.parse(req.body);
    const {
      subject,
      content,
      topics = [],
      users = [],
      targets = [],
      cc = [],
      bcc = [],
      attachments = [],
      draft = false,
      html = false,
      scheduled_at = '',
    } = body;

    const emailArgs = [
      ID.unique(),
      subject,
      content,
      topics,
      users,
      targets,
      cc,
      bcc,
      attachments,
      draft,
      html,
    ];

    if (scheduled_at) {
      const scheduledDate = new Date(scheduled_at);

      if (isNaN(scheduledDate.getTime())) {
        throw new Error('Invalid schedule date format.');
      }
      emailArgs.push(scheduled_at);
    }

    const response = await messaging.createEmail(...emailArgs);

    log(JSON.stringify(response));

    return res.json({ success: true, data: response });
  } catch (err) {
    error(JSON.stringify(err, null, 2));

    return res.json(
      { success: false, error: JSON.stringify(error, null, 2) },
      { status: 400 }
    );
  }
};
