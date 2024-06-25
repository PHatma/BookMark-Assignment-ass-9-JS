var webname = document.getElementById("webname");
var url = document.getElementById("url");

var productList = [];
if (localStorage.getItem("box") !== null) {
  productList = JSON.parse(localStorage.getItem("box"));
  display();
}
function addProduct() {
  if ((validationName() && validationURL()) == true) {
    var Product = {
      name: webname.value,
      url: url.value,
    };
    productList.push(Product);
    localStorage.setItem("box", JSON.stringify(productList));
    display();
    clear();
    console.log(productList);
  }
}
function clear() {
  webname.value = null;
  url.value = null;
  webname.classList.remove('is-valid');
  url.classList.remove('is-valid');
}
function redirect(i) {
  var targetURL = productList[i].url;
  window.location.href = targetURL;
  console.log(targetURL);
}

function display() {
  var cartona = " ";
  for (var i = 0; i < productList.length; i++) {
    cartona += `
  <tr>
            <td>${i + 1}</td>
            <td>${productList[i].name}</td>
           
           

            <td>
            
              <button onclick=" redirect(${i})" class="btn btn-outline-warning btn-sm"><span><i class="fa-solid fa-eye"></i></span>
              Visit</button>
            </td>
            <td>

              <button onclick=" del(${i})" class="btn btn-outline-danger btn-sm"><span><i class="fa-solid fa-trash-can"></i></span>Delete</button>

            </td>
          
          </tr>`;
  }

  document.getElementById("bdy").innerHTML = cartona;
}

function del(indexItem) {
  productList.splice(indexItem, 1);
  localStorage.setItem("box", JSON.stringify(productList));
  display();
  console.log(productList);
}



function validationName() {
  var nameRegex = /^\w{3,}(\s+\w+)*$/;
  var text = webname.value;
  if (nameRegex.test(text) == true) {
    webname.classList.add("is-valid");
    webname.classList.remove("is-invalid");

    return true;
  } else {
    webname.classList.add("is-invalid");
    webname.classList.remove("is-valid");

    return false;
  }
}
function validationURL() {
  var urlRegex = /^(https?:\/\/)?(w{3}\.)?\w+\.\w{2,}\/?(:\d{2,5})?(\/\w+)*$/;
  var httpsRegex = /^https?:\/\//g;
  var link = url.value;
  if ((urlRegex.test(link) || httpsRegex.test(link)) == true) {
    url.classList.add("is-valid");
    url.classList.remove("is-invalid");

    return true;
  } else {
    url.classList.add("is-invalid");
    url.classList.remove("is-valid");

    return false;
  }
}
