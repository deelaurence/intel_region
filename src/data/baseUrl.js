const getBaseUrl = () => {
    if (window.location.hostname === 'localhost' || window.location.hostname === '127.0.0.1') {
      return "https://66a3893144aa637045819388.mockapi.io/api/v1";
    } else {
      return "https://66a3893144aa637045819388.mockapi.io/api/v1";
    }
  };
  
  const baseUrl = getBaseUrl();
  export default baseUrl;
  