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
                  $("#cartbtn").show();
                  
                  
                } else {
                  //$('#login-status').html(`<a href="/auth/login/" class="btn btn-primary">Login</a>`);
                  window.location.replace("/");
                  $("#cartbtn").hide();
                }
              })
              .fail(function () {
                //$('#login-status').html(`<a href="/auth/login/" class="btn btn-primary">Login</a>`);
                window.location.replace("/");
                $("#cartbtn").hide();
              });
          } else {
            //$('#login-status').html(`<a href="/auth/login/" class="btn btn-primary">Login</a>`);
            window.location.replace("/");
            $("#cartbtn").hide();
          }
        }

        function getSlugFromUrl() {
            const urlPath = window.location.pathname;
            const pathSegments = urlPath.split('/');
            return pathSegments[pathSegments.length - 2];
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

                if(Object.values(cartItems).length === 0){
                    $("#clear-cart").hide();
                    $("#checkout").hide();
                    console.log("no data found");
                }
                displayTotalItems(cartItems);
                displayItems(cartItems);
            } catch (error) {
                console.error('Failed to fetch cart:', error);
              }
            }
        }

        async function deleteProductFromCart(productId, userId) {
            const token = localStorage.getItem('accessToken');
            try {
                const response = await fetch(`${CART_SERVICE_URL}/cart/${productId}/${userId}/`, {
                    method: 'DELETE',
                    headers: {
                        'Authorization': `Token ${token}`,
                        'Content-Type': 'application/json'
                    }
                });
                if (response.ok) {
                    fetchCart();
                } else {
                    console.error('Failed to delete product from cart');
                }
            } catch (error) {
                console.error('Error:', error);
            }
        }
    
        async function clearCart(userId) {
            const token = localStorage.getItem('accessToken');
            try {
                const response = await fetch(`${CART_SERVICE_URL}/cart/${userId}/`, {
                    method: 'DELETE',
                    headers: {
                        'Authorization': `Token ${token}`,
                        'Content-Type': 'application/json'
                    }
                });
                if (response.ok) {
                    fetchCart();
    
                } else {
                    console.error('Failed to clear cart');
                }
            } catch (error) {
                console.error('Error:', error);
            }
        }
        $(document).on('click', '#cart-items button', function() {
            const productId = $(this).data('id');
            const userId = getUserIDFromToken(getToken());
            deleteProductFromCart(productId, userId);
        });

        $('#clear-cart').on('click', function() {
            const userId = getUserIDFromToken(getToken());
            clearCart(userId);
        });




        //

        function getProductDetailsFromCart() {
          const products = [];
          const productElements = document.querySelectorAll('.product-quantity-input');
      
          productElements.forEach(productElement => {
              const productId = productElement.getAttribute('data-id');
              const quantity = productElement.value;
      
              products.push({
                  product_id: productId,
                  quantity: parseInt(quantity, 10)
              });
          });
      
          return products;
      }

      async function createOrder(userId, cartItems) {
        const token = localStorage.getItem('accessToken');
    
        const orderData = {
            user_id: userId,
            items: cartItems
        };
    
        // Create the order
        try {
            const orderResponse = await fetch(`${ORDERS_SERVICE_URL}/api/orders/`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Token ${token}`
                },
                body: JSON.stringify(orderData)
            });
    
            if (orderResponse.ok) {
                const responseData = await orderResponse.json();
                console.log('Order created successfully:', responseData);
                return true;
            } else {
                console.error('Failed to create order');
                return false;
            }
        } catch (error) {
            console.error('Error:', error);
            return false;
        }
    }

        document.getElementById('checkout').addEventListener('click', async function() {
          const userId = getUserIDFromToken(getToken());
      
          // Get the product details from the cart
          const cartItems = getProductDetailsFromCart();
      
          // Create the order with the cart items
          const orderCreated = await createOrder(userId, cartItems);
      
          // If the order is successfully created, clear the cart
          if (orderCreated) {
              await clearCart(userId);
              window.location.replace("/orders/");
          }
        });

        
        
        function displayItems(cartItems) {
            const cartItemsContainer = document.getElementById('cart-items');
            cartItemsContainer.innerHTML = '';
            let totalPrice = 0;

            cartItems.forEach(item => {
                const productTotal = item.price * item.quantity;
                totalPrice += productTotal;

                const cartItem = document.createElement('div');
                cartItem.className = 'cart-item';

                cartItem.innerHTML = `
                    <div class="product-image">
                        <img src="${PRODUCTS_SERVICE_URL}/${item.thumbnail}" alt="${item.name}">
                    </div>
                    <div class="product-title">${item.name}</div>
                    <div class="product-price">$${item.price.toFixed(2)}</div>
                    <div class="product-quantity">
                        <input type="number" value="${item.quantity}" min="1" data-id="${item.id}" class="product-quantity-input" disabled>
                    </div>
                    <div class="product-total">$${productTotal.toFixed(2)}</div>
                    <div class="product-remove">
                        <button class="button-20" data-id="${item.id}"><i class="bi-trash-fill me-1"></i></button>
                    </div>
                `;

                cartItemsContainer.appendChild(cartItem);
            });

            document.getElementById('total-price').innerText = `$${totalPrice.toFixed(2)}`;
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

        //fetchProduct();



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