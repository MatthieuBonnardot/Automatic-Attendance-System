import nextConnect from "next-connect";
import middleware from "../../middleware/database";

const handler = nextConnect();
handler.use(middleware);

handler.post(async (req, res) => {
  console.log(req.body);
});

export default handler;