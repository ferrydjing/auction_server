"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var express = require("express");
var Product = /** @class */ (function () {
    function Product(id, title, price, rating, desc, category) {
        this.id = id;
        this.title = title;
        this.price = price;
        this.rating = rating;
        this.desc = desc;
        this.category = category;
    }
    return Product;
}());
var Comment = /** @class */ (function () {
    function Comment(id, productId, rating, user, time, content) {
        this.id = id;
        this.productId = productId;
        this.rating = rating;
        this.user = user;
        this.time = time;
        this.content = content;
    }
    return Comment;
}());
exports.Comment = Comment;
var products = [
    new Product(1, '第一个商品', 22.99, 3, '这是第一个商品，一个关于angular学习的商品', ['电子产品']),
    new Product(2, '第二个商品', 2.99, 5, '这是第二个商品，一个关于angular学习的商品', ['电子产品', '书籍']),
    new Product(3, '第三个商品', 12.99, 2.5, '这是第三个商品，一个关于angular学习的商品', ['电子产品']),
    new Product(4, '第四个商品', 1.99, 5.5, '这是第四个商品，一个关于angular学习的商品', ['电子产品', '数码产品']),
    new Product(5, '第五个商品', 23.99, 1.5, '这是第五个商品，一个关于angular学习的商品', ['电子产品']),
    new Product(6, '第六个商品', 55.99, 3.5, '这是第一个商品，一个关于angular学习的商品', ['电子产品'])
];
var comments = [
    new Comment(1, 1, 3, '小明', '2019-1-10', '这是一个好东西'),
    new Comment(2, 1, 2, '小花', '2018-11-10', '这东西很好'),
    new Comment(3, 1, 5, '小张', '2018-12-10', '这东西一般'),
    new Comment(4, 2, 1, '小李', '2019-1-1', '这真是一个好东西')
];
var app = express();
app.get('/', function (req, res) {
    res.send('Hello Express');
});
app.get('/api/products', function (req, res) {
    res.json(products);
});
app.get('/api/product/:id', function (req, res) {
    res.json(products.find(function (product) { return product.id == req.params['id']; }));
});
app.get('/api/product/:id/comments', function (req, res) {
    res.json(comments.filter(function (comment) { return comment.productId == req.params['id']; }));
});
app.listen(8000);
var server = app.listen(8000, "localhost", function () {
    console.log("Server run in: http://localhost:8000");
});
