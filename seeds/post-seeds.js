const { Post } = require('../models');

const postData = [
    {
        post_title: 'title1',
        blog_post: 'post1',
    },
    {
        post_title: 'title2',
        blog_post: 'post2',
    },
    {
        post_title: 'title3',
        blog_post: 'post3',
    },
    {
        post_title: 'title4',
        blog_post: 'post4',
    },
];

const seedPosts = () => Post.bulkCreate(postData);

module.exports = seedPosts;