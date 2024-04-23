const Blog = require('../models/blogs');

function blogIndex(req, rsp) {
    const id = req.params.id;
    Blog.findById(id)
        .then((result) => {
            rsp.render('blogs/detailed_blog', {blog: result, title: 'Blog Details'})
        })
        .catch((err) => {console.log(err)});
}

function blogDelete(req, rsp) {
    const doc_id = req.params.id;

    Blog.findByIdAndDelete(doc_id)
    .then((result) => {
        // This part doesn't really work. Will figure it out some day
        const rsp_data = rsp.json({go_to_page: '/blogs'});
        // console.log(console.dir(rsp_data))
        return rsp_data;
    })
    .catch((err) => {
        console.log(err);
        rsp.status(404).render('404', {title: 'Blog not found'})
    })
}

function blogCreateGet(req, rsp) {
    rsp.render('blogs/create_blog')
}

function blogCreatePost(req, rsp) {
    console.log(req.body);
    const new_blog = new Blog(req.body);
    new_blog.save()
        .then((result) => {
            rsp.redirect('/blogs');
        })
        .catch((err) => {console.log(err)});
}

function blogGetAll(req, rsp) {
    Blog.find().sort({createdAt:-1})
        .then((result) => {
            rsp.render('blogs/list_all_blogs', {title: 'All Blogs',
            blogs: result});    
        })
        .catch((err) => {console.log(err)})
}

module.exports = {
    blogIndex,
    blogDelete,
    blogCreatePost,
    blogCreateGet,
    blogGetAll,
}