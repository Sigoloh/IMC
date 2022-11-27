let contador = 0;

function getInputedValues(){
  const altura = document.getElementById("alturaInput").value;
  const peso = document.getElementById("pesoInput").value;
  return [altura, peso];
}

function calculaIMC(altura, peso){
  contador++;
  const imc = peso / (altura * altura);
  return imc;
}

function renderTable(resultsObject){
  const table = document.getElementById("resultTable");
  const tableBody = document.createElement("tbody");
  table.appendChild(tableBody);
  for(const pessoa of resultsObject){
    const tableRow = document.createElement("tr");
    tableBody.appendChild(tableRow);
    for(const key in pessoa){
      const tableData = document.createElement("td");
      if(key !== 'icone'){
        tableData.innerHTML = key == 'peso' ? pessoa[key] + ' kg' : key == 'altura' ? pessoa[key] + ' m' : pessoa[key];
        tableRow.appendChild(tableData);
      } else {
        const tableData = document.createElement("td");
        const img = document.createElement("img");
        img.src = pessoa[key];
        img.style = "width: 20px; height: 20px;";
        tableData.appendChild(img);
        tableRow.appendChild(tableData);
      }

    }
  }
  table.style.display = "block";
}

function classifyIMC(imc){
  if(imc < 18.5){
    return "Abaixo do peso";
  } else if(imc < 25){
    return "Peso normal";
  } else if(imc < 30){
    return "Sobrepeso";
  } else if(imc < 35){
    return "Obesidade grau 1";
  } else if(imc < 40){
    return "Obesidade grau 2";
  } else {
    return "Obesidade grau 3";
  }
}

function getIconByIMC(imc){
  const icon = document.createElement("img");
  icon.width = '10px';
  icon.height = '10px';
if(imc < 18.5){
    return 'https://cdn-icons-png.flaticon.com/512/7714/7714652.png';
  } else if(imc < 25){
    return 'https://cdn-icons-png.flaticon.com/512/2417/2417962.png';
  } else if(imc < 30){
    return 'https://cdn-icons-png.flaticon.com/512/5571/5571762.png';
  } else if(imc < 35){
    return 'https://cdn-icons-png.flaticon.com/512/3136/3136101.png';
  } else if(imc < 40){
    return 'https://cdn-icons-png.flaticon.com/512/7350/7350847.png';
  } else {
    return 'https://cdn-icons-png.flaticon.com/512/5571/5571435.png';
  }
}

function calculateByFile(){
  const results = [];
  const file = document.getElementById("fileInput").files[0];
  const reader = new FileReader();
  reader.readAsText(file);
  reader.onload = function(){
    const fileContent = reader.result;
    const fileObject = JSON.parse(fileContent)
    console.log(fileObject);
    for(const pessoa of fileObject.data){
      const imc = calculaIMC(pessoa.altura, pessoa.peso);
      pessoa.imc = imc.toPrecision(4);
      pessoa.classification = classifyIMC(imc);
      pessoa.icone = getIconByIMC(imc);
      results.push(pessoa);
    }
    renderTable(results);
  }
}

function calculateIMCByUserInput(){
  const imc = calculaIMC(getInputedValues()[0], getInputedValues()[1]);
  const pessoa = {
    nome: document.getElementById('nomeInput').value,
    altura: getInputedValues()[0],
    peso: getInputedValues()[1],
    imc: imc.toPrecision(4),
    classification: classifyIMC(imc),
    icone: getIconByIMC(imc.toPrecision(4)),
  }
  renderTable([pessoa]);
}
