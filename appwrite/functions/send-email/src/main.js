import { Client, Messaging, ID } from "node-appwrite";

export default async ({ req, res, error, log }) => {
  const client = new Client()
    .setEndpoint(process.env.PROJECT_ENDPOINT)
    .setProject(process.env.PROJECT_ID)
    .setKey(process.env.API_KEY);

  const messaging = new Messaging(client);


  // const {
  //   subject,
  //   content,
  //   topics = [],
  //   users = [],
  //   targets = [],
  //   cc = [],
  //   bcc = [],
  //   attachments = [],
  //   draft = false,
  //   html = false,
  //   scheduled_at = "",
  // } = JSON.parse(req.body);

  try {

  log(req.body);

    // const response = messaging.createEmail(
    //   ID.unique(),
    //   subject,
    //   content,
    //   topics,
    //   users,
    //   targets,
    //   cc,
    //   bcc,
    //   attachments,
    //   draft,
    //   html,
    //   scheduled_at
    // );

    // log(response);

    // if (response) return res.json({ success: true, data: response });
  } catch (err) {
    error(JSON.stringify(err, null, 2));

    return res.json(
      { success: false, error: JSON.stringify(error, null, 2) },
      { status: 400 }
    );
  }
};
