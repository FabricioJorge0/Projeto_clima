document.querySelector('.busca').addEventListener('submit',async (event) => {
    event.preventDefault();

    let input = document.querySelector('#searchInput').value;
    if(input  !== ''){
        showWarning('Carregando...')

        let url = `https://api.openweathermap.org/data/2.5/weather?q=${encodeURI(input)}&appid=21314a1ac4263831e2375fc286938e03&units=metric&lang=pt_br`
        let result = await fetch(url);
        let json = await result.json();
        
        if(json.cod === 200){
            showInfo({
                name: json.name,
                country: json.sys.country,
                temp: json.main.temp,
                tempIcon: json.weather[0].icon,
                tempDescription: json.weather[0].description,
                windSpeed: json.wind.speed,
                windAngle: json.wind.deg
            })
        }else{
            showWarning('Não encontramos esta localização...')

        }

    }else{

    }
})

function showInfo(json){
    showWarning('');

    document.querySelector('.resultado').style.display = 'block'
    document.querySelector('.titulo').innerHTML = `${json.name}, ${json.country}`
    document.querySelector('.tempInfo').innerHTML = `${json.temp} <sup>ºC</sup>`
    document.querySelector('.ventoInfo').innerHTML = `${json.windSpeed} <span>Km/h</span>`
    document.querySelector('.temp img').setAttribute('src', `http://openweathermap.org/img/wn/${json.tempIcon}@2x.png`, )
    document.querySelector('.ventoPonto').style.transform = `rotate(${json.windAngle - 90}deg)`
    document.querySelector('#descricao').innerHTML = `${json.tempDescription}`
}

function showWarning(msg){
    document.querySelector('.aviso').innerHTML = msg
    document.querySelector('.resultado').style.display = 'none'
}