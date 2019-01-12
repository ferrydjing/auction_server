import * as express from "express";

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
let products: Product[] = [
    new Product(1, '第一个商品', 22.99, 3, '这是第一个商品，一个关于angular学习的商品', ['电子产品']),
    new Product(2, '第二个商品', 2.99, 5, '这是第二个商品，一个关于angular学习的商品', ['电子产品', '书籍']),
    new Product(3, '第三个商品', 12.99, 2.5, '这是第三个商品，一个关于angular学习的商品', ['电子产品']),
    new Product(4, '第四个商品', 1.99, 5.5, '这是第四个商品，一个关于angular学习的商品', ['电子产品', '数码产品']),
    new Product(5, '第五个商品', 23.99, 1.5, '这是第五个商品，一个关于angular学习的商品', ['电子产品']),
    new Product(6, '第六个商品', 55.99, 3.5, '这是第一个商品，一个关于angular学习的商品', ['电子产品'])
];
const app = express();

app.get('/', (req, res) => {
    res.send('Hello Express');
});
app.get('/products', (req, res) => {
    res.json(products);
});
app.get('/product/:id', (req, res) => {
    res.json(products.find(product => product.id == req.params['id']));
});
app.listen(8000);
const server = app.listen(8000, "localhost", () => {
    console.log("Server run in: http://localhost:8000");
});