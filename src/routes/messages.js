const db_connection = require("../config/connection");
const routeVerify = require("../validate/verifytoken");

const messageRouter = require("express").Router();

messageRouter.get("/", routeVerify, (req, res) => {
  const user_id = req.userId._id;

  db_connection.getConnection(function (err, connection) {
    if (err) {
      connection.release();
    }
    connection.query(
      "select SUM(CASE WHEN isRead = 0 THEN 1 ELSE 0 END) AS unread_count, COUNT(*) AS total_count FROM messages WHERE user_id = ?",
      [user_id],
      (error, result) => {
        if (error){
            connection.release()
            return res.status(500).json({ error: "An error occured" });
        } 
        if (result.length === 0){
            connection.release();
            return res.status(200).json({ message: "You have no messages" });
        }     
        const { unread_count, total_count } = result[0];
        connection.release();
        return res
          .status(200)
          .json({ unreadMessages: unread_count, totalMessages: total_count });
      }
    );
  });
});

messageRouter.get("/all", routeVerify, (req, res) => {
  const user_id = req.userId._id;

  db_connection.getConnection(function (err, connection) {
    if (err) {
      connection.release();
    }
    connection.query(
      "select * FROM messages WHERE user_id = ?",
      [user_id],
      (error, result) => {
        if (error){
            connection.release()
            return res.status(500).json({ error: "An error occured" });
        } 
        if (result.length === 0) {
            connection.release(); 
            return res.status(200).json({ message: "You have no messages" })
        };
        connection.release();
        return res.status(200).send(result);
      }
    );
  });
});

messageRouter.get("/:messageId", routeVerify, (req, res) => {
  const message_id = req.params.messageId;
  const user_id = req.userId._id;

  db_connection.getConnection(function (err, connection) {
    if (err) {
      connection.release();
      return res
        .status(500)
        .json({ error: "An error occured while connecting to the database" });
    }
    connection.query(
      "select * from messages where id = ? and user_id = ?",
      [message_id, user_id],
      (error, result) => {
        
        if (error){
            connection.release()
            return res.status(500).json({ error: "An error occured" });
        } 
        return res.status(200).send(result);
      }
    );

    connection.query(
      "UPDATE messages SET isRead = 1 where id = ? and user_id = ?",
      [message_id, user_id]
    );
    connection.release();
  });
});
module.exports = messageRouter;
