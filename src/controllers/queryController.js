import {
  createQueryService,
  getAllQueriesService,
  getOneQueryService,
  deleteQueryService,
} from "../services/queryServices.js";
export class QueryController {
  // TODO Don't access database from this file you only needs
  async createQuery(req, res, next) {
    try {
      const data = {
        title: req.body.title,
        content: req.body.content,
        create_at: new Date(),
      };
      console.log(data);
      const query = await createQueryService(data);
      res.status(200).json({
        status: 200,
        message: "Query has been created successfully",
        data: query,
      });
    } catch (error) {
      console.log(error);
    }
  }
  async getAllQueries(req, res, next) {
    try {
      const queries = await getAllQueriesService();
      res.status(200).json({
        status: 200,
        message: "Query retrieved successfuly",
        data: queries,
      });
    } catch (error) {
      console.log(error);
    }
  }

  async getQuery(req, res, next) {
    try {
      const query = await getOneQueryService(req.params.id);
      res.status(200).json({
        status: 200,
        message: "requested query retrieved successfully",
        data: query,
      });
    } catch (error) {
      console.log(error);
    }
  }

  async deleteQuery(req, res, next) {
    try {
      const deleteQuery = await deleteQueryService(req.params.id);
      res.status(204).json({ message: "query deleted succesfully" });
    } catch {
      res.status(404);
      res.send({ error: "Query doesn't exist!" });
    }
  }
}
