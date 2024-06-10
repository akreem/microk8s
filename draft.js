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

  function checkTokenBlacklist(token) {
    return $.ajax({
        url: `${AUTH_SERVICE_URL}/token/blacklist-check/`,
        type: "POST",
        contentType: "application/json",
        data: JSON.stringify({ token })
    }).then(function (response) {
        return response.detail === 'Token is blacklisted';
    }).catch(function (error) {
        console.error('Error checking token blacklist:', error);
        return true; // Assume blacklisted if there's an error
    });
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

    if (!token) {
      $("#login-form").show();
      $("#logoutBtn").hide();
      $("#cartbtn").hide();
      return;
    }

    checkTokenBlacklist(token).then(function (isBlacklisted) {
      if (isBlacklisted) {
          $("#login-form").show();
          $("#logoutBtn").hide();
          $("#cartbtn").hide();
          console.error('Token is blacklisted:', token);
          //$("#response").text('Token is blacklisted'); // Display a message if the token is blacklisted
          return;
      }
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
                    console.error('AToken:', token);
                } else {
                    $("#login-form").show();
                    $("#logoutBtn").hide();
                    $("#cartbtn").hide();
                }
              })
            .fail(function () {
                $("#login-form").show();
                $("#logoutBtn").hide();
                $("#cartbtn").hide();
            });
    } else {
        $("#login-form").show();
        $("#logoutBtn").hide();
        $("#cartbtn").hide();
    }
});
}
          
  async function fetchCart() {
    const token = getToken();
    const userId = getUserIDFromToken(token);
    if (!token) {
      console.error('Token is not available for fetching cart:');
    }

      try {
        const isBlacklisted = await checkTokenBlacklist(token);
        if (isBlacklisted) {
          console.error('cant fetch Cart, Token is blacklisted:');
          return;
        }
        if (userId) {
          const response = await fetch(`${CART_SERVICE_URL}/cart/${userId}/`, {
                headers: {
                    'Authorization': `Token ${token}`,
                    'Content-Type': 'application/json'
                }
            });
            if (!response.ok) {
                throw new Error('Network response was not ok');
            }
            console.error('fetch done:');
            const cartItems = await response.json();
            displayTotalItems(cartItems);
          }
        } catch (error) {
            console.error('Failed to fetch cart:', error);
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

  // Get products and include the JWT token in the request
  function getProducts() {
    $.ajax({
      url: `${PRODUCTS_SERVICE_URL}/api/products/`,
      type: "GET",
      success: function (data) {
        // For each product in the JSON response
        $("#products").empty(); // Clear existing products
        data.forEach(function (product) {
          // Build the HTML to display this product's details
          var productHtml = `<div class="card h-30">
                              <div class="col mb-5" >
                              
                              <img src="${product.thumbnail}" class="card-img-top" alt="${product.name}">

                              <!-- Product details-->
                              <div class="card-body p-4">
                                  <div class="text-center">
                              <!-- Product name-->
                                      <h5 class="fw-bolder">${product.name}</h5>
                              <!-- Product price-->
                              ${product.price}
                                  </div>
                              </div>
                              
                              <div class="text-center">
                                  <button class='details-btn btn btn-outline-dark mt-auto' data-slug='${product.slug}'>View product</button>
                              
                              </div>
                              </div>
                            </div>`;
          // Add this HTML to the div with the ID "products"
          $("#products").append(productHtml);
        });

        // Add a click handler to the "View Details" buttons
        $(".details-btn").click(function () {
          var slug = $(this).data("slug");
          window.location.href = `/item/${slug}/`;
        });
      },
      error: function (xhr, status, error) {
        console.error("Error fetching products:", xhr.responseText); // Debug: log the error response
        $("#products").html("<p>Failed to load products.</p>");
      },
    });
  }

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
        //displayLoginStatus();
        //fetchCart();
        //getProducts(); // Fetch products again after login
        location.reload();
      },
      error: function (xhr, status, error) {
        console.error("Error logging in:", xhr.responseText); // Debug: log the error response
        alert("Login failed");
      },
    });
  });

    // Handle signup form submission
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

  displayLoginStatus();
  getProducts();
});
</script>
<script>
document.addEventListener('DOMContentLoaded', function() {
  const accessToken = localStorage.getItem('accessToken'); // Retrieve access token from localStorage
  const refreshToken = localStorage.getItem('refreshToken'); // Retrieve refresh token from localStorage

  if (!accessToken) {
      console.error('Access token not found:');
      return;
  }
  function logoutUser() {
      fetch(`${AUTH_SERVICE_URL}/auth/logout/`, {
          method: 'POST',
          headers: {
              'Content-Type': 'application/json',
              'Authorization': 'Bearer ' + accessToken
          },
          body: JSON.stringify({ access: accessToken })
      })
      .then(response => {
          if (response.status === 205) {
              //localStorage.removeItem('accessToken');
              //localStorage.removeItem('refreshToken');
              console.error("black listed the access ++:", accessToken); // Debug: log the error response
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
          document.getElementById('response').innerText = 'Error: ' + (error.message || error);
      });
  }


  // Add event listener for the logout button
  document.getElementById('logoutBtn').addEventListener('click', function(event) {
      event.preventDefault(); // Prevent the default button action

      if (!refreshToken) {
          document.getElementById('response').innerText = 'Refresh token not found';
          return;
      }

      logoutUser(); // Proceed with logout
  });
});
</script>