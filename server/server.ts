const express = require("express");
import { Server } from 'ws';
class Product {
    constructor(
        public id: number,
        public title: string,
        public price: number,
        public rating: number,
        public desc: string,
        public category: string[]
    ) {
    }
}
class Comment {
    constructor(
      public id: number,
      public productId: number,
      public rating: number,
      public user: string,
      public time: string,
      public content: string
    ) {
    }
}

let products: Product[] = [
    new Product(1, '第一个商品', 22.99, 3, '这是第一个商品，一个关于angular学习的商品', ['电子产品']),
    new Product(2, '第二个商品', 2.99, 5, '这是第二个商品，一个关于angular学习的商品', ['电子产品', '书籍']),
    new Product(3, '第三个商品', 12.99, 2.5, '这是第三个商品，一个关于angular学习的商品', ['电子产品']),
    new Product(4, '第四个商品', 1.99, 5.5, '这是第四个商品，一个关于angular学习的商品', ['电子产品', '数码产品']),
    new Product(5, '第五个商品', 23.99, 1.5, '这是第五个商品，一个关于angular学习的商品', ['电子产品']),
    new Product(6, '第六个商品', 55.99, 3.5, '这是第一个商品，一个关于angular学习的商品', ['电子产品'])
];
let comments: Comment[] = [
    new Comment(1,  1, 3, '小明', '2019-1-10', '这是一个好东西'),
    new Comment(2,  1, 2, '小花', '2018-11-10', '这东西很好'),
    new Comment(3,  1, 5, '小张', '2018-12-10', '这东西一般'),
    new Comment(4,  2, 1, '小李', '2019-1-1', '这真是一个好东西')
];
const app = express();

app.get('/', (req, res) => {
    res.send('Hello Express');
});
app.get('/api/products', (req, res) => {
    let params = req.query;
    let result = products;
    if (params.title) {
        result = result.filter(key =>  key.title.indexOf(params.title) != -1);
    }
    if (params.price && result.length) {
        result = result.filter(key =>  key.price <= parseInt(params.price));
    }
    if (params.category && result.length && params.category !== "-1") {
        result = result.filter(key =>  key.title.indexOf(params.category) != -1);
        console.log(result);
    }
    res.json(result);
});
app.get('/api/product/:id', (req, res) => {
    res.json(products.find(product => product.id == req.params['id']));
});
app.get('/api/product/:id/comments', (req, res) => {
    res.json(comments.filter(comment => comment.productId == req.params['id']));
});
const server = app.listen(8000, "localhost", () => {
    console.log("Server run in: http://localhost:8000");
});

let subscribtions = new Map<any, number[]>();

const wsServer = new Server({port: 8085});
wsServer.on('connection', ws => {
    ws.on("message", message => {
        let params = JSON.parse(<string>message);
        console.log(params);
        let productids = subscribtions.get(ws) || [];
        subscribtions.set(ws, [...productids, params.id]);
    });
});


let currentBits = new Map<number, number>();

setInterval(() => {
    products.forEach(p => {
        let currentBid = currentBits.get(p.id) || p.price;
        currentBid += Math.random() * 5;
        currentBits.set(p.id, currentBid);
    });
    subscribtions.forEach((productids: number[], ws) => {
        if (ws.readyState === 1) {
            let newBid = productids.map(pid => ({
                productId: pid,
                bid: currentBits.get(pid)
            }));
            console.log(newBid);
            ws.send(JSON.stringify(newBid));
        }
    });
}, 2000);