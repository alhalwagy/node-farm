module.exports = (temp,product)=>{
    let Output = temp.replace(/{%IMAGE%}/g,product.image);
    Output = Output.replace(/{%PRODUCTNAME%}/g,product.productName);
    Output = Output.replace(/{%PRICE%}/g,product.price);
    Output = Output.replace(/{%NUTRIENTS%}/g,product.nutrients);
    Output = Output.replace(/{%FROM%}/g,product.from);
    Output = Output.replace(/{%DESCRIPTION%}/g,product.description);
    Output = Output.replace(/{%QUANTITY%}/g,product.quantity);
    Output = Output.replace(/{%ID%}/g,product.id);
    if(!product.organic) Output = Output.replace(/{%NOT_ORGANIC%}/g,'not-organic');  
    return Output; 
}