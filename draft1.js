<!DOCTYPE html>
{% load static %}
<html lang="en">
    <head>
        <meta charset="utf-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1, shrink-to-fit=no" />
        <meta name="description" content="" />
        <meta name="author" content="" />
        <title>Product Details</title>
        <!-- Favicon-->
        <link rel="icon" type="image/x-icon" href="{% static 'assets/favicon.ico' %}" />
        <!-- Bootstrap icons-->
        <link href="https://cdn.jsdelivr.net/npm/bootstrap-icons@1.5.0/font/bootstrap-icons.css" rel="stylesheet" />
        <!-- Core theme CSS (includes Bootstrap)-->
        <link href="{% static 'css/styles.css' %}" rel="stylesheet" />
        <style>
          body {
            font-family: Arial, Helvetica, sans-serif;
          }
    
          /* Full-width input fields */
          input[type="text"],
          input[type="password"] {
            width: 100%;
            padding: 12px 20px;
            margin: 8px 0;
            display: inline-block;
            border: 1px solid #ccc;
            box-sizing: border-box;
          }
          /* CSS */
          .button-19 {
            appearance: button;
            background-color: #1899d6;
            border: solid transparent;
            border-radius: 16px;
            border-width: 0 0 4px;
            box-sizing: border-box;
            color: #ffffff;
            cursor: pointer;
            display: inline-block;
            font-family: din-round, sans-serif;
            font-size: 15px;
            font-weight: 700;
            letter-spacing: 0.8px;
            line-height: 20px;
            margin: 0;
            outline: none;
            overflow: visible;
            padding: 13px 16px;
            text-align: center;
            text-transform: uppercase;
            touch-action: manipulation;
            transform: translateZ(0);
            transition: filter 0.2s;
            user-select: none;
            -webkit-user-select: none;
            vertical-align: middle;
            white-space: nowrap;
            width: 100%;
          }
    
          .button-19:after {
            background-clip: padding-box;
            background-color: #1cb0f6;
            border: solid transparent;
            border-radius: 16px;
            border-width: 0 0 4px;
            bottom: -4px;
            content: "";
            left: 0;
            position: absolute;
            right: 0;
            top: 0;
            z-index: -1;
          }
    
          .button-19:main,
          .button-19:focus {
            user-select: auto;
          }
    
          .button-19:hover:not(:disabled) {
            filter: brightness(1.1);
            -webkit-filter: brightness(1.1);
          }
    
          .button-19:disabled {
            cursor: auto;
          }
    
          .button-19:active {
            border-width: 4px 0 0;
            background: none;
          }
    
          /* Set a style for all buttons */
          .button-20 {
            appearance: button;
            background-color: #cc0052;
            border: solid transparent;
            border-radius: 16px;
            border-width: 0 0 4px;
            box-sizing: border-box;
            color: #ffffff;
            cursor: pointer;
            display: inline-block;
            font-family: din-round, sans-serif;
            font-size: 15px;
            font-weight: 700;
            letter-spacing: 0.8px;
            line-height: 20px;
            margin: 0;
            outline: none;
            overflow: visible;
            padding: 13px 16px;
            text-align: center;
            text-transform: uppercase;
            touch-action: manipulation;
            transform: translateZ(0);
            transition: filter 0.2s;
            user-select: none;
            -webkit-user-select: none;
            vertical-align: middle;
            white-space: nowrap;
            width: 100%;
          }
    
          .button-20:after {
            background-clip: padding-box;
            background-color: #ff0066;
            border: solid transparent;
            border-radius: 16px;
            border-width: 0 0 4px;
            bottom: -4px;
            content: "";
            left: 0;
            position: absolute;
            right: 0;
            top: 0;
            z-index: -1;
          }
    
          .button-20:main,
          .button-20:focus {
            user-select: auto;
          }
    
          .button-20:hover:not(:disabled) {
            filter: brightness(1.1);
            -webkit-filter: brightness(1.1);
          }
    
          .button-20:disabled {
            cursor: auto;
          }
    
          .button-20:active {
            border-width: 4px 0 0;
            background: none;
          }

    
          button:hover {
            opacity: 0.8;
          }
    
          .button1 {
            box-shadow: 0 8px 16px 0 rgba(0, 0, 0, 0.2),
              0 6px 20px 0 rgba(0, 0, 0, 0.19);
          }
    
          /* Extra styles for the cancel button */
          .cancelbtn {
            width: auto;
            padding: 10px 18px;
            background-color: #f44336;
          }
    
          /* Center the image and position the close button */
          .imgcontainer {
            text-align: center;
            margin: 24px 0 12px 0;
            position: relative;
          }
    
          img.avatar {
            width: 40%;
            border-radius: 50%;
          }
    
          .container {
            padding: 16px;
          }
    
          span.psw {
            float: right;
            padding-top: 16px;
          }
    
          /* The Modal (background) */
          .modal {
            display: none; /* Hidden by default */
            position: fixed; /* Stay in place */
            z-index: 1; /* Sit on top */
            left: 0;
            top: 0;
            width: 100%; /* Full width */
            height: 100%; /* Full height */
            overflow: auto; /* Enable scroll if needed */
            background-color: rgb(0, 0, 0); /* Fallback color */
            background-color: rgba(0, 0, 0, 0.4); /* Black w/ opacity */
            padding-top: 60px;
          }
    
          /* Modal Content/Box */
          .modal-content {
            background-color: #fefefe;
            margin: 5% auto 15% auto; /* 5% from the top, 15% from the bottom and centered */
            border: 1px solid #888;
            width: 80%; /* Could be more or less, depending on screen size */
          }
    
          /* The Close Button (x) */
          .close {
            position: absolute;
            right: 25px;
            top: 0;
            color: #000;
            font-size: 35px;
            font-weight: bold;
          }
    
          .close:hover,
          .close:focus {
            color: red;
            cursor: pointer;
          }
    
          /* Add Zoom Animation */
          .animate {
            -webkit-animation: animatezoom 0.6s;
            animation: animatezoom 0.6s;
          }
    
          @-webkit-keyframes animatezoom {
            from {
              -webkit-transform: scale(0);
            }
            to {
              -webkit-transform: scale(1);
            }
          }
    
          @keyframes animatezoom {
            from {
              transform: scale(0);
            }
            to {
              transform: scale(1);
            }
          }
    
          /* Change styles for span and cancel button on extra small screens */
          @media screen and (max-width: 300px) {
            span.psw {
              display: block;
              float: none;
            }
            .cancelbtn {
              width: 100%;
            }
          }
        </style>
        <script>
          const AUTH_SERVICE_URL = "{{ auth_service }}";
          const PRODUCTS_SERVICE_URL = "{{ products_service }}";
          const CART_SERVICE_URL = "{{ cart_service }}";
        </script>

        
        
    </head>
    
    <body>
        <!-- Navigation-->
        <nav class="navbar navbar-expand-lg navbar-light bg-light">
            <div class="container px-4 px-lg-5">
                <a class="navbar-brand" href="/">My Shop</a>
                <button class="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation"><span class="navbar-toggler-icon"></span></button>
                <div class="collapse navbar-collapse" id="navbarSupportedContent">
                    <ul class="navbar-nav me-auto mb-2 mb-lg-0 ms-lg-4">
                        <li class="nav-item"><a class="nav-link active" aria-current="page" href="#!">Home</a></li>
                        <li class="nav-item"><a class="nav-link" href="/orders">Orders</a></li>
                        <li class="nav-item dropdown">
                            <a class="nav-link dropdown-toggle" id="navbarDropdown" href="#" role="button" data-bs-toggle="dropdown" aria-expanded="false">Shop</a>
                            <ul class="dropdown-menu" aria-labelledby="navbarDropdown">
                                <li><a class="dropdown-item" href="#!">All Products</a></li>
                                <li><hr class="dropdown-divider" /></li>
                                <li><a class="dropdown-item" href="#!">Popular Items</a></li>
                                <li><a class="dropdown-item" href="#!">New Arrivals</a></li>
                            </ul>
                        </li>
                    </ul>
                    <div class="d-flex">
                      <button class="btn btn-outline-dark" onclick="document.getElementById('signupmodal').style.display='block'" id="signupbtn">
                        <i class="bi-person-plus-fill me-1"></i>
                        SignUp
                      </button>
                      <button class="btn btn-outline-dark" type="submit" id="cartbtn" onclick="location.href='/cart/'">
                        <i class="bi-cart-fill me-1"></i>
                        Cart
                        <span class="badge bg-dark text-white ms-1 rounded-pill" id="total-items"></span>
                      </button>
                        &nbsp; 
                        <div id="login-form">
                          
                          <button
                            onclick="document.getElementById('id01').style.display='block'"
                            class="btn btn-outline-dark"
                          >
                            <i class="bi-person-fill me-1"></i>Login
                          </button>
                        </div>
                      </div>
                      <div class="d-flex" id="logout" >
                        <button class="btn btn-outline-dark" id="logoutBtn">
                          <i class="bi-person-fill me-1"></i>Logout
                        </button>
                      </div>
                      <div id="response"></div> 

                      <div id="id01" class="modal">
                        <form
                          class="modal-content animate"
                          action="/action_page.php"
                          method="post"
                          id="loginForm"
                        >
                          <div class="imgcontainer">
                            <span
                              onclick="document.getElementById('id01').style.display='none'"
                              class="close"
                              title="Close Modal"
                              >&times;</span>
                          </div>
                          <div class="container">
                            <label for="uname"><b>Username</b></label>
                            <input
                              type="text"
                              placeholder="Enter Username"
                              name="username"
                              id="username"
                              required
                            />
            
                            <label for="psw"><b>Password</b></label>
                            <input
                              type="password"
                              placeholder="Enter Password"
                              name="password"
                              id="password"
                              required
                            />
                            <button class="button-19" role="button" type="submit">
                              Login
                            </button>
                            &nbsp; 
                            <button
                              class="button-20"
                              onclick="document.getElementById('id01').style.display='none'"
                            >
                              Cancel
                            </button>
                          </div>
                        </form>
                      </div>
                      <div id="signupmodal" class="modal">
                        <form
                          class="modal-content animate"
                          action="/"
                          method="post"
                          id="signupForm"
                        >
                          <div class="imgcontainer">
                            <span
                              onclick="document.getElementById('signupmodal').style.display='none'"
                              class="close"
                              title="Close Modal"
                              >&times;</span>
                          </div>
                          <div class="container">
                            <label for="name"><b>First Name</b></label>
                            <input
                              type="text"
                              placeholder="Enter First Name"
                              name="firstname"
                              id="firstname"
                              required
                            />
                            <label for="lastname"><b>Last Name</b></label>
                            <input
                              type="text"
                              placeholder="Enter Last Name"
                              name="lastname"
                              id="lastname"
                              required
                            />
            
                            <label for="username1"><b>Username</b></label>
                            <input
                              type="text"
                              placeholder="Enter Username"
                              name="username1"
                              id="username1"
                              required
                            />
            
                            <label for="password1"><b>Password</b></label>
                            <input
                              type="password"
                              placeholder="Enter Password"
                              name="password1"
                              id="password1"
                              required
                            />
                            <button class="button-19" role="button" type="submit">
                              Create Account
                            </button>
                            &nbsp; 
                            <button
                              class="button-20"
                              onclick="document.getElementById('signupmodal').style.display='none'"
                            >
                              Cancel
                            </button>
                          </div>
                        </form>
                      </div>
                      <!-- Add an element to display login status -->
                        <div id="login-status" class="mb-3"></div>

                     

