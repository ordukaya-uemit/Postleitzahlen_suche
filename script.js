document.getElementById('Postleitzahl').addEventListener('blur', function () {
    const plz = this.value;
    if (plz) {
        fetch(`https://www.openplzapi.org/api/v1/${plz}`)
            .then(response => response.json())
            .then(data => {
                if (data.status === "success") {
                    const cityField = document.getElementById('Stadt');
                    const cities = data.data.cities;

                    if (cities.length === 1) {
                        cityField.value = cities[0].name;
                    } else if (cities.length > 1) {
                        cityField.type = 'search';
                        cityField.list = 'cityList';
                        cityField.autocomplete = 'on';

                        
                        const dataList = document.createElement('datalist');
                        dataList.id = 'cityList';
                        cities.forEach(city => {
                            const option = document.createElement('option');
                            option.value = city.name;
                            dataList.appendChild(option);
                        });
                        cityField.after(dataList);
                    }
                }
            })
            .catch(error => console.error('Error fetching data:', error));
    }
});
