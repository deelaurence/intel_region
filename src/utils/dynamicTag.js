// src/utils/meta.js

export const updateMeta = (name, content) => {
    let element = document.querySelector(`meta[name="${name}"]`);
  
    if (!element) {
      element = document.createElement('meta');
      element.setAttribute('name', name);
      document.head.appendChild(element);
    }
  
    element.setAttribute('content', content);
  };
  