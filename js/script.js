const json = function(response){
    return response.json()
};

if(localStorage.length != 0){
    for(i=0; i<localStorage.length; i++)
        document.getElementById('facts').innerHTML =  document.getElementById('facts').innerHTML + '<div class="fact">' + localStorage.getItem(i) + '</div>'
}

function showFact(){
    var number = document.getElementById('fieldNumber').value
    if(number == '') document.getElementById('fact').innerHTML = "Type some number!"
    else{
    fetch('http://numbersapi.com/' + number + '/trivia?json')
    .then(response => {
    if(response.status !== 200){
        return Promise.reject(response.statusText)
    }
    return Promise.resolve(response)
})
.then(json)
.then(function (data){
    facts = document.getElementById('facts')
    var added = document.querySelectorAll('.fact')
    if (added.length >= 8){
        for(i=7; i>0; i--)
        {
            added[i].innerHTML = added[i-1].innerHTML
            localStorage.setItem(i, localStorage.getItem(i-1))
        }
        added[0].innerHTML = data.text;
        localStorage.setItem(0,data.text)
    } else {
        facts.innerHTML =  '<div class="fact">' + data.text + '</div>' + facts.innerHTML
        localStorage.setItem(localStorage.length, data.text)
    }
    
})
.catch(err => console.error('ERRORRRR: ' + err))
    }
}

function clearFacts(){
    localStorage.clear()
    document.getElementById('facts').innerHTML = ''
}

document.getElementById('showFact').addEventListener('click', showFact)
document.getElementById('clear').addEventListener('click', clearFacts)