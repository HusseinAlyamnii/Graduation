import { dbModels as models } from "../Manager.js";

export const cvController = {
 getAllCVs: async (req, res) => {
    try {
      const allCv = await models.cv.find({});
      return res.send({ success: "All CV retrieved successfully", allCv });
    } catch (error) {
      console.error(error);
      return res.status(500).send({ error: "Internal Server Error" });
    }
  } 
}