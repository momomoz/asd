let charactersArray = [];
let list = $("#list");

function loadCharacters() {
    let currentDate = +new Date();
    let publicKey = '13665b9e9bc3ea35608ab51f0e687992';
    let privatKey = '1604612b8458b37cd56a6449195147f29fd13928';

    let hashingString = currentDate + privatKey + publicKey;
    let hash = CryptoJS.MD5(hashingString).toString();

    console.log(hash);

    let querySettings = {
        url: `https://gateway.marvel.com:443/v1/public/characters?apikey=13665b9e9bc3ea35608ab51f0e687992&ts=${currentDate}&hash=${hash}`,
        method: 'get',
        success: (response) => {
            charactersArray = response.data.results;
            console.log(charactersArray)

            for (i = 0; i < charactersArray.length; i++) {
                list.append(`
                <div class="card">
                <img src="${charactersArray[i].thumbnail.path}.jpg" alt="" class="img">
                <div class="name">${charactersArray[i].name}</div>
                </div>
                `)
            }



        }, error: (error) => {
            console.log("error")
        }
    }

    $.ajax(querySettings);
}
loadCharacters();