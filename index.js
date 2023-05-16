const http = require('http');
const url = require('url');
const fs = require('fs');
const slug = require('slugify');
const replaceTemplate= require('./modules/replaceTemplate');
const { default: slugify } = require('slugify');
const data = fs.readFileSync(`${__dirname}/dev-data/data.json`,'utf8');
const dataobj = JSON.parse(data);
const tempcard = fs.readFileSync(`${__dirname}/templates/template-card.html`,'utf-8');
const tempoverview = fs.readFileSync(`${__dirname}/templates/template-overview.html`,'utf-8');
const tempproduct = fs.readFileSync(`${__dirname}/templates/template-product.html`,'utf-8');
const slugs = dataobj.map(el=> slugify(el.productName, {lower:true}));
// console.log(slugs)
const server = http.createServer((req,res)=>{
    const {query,pathname} = url.parse(req.url,true) ;
    if(pathname ==='/' || pathname === '/overview'){
        res.writeHead(200,{'Content-type': "text/html"});
        const cardHtml = dataobj.map(el => replaceTemplate(tempcard,el)).join('');
        const output = tempoverview.replace('{%PRODUCT_CARDS%}',cardHtml)
        res.end(output);
    }
    else if(pathname==='/product'){
        const product = dataobj[query.id];
        const output = replaceTemplate(tempproduct,product);
        res.end(output);
    }
    else{
        res.writeHead(404,{'Content-type': 'text/html'});
        res.end()

    }
})
server.listen(8000,'127.0.0.100',()=>{
    console.log('The Server Is listening 👌👌');
})