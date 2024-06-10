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


async function fetchOrders() {
  const token = getToken();
  const user_id = getUserIDFromToken(token);

  try {
      const response = await fetch(`${ORDERS_SERVICE_URL}/api/orders/filter_by_username/?user_id=${user_id}`);
      if (response.ok) {
          const orders = await response.json();
          displayOrders(orders);
      } else {
          console.error('Failed to fetch orders');
      }
  } catch (error) {
      console.error('Error fetching username or orders:', error);
  }
}

// Function to display orders in HTML
function displayOrders(orders) {
  const orderList = document.getElementById('order-list');

  orders.forEach(order => {
      const orderDiv = document.createElement('div');
      orderDiv.className = 'order';

      const orderHeader = document.createElement('div');
      orderHeader.className = 'order-header';
      orderHeader.innerText = `Order ID: ${order.id} | Total cost: $${order.order_cost} | Date: ${new Date(order.created_at).toLocaleString()}`;
      orderDiv.appendChild(orderHeader);

      order.items.forEach(item => {
          const productDiv = document.createElement('div');
          productDiv.className = 'product';

          const productImage = document.createElement('img');
          productImage.src = `${PRODUCTS_SERVICE_URL}/${item.product.thumbnail}`;
          productImage.alt = item.product.name;
          productDiv.appendChild(productImage);

          const productInfo = document.createElement('div');
          productInfo.innerHTML = `
              <div><strong>${item.product.name}</strong></div>
              <div>Price: $${item.product.price.toFixed(2)}</div>
              <div>Quantity: ${item.quantity}</div>
              <div>Total: $${(item.product.price * item.quantity).toFixed(2)}</div>
          `;
          productDiv.appendChild(productInfo);

          orderDiv.appendChild(productDiv);
      });

      orderList.appendChild(orderDiv);
  });
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

// Call the function to fetch and display orders
fetchOrders();
</script>