const models = require("../../models/index");
const User = models.user;
const Movie = models.movie;
const Comment = models.comment;
const Sequelize = models.sequelize;

module.exports.showUsers = async (req, res) => {
  const commentList = await Comment.findAll({
    attributes: ["id", "content", "violate", "create_at", "update_at"],
    include: [
      {
        model: User,
        attributes: ["user_name"],
      },
      {
        model: Movie,
        attributes: ["title"],
      },
    ],
    raw: true,
  });

  //   commentList.forEach((cmt) => {
  //     console.log(cmt);
  //     console.log(cmt.violate);
  //   });
  res.render("management/manage_comment", {
    title: "Manage Comments",
    commentList,
  });
};
