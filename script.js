const products = [
  {id:1,name:"Nova X Pro Smartphone",cat:"Phones",price:899,old:999,emoji:"📱",rating:"4.9",badge:"BEST SELLER"},
  {id:2,name:"AeroBook Pro 14",cat:"Laptops",price:1299,old:1499,emoji:"💻",rating:"4.8",badge:"NEW"},
  {id:3,name:"Sonic Max Headphones",cat:"Audio",price:249,old:299,emoji:"🎧",rating:"4.9",badge:"20% OFF"},
  {id:4,name:"Vision Ultra Watch",cat:"Accessories",price:199,old:229,emoji:"⌚",rating:"4.7",badge:"POPULAR"},
  {id:5,name:"PixelCam Pocket",cat:"Accessories",price:329,old:379,emoji:"📷",rating:"4.8",badge:"NEW"},
  {id:6,name:"Thunder Gaming Console",cat:"Gaming",price:549,old:599,emoji:"🎮",rating:"4.9",badge:"HOT"},
  {id:7,name:"BassPod Pro Earbuds",cat:"Audio",price:119,old:149,emoji:"🎵",rating:"4.8",badge:"SALE"},
  {id:8,name:"UltraSlim Creator Laptop",cat:"Laptops",price:1599,old:1799,emoji:"🖥️",rating:"4.9",badge:"PRO"}
];
let cart=[]; let activeFilter="All";

const productsEl=document.getElementById("products");
function money(n){return "$"+n.toFixed(2)}
function renderProducts(){
  const list=activeFilter==="All"?products:products.filter(p=>p.cat===activeFilter);
  productsEl.innerHTML=list.map(p=>`
    <article class="product">
      <span class="badge">${p.badge}</span>
      <div class="product-img">${p.emoji}</div>
      <div class="product-info">
        <h3>${p.name}</h3>
        <div class="rating">★ ${p.rating} · ${p.cat}</div>
        <div class="price">${money(p.price)} <span class="old">${money(p.old)}</span></div>
        <button class="add" onclick="addToCart(${p.id})">Add to cart</button>
      </div>
    </article>`).join("");
}
function addToCart(id){const p=products.find(x=>x.id===id);const item=cart.find(x=>x.id===id);item?item.qty++:cart.push({...p,qty:1});renderCart();openCart()}
function renderCart(){
  document.getElementById("cartCount").textContent=cart.reduce((s,x)=>s+x.qty,0);
  document.getElementById("cartItems").innerHTML=cart.length?cart.map(x=>`
    <div class="cart-item"><div class="emoji">${x.emoji}</div><div><h4>${x.name}</h4><small>${x.qty} × ${money(x.price)}</small></div></div>`).join(""):"<p style='color:#777;margin-top:30px'>Your cart is empty.</p>";
  document.getElementById("cartTotal").textContent=money(cart.reduce((s,x)=>s+x.price*x.qty,0));
}
function openCart(){document.getElementById("cartDrawer").classList.add("open");document.getElementById("overlay").classList.add("show")}
function closeCart(){document.getElementById("cartDrawer").classList.remove("open");document.getElementById("overlay").classList.remove("show")}
document.getElementById("cartBtn").onclick=openCart;document.getElementById("closeCart").onclick=closeCart;document.getElementById("overlay").onclick=closeCart;
document.getElementById("searchBtn").onclick=()=>document.getElementById("searchPanel").classList.toggle("show");
document.getElementById("searchInput").addEventListener("input",e=>{const q=e.target.value.toLowerCase();document.querySelectorAll(".product").forEach((el,i)=>el.style.display=products[i]?.name.toLowerCase().includes(q)?"":"none")});
document.querySelectorAll(".filter").forEach(btn=>btn.onclick=()=>{document.querySelectorAll(".filter").forEach(x=>x.classList.remove("active"));btn.classList.add("active");activeFilter=btn.dataset.filter;renderProducts()});
document.querySelectorAll(".category").forEach(btn=>btn.onclick=()=>{activeFilter=btn.dataset.category==="Phones"||btn.dataset.category==="Laptops"||btn.dataset.category==="Audio"?btn.dataset.category:"All";document.querySelectorAll(".filter").forEach(x=>x.classList.toggle("active",x.dataset.filter===activeFilter));renderProducts();document.getElementById("shop").scrollIntoView({behavior:"smooth"})});
document.getElementById("newsletterForm").onsubmit=e=>{e.preventDefault();alert("Thanks! You're subscribed to ElectroHub.");e.target.reset()};
document.getElementById("checkoutBtn").onclick=()=>alert(cart.length?"Demo checkout: connect Stripe/PayPal here.":"Your cart is empty.");

let remaining=8*3600+42*60+18;
setInterval(()=>{remaining--;if(remaining<0)remaining=8*3600+42*60+18;const h=Math.floor(remaining/3600),m=Math.floor((remaining%3600)/60),s=remaining%60;document.getElementById("hours").textContent=String(h).padStart(2,"0");document.getElementById("mins").textContent=String(m).padStart(2,"0");document.getElementById("secs").textContent=String(s).padStart(2,"0")},1000);
renderProducts();renderCart();