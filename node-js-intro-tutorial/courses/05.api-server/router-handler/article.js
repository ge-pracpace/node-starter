const path = require('path');
const db = require('../db');

// 新增文章
exports.addArticle = (req, res) => {
  // 文章信息
  const articleInfo = {
    ...req.body, // 标题、内容、状态、所属分类 id
    cover_img: path.join('/public/uploads', req.file.filename), // 文章封面存放路径
    pub_date: new Date(), // 发布时间
    author_id: req.user.id, // 作者 id
  };

  // 保存文章
  const sql = `insert into ev_articles set ?`;
  db.query(sql, articleInfo, (err, results) => {
    if (err) return res.cc(err);

    if (results.affectedRows !== 1) return res.cc('新增文章失败');

    res.cc('新增文章成功', 0);
  });
};

// 获取文章列表
exports.getArticles = (req, res) => {
  const sql = `select * from ev_articles where is_delete=0 order by id asc`;
  db.query(sql, (err, results) => {
    if (err) return res.cc(err);

    res.send({
      status: 0,
      message: '获取文章列表成功',
      data: results,
    });
  });
};
