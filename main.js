const data = [
    {valor:'Anthony Roeck'},
    {valor:'Adla Patrícia Bassul'},
    {valor:'Adriana Berquó'},
    {valor:'Carlos Eduardo Dias'},
    {valor:'Carlos Eduardo Peixoto'},
    {valor:'Jamile Nunes'},
    {valor:'Janaina Monteiro'},
    {valor:'Janete Saud'},
    {valor:'Jaqueline Inocente'},
    {valor:'Manuela Tavares'},
    {valor:'Samuel Vilela'},
    {valor:'Samya Barrón'}
]

const input = document.getElementById('meuInput');
const datalist = document.getElementById('opcoes');
const divBotao = document.getElementById('espacoIdBotao');

const addOption = (valor) => {
    const option = document.createElement('option');
    option.value = valor
    option.innerHTML = valor
    option.className = 'options'
    return option
}

function escondeBotao(){
    let espacoBotao = document.getElementById("espacoBotao");
    espacoBotao.innerHTML = ``
}

function mostrarBotao(newSol){
    let espacoBotao = document.getElementById("espacoBotao");
    espacoBotao.innerHTML = 
                `
                <button type="button" class="botao__Add" style="vertical-align:middle" onclick="alert('${newSol} adicionado com sucesso na base de Solicitantes!')"><span>${newSol}</span></button>`
}

input.onblur = function(){
    desSelect = true
    dropDown(false)
}

input.onmouseover = function(){
    input.style.border = '0.1px solid #FFF0DB';
}

input.onmouseleave = function(){
    input.style.border = '0.1px solid #454D47';
}

var desSelect;

const dropDown = (bool) => {
    if(bool){
        console.log(`Exibindo Lista`)
        datalist.style.display = 'block';
        datalist.style.borderRadius = "0 0 5px 5px"; 
        input.style.borderRadius = "5px 5px 0 0"; 
        input.style.borderColor = '#454D47';
    }else{
        console.log(`Ocultando Lista`)
        datalist.style.display = 'none';
        input.style.borderRadius = "5px";
    }
}

const criarOps = () =>{
    console.log("criei opcoes")
    data.forEach(opcao => {
    let option = addOption(opcao.valor)
    option.onclick = function () {
        input.value = option.value;
        dropDown(false)
    }
        datalist.appendChild(addOption(opcao.valor));
    })
}

function filtraLista(){
    let vazio = true
    for (let option of datalist.options) {
        
        if(option.value.toUpperCase().indexOf(input.value.toUpperCase()) > -1){
            console.log(`Filtrado ${option.value.toUpperCase()} com ${input.value.toUpperCase()}`)
            option.style.display = "block";
            vazio = false;
          }else{
            option.style.display = "none";
          }
    };
    return !vazio
}

input.onfocus = function () {
    console.log('Foco')
    if(datalist.innerHTML == ''){
        criarOps()
        dropDown(true)
    }else{
        for (let option of datalist.options) {
            if(option.style.display == "block"){
                dropDown(true)
            }
        }
    }
};


input.oninput = function() {
    console.log('Input')
    currentFocus = -1;
    
    let existeOpcao = filtraLista();
    if (!existeOpcao && input.value.length > 0) {
        console.log(`existeOPCAO = ${existeOpcao} inputLength = ${input.value.length}`)
        dropDown(false)
        mostrarBotao(input.value)
    }else{
        dropDown(true)
        escondeBotao()
    }

}

  var currentFocus = -1;
  
input.onkeydown = function(e) {
    console.log(e.keyCode)
    if(e.keyCode == 40){
      currentFocus++
     addActive(datalist.options);
    }
    else if(e.keyCode == 38){
      currentFocus--
     addActive(datalist.options);
    }
    else if(e.keyCode == 13 || e.keyCode == 32){

          if (currentFocus > -1) {
            /*and simulate a click on the "active" item:*/
            if (datalist.options) datalist.options[currentFocus].click();
          }
    }
    else if(e.keyCode == 8){
        let existeOpcao = filtraLista();
        if (!existeOpcao && input.value.length > 0) {
            console.log(`existeOPCAO = ${existeOpcao} inputLength = ${input.value.length}`)
            dropDown(false)
            mostrarBotao(input.value)
        }else{
            dropDown(true)
            escondeBotao()
        }
      }
  }
  
  function addActive(x) {
      if (!x) return false;
      removeActive(x);
      if (currentFocus >= x.length) currentFocus = 0;
      if (currentFocus < 0) currentFocus = (x.length - 1);
      x[currentFocus].classList.add("active");
    }
    function removeActive(x) {
      for (var i = 0; i < x.length; i++) {
        x[i].classList.remove("active");
      }
    }


// Fazer a requisição à API para obter as opções
        // fetch('URL_DA_API')
        // .then(response => response.json())
        // .then(data => {
        //     // Chamar a função para criar a lista de opções no DOM
        //     criarListaOpcoes(data);
        // })
        // .catch(error => {
        //     console.error('Ocorreu um erro:', error);
        // });




