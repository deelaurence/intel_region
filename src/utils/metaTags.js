const setMetaTags = (meta) => {
    if (meta.title) {
      document.title = meta.title;
    }
  
    if (meta.description) {
      let descTag = document.querySelector('meta[name="description"]');
      if (!descTag) {
        descTag = document.createElement('meta');
        descTag.name = 'description';
        document.head.appendChild(descTag);
      }
      descTag.content = meta.description;
    }
  
    if (meta.canonical) {
      let linkTag = document.querySelector('link[rel="canonical"]');
      if (!linkTag) {
        linkTag = document.createElement('link');
        linkTag.rel = 'canonical';
        document.head.appendChild(linkTag);
      }
      linkTag.href = meta.canonical;
    }
  
    if (meta.keywords) {
      let keywordsTag = document.querySelector('meta[name="keywords"]');
      if (!keywordsTag) {
        keywordsTag = document.createElement('meta');
        keywordsTag.name = 'keywords';
        document.head.appendChild(keywordsTag);
      }
      keywordsTag.content = meta.keywords;
    }
  };
  

export default setMetaTags