id = document.querySelector("#button")
ls = document.querySelectorAll('.l')
lo = document.querySelectorAll('.lo')
coord = document.querySelector('.coord')
download = document.querySelector('#buttonDownload')
tbody = document.querySelector('#tbody')
table = document.querySelector('#table')
apagar = document.querySelector('#buttonApagar')
apagarEntrada = document.querySelector('#buttonApagarEntrada')
data = ['V;LAT;LONG']
coordenadas = 'V;LAT;LONG\n'
cont = 0

function createTable(vertice, lat, long){
    let tr = document.createElement('tr')
    let tdv = document.createElement('td')
    let tdl = document.createElement('td')
    let tdlo = document.createElement('td')

    tdv.textContent = vertice
    tdl.textContent = lat
    tdlo.textContent = long

    tr.append(tdv, tdl, tdlo)
    tbody.append(tr)
}

function contemLetrasOuSimbolos(){
    vazio = false
    letras = false
    lat = false
    los = false
    const regex = /[a-zA-Z!@#$%^&*()?"{}|<>]/
    for(i = 0; i < ls.length; i ++){
        if(ls[i].value == '' || lo[i].value == ''){
            vazio = true
        }
    }
    ls.forEach(l => {
        if(regex.test(l.value)){
            lat = true
        }
    })
    lo.forEach(l => {
        if(regex.test(l.value)){
            los = true
        }
    })
    if(los || lat){
        alert('Não pode conter letras ou símbolos!')
    } else {
        if(vazio == false) {
            cont++
            latitude = []
            longitude = []
            ls.forEach(l => {
                latitude.push(l.value)
            })
            lo.forEach(lo => {
                longitude.push(lo.value)
            })
            textoLatitude = `${cont};"${latitude[0]}°${latitude[1]}'${latitude[2]}""S"`
            textoLongitude = `"${longitude[0]}°${longitude[1]}'${longitude[2]}""W"`
            coordenada = `${textoLatitude.replace(/,/g, '.').replace(/\s/,'')};${textoLongitude.replace(/,/g,'.').replace(/\s/,'')}`
            coordenadas += `${coordenada}\n`
            data.push(coordenada)
            createTable(
                cont, 
                textoLatitude.replace(/""|;|\s/g, '').substring(2), 
                textoLongitude.replace(/""|;|\s/g, '').substring(1)
            )
        } else {
            alert('Preencha os campos vazios!!')
        }
    }
}

id.addEventListener("click", () => {
    contemLetrasOuSimbolos()
    console.log(coordenadas)
})

function downloadTxtFile(data, filename) {
    // Converter dados para o formato TXT
    let txtContent = "data:text/plain;charset=utf-8,";
    data.forEach(function(line) {
        txtContent += line + "\r\n";  // Adicionar quebra de linha após cada string
    });

    // Criação de um link temporário para download
    const encodedUri = encodeURI(txtContent);
    const link = document.createElement("a");
    link.setAttribute("href", encodedUri);
    link.setAttribute("download", filename);
    document.body.appendChild(link);

    // Acionar o download
    link.click();

    // Remover o link temporário
    document.body.removeChild(link);
}

download.addEventListener('click', () => {
    downloadTxtFile(data, "coordenadas.csv")
})

apagar.addEventListener('click', () => {
    tbody.innerHTML = ''
    coordenadas = 'V;LAT;LONG\n'
    cont = 0
    ls.forEach(l => {
        l.value = ''
    })
    lo.forEach(l => {
        l.value = ''
    })
})

apagarEntrada.addEventListener('click', () => {
    ls.forEach(l => {
        l.value = ''
    })
    lo.forEach(l => {
        l.value = ''
    })
})

