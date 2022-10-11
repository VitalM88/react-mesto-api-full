const jwt = localStorage.getItem("jwt");

const apiSettings = {
    baseUrl: "http://api.mesto.vitalm.nomoredomains.icu",
    headers: {
         'Content-Type': 'application/json',
         "Authorization": `Bearer ${jwt}`
      }
  };

const authSettings = {
    baseUrl: "http://api.mesto.vitalm.nomoredomains.icu",
    headers: {
      'Content-Type': 'application/json',
      "Authorization": `Bearer ${jwt}`
   }
};
  
  export { apiSettings, authSettings };