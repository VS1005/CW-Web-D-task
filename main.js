document.addEventListener('DOMContentLoaded', () => {
  const featuredContainer = document.querySelector('.featured-blogs');
  const otherBlogsContainer = document.querySelector('.other-blogs');
  const modal = document.getElementById('modal');
  const modalContent = document.getElementById('modal-body');
  const closeButton = document.querySelector('.close-button');

  const API_URL = 'https://coding-week-2024-api.onrender.com/api/data';  // Replace with actual API URL

  async function fetchBlogs() {
    try {
      const response = await fetch(API_URL);
      const blogs = await response.json();
      const remainingblogs=blogs.slice(4,10);
      renderBlogs(remainingblogs);
    } catch (error) {
      console.error('Error fetching blogs:', error);
    }
  }

  function renderBlogs(blogs) {
    const featuredBlogs = blogs.filter(blog => blog.type === 'featured');
    const otherBlogs = blogs.filter(blog => blog.type !== 'featured');

    featuredBlogs.forEach(blog => {
      const blogElement = createBlogElement(blog, true);
      featuredContainer.appendChild(blogElement);
    });

    otherBlogs.forEach(blog => {
      const blogElement = createBlogElement(blog, false);
      otherBlogsContainer.appendChild(blogElement);
    });
  }

  function createBlogElement(blog, isFeatured) {
    const blogElement = document.createElement('div');
    blogElement.classList.add(isFeatured ? 'featured-blog' : 'other-blog');
    if (isFeatured) {
      blogElement.innerHTML = `
        <img src="${blog.image}" alt="${blog.headline}">
        <p class="blog-headline">${blog.headline}</p>
        <p class="blog-meta">By ${blog.author} on ${new Date(blog.date).toLocaleDateString()}</p>
        <div class="type-container">
          <div class="type">Featured</div>
          <div class="type">${blog.additionalType}</div>
        </div>
      `;
    } else {
      blogElement.innerHTML = `
        <img src="${blog.image}" alt="${blog.headline}">
        <p class="blog-headline">${blog.headline}</p>
        <p class="blog-date">${new Date(blog.date).toLocaleDateString()}</p>
      `;
    }
    blogElement.addEventListener('click', () => displayModal(blog));
    return blogElement;
  }

  function displayModal(blog) {
    modalContent.innerHTML = `
      <h2>${blog.headline}</h2>
      <img src="${blog.image}" alt="${blog.headline}">
      <p>${blog.content}</p>
    `;
    modal.style.display = 'block';
  }

  closeButton.addEventListener('click', () => {
    modal.style.display = 'none';
  });

  window.addEventListener('click', (event) => {
    if (event.target === modal) {
      modal.style.display = 'none';
    }
  });

  fetchBlogs();
});