{% comment %}                     <form class="d-flex">
                        <button class="btn btn-outline-dark" type="submit">
                            <i class="bi-cart-fill me-1"></i>
                            Cart
                            <span class="badge bg-dark text-white ms-1 rounded-pill">0</span>
                        </button>
                    </form> {% endcomment %}
                </div>
            </div>
        </nav>
        <!-- Product section-->
        <section class="py-5">
            <div class="container px-4 px-lg-5 my-5" id="product-container">

            </div>
        </section>
        <!-- Related items section-->
        <section class="py-5 bg-light">
            <div class="container px-4 px-lg-5 mt-5">
                <h2 class="fw-bolder mb-4">Related products</h2>
                <div class="row gx-4 gx-lg-5 row-cols-2 row-cols-md-3 row-cols-xl-4 justify-content-center">
                    <div class="col mb-5">
                        <div class="card h-100">
                            <!-- Product image-->
                            <img class="card-img-top" src="https://dummyimage.com/450x300/dee2e6/6c757d.jpg" alt="..." />
                            <!-- Product details-->
                            <div class="card-body p-4">
                                <div class="text-center">
                                    <!-- Product name-->
                                    <h5 class="fw-bolder">Fancy Product</h5>
                                    <!-- Product price-->
                                    $40.00 - $80.00
                                </div>
                            </div>
                            <!-- Product actions-->
                            <div class="card-footer p-4 pt-0 border-top-0 bg-transparent">
                                <div class="text-center"><a class="btn btn-outline-dark mt-auto" href="#">View options</a></div>
                            </div>
                        </div>
                    </div>
                    <div class="col mb-5">
                        <div class="card h-100">
                            <!-- Sale badge-->
                            <div class="badge bg-dark text-white position-absolute" style="top: 0.5rem; right: 0.5rem">Sale</div>
                            <!-- Product image-->
                            <img class="card-img-top" src="https://dummyimage.com/450x300/dee2e6/6c757d.jpg" alt="..." />
                            <!-- Product details-->
                            <div class="card-body p-4">
                                <div class="text-center">
                                    <!-- Product name-->
                                    <h5 class="fw-bolder">Special Item</h5>
                                    <!-- Product reviews-->
                                    <div class="d-flex justify-content-center small text-warning mb-2">
                                        <div class="bi-star-fill"></div>
                                        <div class="bi-star-fill"></div>
                                        <div class="bi-star-fill"></div>
                                        <div class="bi-star-fill"></div>
                                        <div class="bi-star-fill"></div>
                                    </div>
                                    <!-- Product price-->
                                    <span class="text-muted text-decoration-line-through">$20.00</span>
                                    $18.00
                                </div>
                            </div>
                            <!-- Product actions-->
                            <div class="card-footer p-4 pt-0 border-top-0 bg-transparent">
                                <div class="text-center"><a  class="btn btn-outline-dark mt-auto">Add to cart</a></div>
                            </div>
                        </div>
                    </div>
                    <div class="col mb-5">
                        <div class="card h-100">
                            <!-- Sale badge-->
                            <div class="badge bg-dark text-white position-absolute" style="top: 0.5rem; right: 0.5rem">Sale</div>
                            <!-- Product image-->
                            <img class="card-img-top" src="https://dummyimage.com/450x300/dee2e6/6c757d.jpg" alt="..." />
                            <!-- Product details-->
                            <div class="card-body p-4">
                                <div class="text-center">
                                    <!-- Product name-->
                                    <h5 class="fw-bolder">Sale Item</h5>
                                    <!-- Product price-->
                                    <span class="text-muted text-decoration-line-through">$50.00</span>
                                    $25.00
                                </div>
                            </div>
                            <!-- Product actions-->
                            <div class="card-footer p-4 pt-0 border-top-0 bg-transparent">
                                <div class="text-center"><a class="btn btn-outline-dark mt-auto" href="#">Add to cart</a></div>
                            </div>
                        </div>
                    </div>
                    <div class="col mb-5">
                        <div class="card h-100">
                            <!-- Product image-->
                            <img class="card-img-top" src="https://dummyimage.com/450x300/dee2e6/6c757d.jpg" alt="..." />
                            <!-- Product details-->
                            <div class="card-body p-4">
                                <div class="text-center">
                                    <!-- Product name-->
                                    <h5 class="fw-bolder">Popular Item</h5>
                                    <!-- Product reviews-->
                                    <div class="d-flex justify-content-center small text-warning mb-2">
                                        <div class="bi-star-fill"></div>
                                        <div class="bi-star-fill"></div>
                                        <div class="bi-star-fill"></div>
                                        <div class="bi-star-fill"></div>
                                        <div class="bi-star-fill"></div>
                                    </div>
                                    <!-- Product price-->
                                    $40.00
                                </div>
                            </div>
                            <!-- Product actions-->
                            <div class="card-footer p-4 pt-0 border-top-0 bg-transparent">
                                <div class="text-center"><a class="btn btn-outline-dark mt-auto" href="#">Add to cart</a></div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </section>

    
{% comment %}     <script>
        function getSlugFromUrl() {
            const urlPath = window.location.pathname;
            const pathSegments = urlPath.split('/');
            return pathSegments[pathSegments.length - 2];
        }

        async function fetchProduct() {
            const slug = getSlugFromUrl();
            if (!slug) {
                console.error('No slug parameter found in URL');
                return;
            }
            
            try {
                const response = await fetch(`http://20.199.21.250:8002/item/${slug}/`);
                if (!response.ok) {
                    throw new Error('Network response was not ok');
                }
                const product = await response.json();
                displayProduct(product);
            } catch (error) {
                console.error('There was a problem with the fetch operation:', error);
            }
        }

        function displayProduct(product) {
            const productContainer = document.getElementById('product-container');
            productContainer.innerHTML = `
            <div class="row gx-4 gx-lg-5 align-items-center">
                    <div class="col-md-6"><img class="card-img-top mb-5 mb-md-0" src="http://20.199.21.250:8002/${product.thumbnail}" alt="${product.name}" /></div>
                    <div class="col-md-6">
                        <div class="small mb-1">SKU: BST-498</div>
                        <h1 class="display-5 fw-bolder">${product.name}</h1>
                        <div class="fs-5 mb-5">
                            <span>$${product.price}</span>
                        </div>
                        <p class="lead">Description : ${product.description}</p>
                        <p class="lead">In Stock : ${product.stock}</p>
                        <div class="d-flex">
                            <input class="form-control text-center me-3" id="inputQuantity" type="num" value="1" style="max-width: 3rem" />
                            <button class="btn btn-outline-dark flex-shrink-0" type="button">
                                <i class="bi-cart-fill me-1"></i>
                                Add to cart
                            </button>
                        </div>
                    </div>
                </div>
            `;
        }

        fetchProduct();
    </script> {% endcomment %}

























    
    <!--new script-->
    <script src="https://code.jquery.com/jquery-3.6.0.min.js"></script>
    <script>
      $(function () {
        // Function to get the JWT token from localStorage
        function getToken() {
          return localStorage.getItem("accessToken");
        }

        // Function to get the username from the JWT token
        function getUserIDFromToken(token) {
          if (!token) return null;
          try {
            const payload = JSON.parse(atob(token.split(".")[1]));
            console.log("JWT Payload:", payload);
            return payload.user_id;
          } catch (e) {
            console.error("Invalid token:", e);
            return null;
          }
        }
        // Function to fetch user details using user_id
        function fetchUserDetails(user_id) {
          return $.ajax({
            url: `${AUTH_SERVICE_URL}/auth/user/${user_id}/`,
            type: "GET",
            headers: {
              Authorization: `Bearer ${getToken()}`,
            },
          });
        }

        // Display login status
        function displayLoginStatus() {
          const token = getToken();
          const user_id = getUserIDFromToken(token);

          if (user_id) {
            fetchUserDetails(user_id)
              .done(function (user) {
                if (user) {
                  $("#login-status").html(
                    `<br>&nbsp; <span>Welcome, ${user.username}</span>`
                  );
                  $("#login-form").hide();
                  $("#signupbtn").hide();
                  $("#logoutBtn").show();
                  $("#cartbtn").show();
                  
                  
                } else {
                  //$('#login-status').html(`<a href="/auth/login/" class="btn btn-primary">Login</a>`);
                  $("#login-form").show();
                  $("#logoutBtn").hide();
                  $("#cartbtn").hide();
                  
                  
                }
              })
              .fail(function () {
                //$('#login-status').html(`<a href="/auth/login/" class="btn btn-primary">Login</a>`);
                $("#login-form").show();

                $("#logoutBtn").hide();
                $("#cartbtn").hide();
              });
          } else {
            //$('#login-status').html(`<a href="/auth/login/" class="btn btn-primary">Login</a>`);
            $("#login-form").show();

            $("#logoutBtn").hide();
            $("#cartbtn").hide();
          }
        }

        function getSlugFromUrl() {
            const urlPath = window.location.pathname;
            const pathSegments = urlPath.split('/');
            return pathSegments[pathSegments.length - 2];
        }

        async function fetchProduct() {
            const slug = getSlugFromUrl();
            if (!slug) {
                console.error('No slug parameter found in URL');
                return;
            }
            
            try {
                const response = await fetch(`${PRODUCTS_SERVICE_URL}/item/${slug}/`);
                if (!response.ok) {
                    throw new Error('Network response was not ok');
                }
                const product = await response.json();
                displayProduct(product);

                const productId = product.id;
                console.log('Product ID:', productId);
            } catch (error) {
                console.error('There was a problem with the fetch operation:', error);
            }
        }
        async function fetchCart() {
          const token = getToken();
          const userId = getUserIDFromToken(token);
          if (userId) {
            try {
                const response = await fetch(`${CART_SERVICE_URL}/cart/${userId}/`, {
                    headers: {
                        'Authorization': `Token ${token}`,
                        'Content-Type': 'application/json'
                    }
                });
                if (!response.ok) {
                    throw new Error('Network response was not ok');
                }
                const cartItems = await response.json();
                displayTotalItems(cartItems);
            } catch (error) {
                console.error('Failed to fetch cart:', error);
              }
            }
        }
  
        function displayTotalItems(cartItems) {
              // Calculate the total number of items in the cart
            const totalItems = cartItems.reduce((sum, item) => sum + item.quantity, 0);
  
              // Display the total number of items
            const totalItemsElement = document.getElementById('total-items');
            totalItemsElement.textContent = `${totalItems}`;
        }
        
        fetchCart();
  
          // Fetch the cart when the page loads
        //document.addEventListener('DOMContentLoaded', fetchCart);

        // Get products and include the JWT token in the request
        function displayProduct(product) {
            const productContainer = document.getElementById('product-container');
            productContainer.innerHTML = `
            <div class="row gx-4 gx-lg-5 align-items-center">
                    <div class="col-md-6"><img class="card-img-top mb-5 mb-md-0" src="${PRODUCTS_SERVICE_URL}/${product.thumbnail}" alt="${product.name}" /></div>
                    <div class="col-md-6">
                        <div class="small mb-1">SKU: BST-498</div>
                        <h1 class="display-5 fw-bolder">${product.name}</h1>
                        <div class="fs-5 mb-5">
                            <span>$${product.price}</span>
                        </div>
                        <p class="lead">Description : ${product.description}</p>
                        <p class="lead">In Stock : ${product.stock}</p>
                        <div class="d-flex">
                            <input class="form-control text-center me-3" id="inputQuantity" type="number" value="1" min="1" max=${product.stock} style="max-width: 3rem" />
                            <button class="btn btn-outline-dark flex-shrink-0" type="button" onclick="fetchProductIdAndAddToCart()" id="add-to-cart-btn">
                                <i class="bi-cart-fill me-1"></i>
                                Add to cart
                            </button>
                        </div>
                    </div>
                </div>
            `;
        }

        fetchProduct();




        // Handle login form submission
        $("#loginForm").submit(function (event) {
          event.preventDefault();
          const username = $("#username").val();
          const password = $("#password").val();

          $.ajax({
            url: `${AUTH_SERVICE_URL}/auth/login/`,
            type: "POST",
            contentType: "application/json",
            data: JSON.stringify({ username, password }),
            success: function (data) {
              console.log("Login successful:", data); // Debug: log the success response
              $("#id01").hide();
              localStorage.setItem("accessToken", data.access);
              localStorage.setItem('refreshToken', data.refresh);
              displayLoginStatus();
              fetchCart();
              //getProducts(); // Fetch products again after login
            },
            error: function (xhr, status, error) {
              console.error("Error logging in:", xhr.responseText); // Debug: log the error response
              alert("Login failed");
            },
          });
        });

        $("#signupForm").submit(function (event) {
          event.preventDefault();
          const first_name = $("#firstname").val();
          const last_name = $("#lastname").val();
          const username = $("#username1").val();
          const password = $("#password1").val();

          $.ajax({
            url: `${AUTH_SERVICE_URL}/auth/register/`,
            type: "POST",
            contentType: "application/json",
            data: JSON.stringify({ first_name, last_name, username, password }),
            success: function (data) {
              console.log("Signup successful:", data); // Debug: log the success response
              $("#signupmodal").hide();
              alert("Account Created Successfully");
            },
            error: function (xhr, status, error) {
              console.error("Error Signing up:", xhr.responseText); // Debug: log the error response
              alert("Signup failed");
            },
          });
        });

        // Initial display
        displayLoginStatus();
        //getProducts();
      });
    </script>

    <script>
      document.addEventListener('DOMContentLoaded', function() {
          document.getElementById('logoutBtn').addEventListener('click', function(event) {
              event.preventDefault(); // Prevent the default button action

              const accessToken = localStorage.getItem('accessToken'); // Retrieve access token from localStorage
              const refreshToken = localStorage.getItem('refreshToken'); // Retrieve refresh token from localStorage

              if (!refreshToken) {
                  document.getElementById('response').innerText = 'Refresh token not found';
                  return;
              }

              // Post data to API
              fetch(`${AUTH_SERVICE_URL}/auth/logout/`, {
                  method: 'POST',
                  headers: {
                      'Content-Type': 'application/json',
                      'Authorization': 'Bearer ' + accessToken
                  },
                  body: JSON.stringify({ refresh: refreshToken })
              })
              .then(response => {
                    if (response.status === 205) {
                        localStorage.removeItem('accessToken');
                        localStorage.removeItem('refreshToken');
                        document.getElementById('response').innerText = 'Logout successful';
                        $("#login-status").hide();
                        location.reload();
                    } else {
                        return response.json().then(data => {
                            throw new Error(JSON.stringify(data));
                        });
                    }
                })
                .catch((error) => {
                    console.error('Error:', error);
                    document.getElementById('response').innerText = 'Error: ' + error.message || error;
                });
            });
        });
  </script>



  <script>

    async function fetchProductIdAndAddToCart() {
      const slug = getSlugFromUrl();
      const quantity = document.getElementById('inputQuantity').value;
      if (!slug) {
          console.error('No slug parameter found in URL');
          return;
      }
      
      try {
          const response = await fetch(`${PRODUCTS_SERVICE_URL}/item/${slug}/`);
          if (!response.ok) {
              throw new Error('Network response was not ok');
          }
          const product = await response.json();
          
          // Extract the product ID
          const productId = product.id;
          if (productId) {
              console.log('Product ID xxx:', productId);
              console.log('Product quantity xxx:', quantity);
              addToCart(productId,quantity);
          } else {
              console.error('Product ID is undefined');
          }
      } catch (error) {
          console.error('There was a problem with the fetch operation:', error);
      }
    }

    function getSlugFromUrl() {
      const urlPath = window.location.pathname;
      const pathSegments = urlPath.split('/');
      return pathSegments[pathSegments.length - 2];
    }
    
    function getUserIDFromToken(token) {
      if (!token) return null;
      try {
        const payload = JSON.parse(atob(token.split(".")[1]));
        console.log("JWT Payload:", payload);
        return payload.user_id;
      } catch (e) {
        console.error("Invalid token:", e);
        return null;
      }
    }

    function addToCart(productId,quantity) {
        //const productId = document.getElementById('add-to-cart-btn').dataset.productId;
        const token = localStorage.getItem('accessToken');
        const user_id = getUserIDFromToken(token);
        if (!token) {
            alert('You must be logged in to add items to the cart.');
            return;
        }

        $.ajax({
            url: `${CART_SERVICE_URL}/cart/${productId}/${user_id}/`,
            type: 'POST',
            headers: {
                'Authorization': `Token ${token}`,
                'Content-Type': 'application/json'
            },
            data: JSON.stringify({ quantity: quantity }),
            success: function(response) {
                location.reload();
                //alert('Product added to cart');
            },
            error: function(response) {
                alert('Failed to add product to cart');
            }
        });
    }

  </script>

        <!-- Footer-->
        <footer class="py-5 bg-dark">
            <div class="container"><p class="m-0 text-center text-white">Copyright &copy; My Shop ❤ 2024</p></div>
        </footer>
        <!-- Bootstrap core JS-->
        <script src="https://cdn.jsdelivr.net/npm/bootstrap@5.2.3/dist/js/bootstrap.bundle.min.js"></script>
        <!-- Core theme JS-->
        <script src="{% static 'js/scripts.js' %}"></script>
    </body>
</html>
