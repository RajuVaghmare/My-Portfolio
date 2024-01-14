$(document).ready(function () {
  // Sticky header
  $(window).scroll(function () {
    if ($(this).scrollTop() > 1) {
      $(".header-area").addClass("sticky");
    } else {
      $(".header-area").removeClass("sticky");
    }

    // Update the active section in the header
    updateActiveSection();
  });

  // Smooth scrolling for anchor links
  $(".header ul li a").click(function (e) {
    e.preventDefault();

    var target = $(this).attr("href");

    if ($(target).hasClass("active-section")) {
      return;
    }

    if (target === "#home") {
      $("html, body").animate(
        {
          scrollTop: 0,
        },
        500
      );
    } else {
      var offset = $(target).offset().top - 40;

      $("html, body").animate(
        {
          scrollTop: offset,
        },
        500
      );
    }

    $(".header ul li a").removeClass("active");
    $(this).addClass("active");
  });

  // MENU SHOW
  const showMenu = (toggleId, navId) => {
    const toggle = document.getElementById(toggleId),
      nav = document.getElementById(navId);

    if (toggle && nav) {
      toggle.addEventListener("click", () => {
        nav.classList.toggle("show");
      });
    }
  };
  showMenu("nav-toggle", "nav-menu");

  // Initial content revealing js
  ScrollReveal({
    distance: "100px",
    duration: 2000,
    delay: 200,
  });

  ScrollReveal().reveal(
    ".header a, .profile-photo, .about-content, .education",
    {
      origin: "left",
    }
  );
  ScrollReveal().reveal(
    ".header ul, .profile-text, .about-skills, .internship",
    {
      origin: "right",
    }
  );
  ScrollReveal().reveal(".project-title, .contact-title", {
    origin: "top",
  });
  ScrollReveal().reveal(".projects, .contact", {
    origin: "bottom",
  });

  // Contact form using Web3Forms
  document.addEventListener("DOMContentLoaded", function () {
    const form = document.forms["submitToWeb3Forms"];
    const msg = document.getElementById("msg");

    form.addEventListener("submit", function (e) {
      e.preventDefault();

      const formData = new FormData(form);

      // Replace "YOUR-FORM-ID" with your actual Web3Forms Form ID
      const formId = "YOUR-FORM-ID";

      fetch(`https://web3forms.com/submit/${formId}`, {
        method: "POST",
        body: formData,
      })
        .then((response) => response.json())
        .then((data) => {
          if (data.success) {
            msg.innerHTML = "Message sent successfully";
            setTimeout(function () {
              msg.innerHTML = "";
            }, 5000);
            form.reset();
          } else {
            console.error("Error sending message:", data.error);
            msg.innerHTML = "Error sending message";
          }
        })
        .catch((error) => {
          console.error("Error sending message:", error);
          msg.innerHTML = "Error sending message";
        });
    });
  });

  // Function to update active section in the header
  function updateActiveSection() {
    var scrollPosition = $(window).scrollTop();

    // Checking if scroll position is at the top of the page
    if (scrollPosition === 0) {
      $(".header ul li a").removeClass("active");
      $(".header ul li a[href='#home']").addClass("active");
      return;
    }

    // Iterate through each section and update the active class in the header
    $("section").each(function () {
      var target = $(this).attr("id");
      var offset = $(this).offset().top;
      var height = $(this).outerHeight();

      if (
        scrollPosition >= offset - 40 &&
        scrollPosition < offset + height - 40
      ) {
        $(".header ul li a").removeClass("active");
        $(".header ul li a[href='#" + target + "']").addClass("active");
      }
    });
  }
});
