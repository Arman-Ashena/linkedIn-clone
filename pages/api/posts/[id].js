import { ObjectId } from "mongodb";
import { connectToDatabase } from "../../../util/mongodb";

export default async function handler(req, res) {
  const {
    method,
    query: { id },
  } = req;
  const { db } = await connectToDatabase();
  if (method === "DELETE") {
    try {
      await db.collection("posts").deleteOne({ _id: new ObjectId(id) });
      res.status(200).json({ message: "The Post has been deleted" });
    } catch (error) {
      res.status(500).json(error);
    }
  }
}
