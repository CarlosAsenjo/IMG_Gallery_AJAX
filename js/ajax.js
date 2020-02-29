
/********* PETICION AJAX ***********/
function request(url) {
    return new Promise(function(resolve, reject) {
        const xhr = new XMLHttpRequest();
        xhr.timeout = 2000;
        xhr.onreadystatechange = function(e) {
            if (xhr.readyState === 4) {
                if (xhr.status === 200) {
                    resolve(xhr.response);
                } else {
                    reject(xhr.status);
                }
            }
        };
        xhr.ontimeout = function() {
            reject('timeout')
        };
        xhr.open('get', url, true);
        xhr.setRequestHeader("x-api-key", "b2a67d10-2fe7-4cf9-a264-d30611e17dbe");
        xhr.send();
    });
}