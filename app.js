var express=require('express')
var app=express();
var total_price=0;
var total_items=0;
var delivery_rate=40;

var x=[
                {
                    id:0,
                    name:"Margherita",
                    price:20,
                    incart:0,
                    total:0,
                    src:"/assets/p2.jpg"                    
                },
                {
                    id:1,
                    name:"Double-cheese-margherita",
                    price:35,
                    incart:0,
                    total:0,
                    src:"/assets/p3.jpg"
                },
                {
                    id:2,
                    name:"Farmhouse",
                    price:35,
                    incart:0,
                    total:0,
                    src:"/assets/p4.jpg"
                },
                {
                    id:3,
                    name:"Deluxe-veggie",
                    price:40,
                    incart:0,
                    total:0,
                    src:"/assets/p5.jpg"
                },
                {
                    id:4,
                    name:"Paneer-makhani",
                    price:45,
                    incart:0,
                    total:0,
                    src:"/assets/p6.jpg"
                },
                {
                    id:5,
                    name:"Chicken-margherita",
                    price:50,
                    incart:0,
                    total:0,
                    src:"/assets/p7.jpg"
                },
                {
                    id:6,
                    name:"Chicken-tikkapizza",
                    price:60,
                    incart:0,
                    total:0,
                    src:"/assets/p8.jpg"
                },
                {
                    id:7,
                    name:"Veg-kababpizza",
                    price:70,
                    incart:0,
                    total:0,
                    src:"/assets/p1.jpg"
                },
                
            ]

var myarray=[];
app.use('/assets',express.static('assets'))

app.get('/',(req,res)=>{
    res.render("home.ejs",{x:x,total_items:total_items})
})

app.get('/cart',(req,res)=>{
    res.render("cart.ejs",{x:x,total_price:total_price})
})


app.get('/add-to-cart/:id',(req,res)=>{
    x[req.params.id].incart++;
    total_items++;
    x[req.params.id].total+=x[req.params.id].price;
   total_price+= x[req.params.id].price;
   console.log(total_price);
    myarray.push(x[req.params.id]);
    // res.send();
});
app.get('/cartadd/:id',(req,res)=>{
    x[req.params.id].incart++;
    total_items++;
    x[req.params.id].total+=x[req.params.id].price;
   total_price+= x[req.params.id].price;
   console.log(total_price);
    myarray.push(x[req.params.id]);
    // res.redirect('/cart');
})

//removing from cart
app.get('/cartremove/:id',(req,res)=>{
    x[req.params.id].incart--;
    total_items--;
    x[req.params.id].total=x[req.params.id].total-x[req.params.id].price;
   total_price=total_price-x[req.params.id].price;
   console.log(total_price);
    myarray.push(x[req.params.id]);
    // res.redirect('/cart');
});

app.get('/checkout',(req,res)=>{
    res.render("checkout.ejs",{total_price:total_price,x:x,delivery_rate:delivery_rate,total:delivery_rate+total_price});
})
app.get('/checkout2',(req,res)=>{
    res.render("checkout2.ejs",{total_price:Math.round(total_price*0.91),x:x,delivery_rate:36,total:Math.round((delivery_rate+total_price)*0.91)});
})
app.get('/resetcart',(req,res)=>{
    for(var i=0;i<x.length;i++)
 {
        x[i].incart=0;
    x[i].total=0
}
 total_price=0;
 total_items=0;
    res.redirect('/');
})
app.listen(process.env.PORT||3000);