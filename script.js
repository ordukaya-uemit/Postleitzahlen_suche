document.getElementById('Postleitzahl').addEventListener('blur', function () {
    const plz = this.value;
    if (plz) {
      console.log('PLZ:', plz);
      fetch(`https://openplzapi.org/de/localities?postalCode=${plz}`)
        .then(response => {
          console.log('API response status:', response.status);
          if (response.status != 200) {
            console.error('API returned an error:', data);
          }
          return response.json();
        })
        .then(data => {
          console.log('API response data:', data); 
          const cityField = document.getElementById('Stadt');
          if (data.length === 1) {
            cityField.value = data[0].name;
            cityField.autocomplete = 'off';
            cityField.type = "text"
          } else if (data.length > 1) {
            cityField.type = 'search';
            const dataList = document.createElement('datalist');
            dataList.id = 'cityList';
            data.forEach(city => {
              const option = document.createElement('option');
              option.value = city.name;
              dataList.appendChild(option);
            });
            cityField.appendChild(dataList);
            cityField.setAttribute('list', 'cityList');
            cityField.autocomplete = 'on';
          }
          else{
            alert("Das ist keine gültige PLZ, bitte überprüfen Sie ihre Eingabe");

          }
        }) 
      .catch(error => console.error('Error fetching data:', error));
    }
});  