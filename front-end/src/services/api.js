const baseURL = 'https://api.github.com';

function getDados(url) {

    const request = new XMLHttpRequest();
    request.open('GET', baseURL + url, false);
    request.send();

    return JSON.parse(request.responseText);
}

export default getDados;