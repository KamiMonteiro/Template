const form = document.querySelector('#form');
// constante que guarda a variável input, relacionada ao que vai ser colocado no campo Nome//
const nomeInput = document.getElementById('nome');
const emailInput = document.getElementById('email');
const cpfInput = document.getElementById('cpf');
const telefoneInput = document.getElementById('telefone');
const telefoneError = telefoneInput.nextElementSibling;
const nomeError = nomeInput.nextElementSibling; // Seleciona o elemento p de erro
const emailError = emailInput.nextElementSibling;
const cpfError = cpfInput.nextElementSibling;
const sexoInputs = document.querySelectorAll('input[name="sexo"]');
const sexoError = document.getElementById('sexo-error');

console.log("err", sexoError)


// Função para esconder todos os erros inicialmente
function inicializarErros() {
   const mensagensErro = document.querySelectorAll('.error');
   mensagensErro.forEach(erro => {
       erro.classList.add('error-hidden');
       erro.classList.remove('error');
       erro.textContent = '';  // Limpa o texto da mensagem
   });
}
// Chama a função de inicialização quando a página carrega
document.addEventListener('DOMContentLoaded', inicializarErros);

 // Função para validar o nome
function validarNome(nome) {
   // Remove espaços em branco do início e fim
   const nomeFormatado = nome.trim();
   
   // Verifica se o campo está vazio
   if (!nomeFormatado) {
       return {
           valido: false,
           mensagem: 'O nome é obrigatório.'
       };
   }
   
   // Verifica o tamanho do nome (maior que 2 e menor ou igual a 100)
   if (nomeFormatado.length <= 2) {
       return {
           valido: false,
           mensagem: 'O nome deve ter mais que 2 caracteres.'
       };
   }
   
   if (nomeFormatado.length > 100) {
       return {
           valido: false,
           mensagem: 'O nome deve ter no máximo 100 caracteres.'
       };
   }
   
   return {
       valido: true,
       mensagem: ''
   };
}

// Função para validar o email
function validarEmail(email) {
   const emailFormatado = email.trim();
   
   // Verifica se o campo está vazio
   if (!emailFormatado) {
       return {
           valido: false,
           mensagem: 'O e-mail é obrigatório.'
       };
   }
   
   // Verifica o tamanho do email
   if (emailFormatado.length <= 10) {
       return {
           valido: false,
           mensagem: 'O e-mail deve ter mais que 10 caracteres.'
       };
   }
   
   if (emailFormatado.length > 100) {
       return {
           valido: false,
           mensagem: 'O e-mail deve ter no máximo 100 caracteres.'
       };
   }
   
   // Regex para validação de email
   const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
   
   if (!emailRegex.test(emailFormatado)) {
       return {
           valido: false,
           mensagem: 'Digite um e-mail válido.'
       };
   }
   
   return {
       valido: true,
       mensagem: ''
   };
}

// Função para validar CPF
function validarCPF(cpf) {
   // Remove caracteres não numéricos
   const cpfLimpo = cpf.replace(/\D/g, '');
   
   // Verifica se tem 11 dígitos
   if (cpfLimpo.length !== 11) {
       return {
           valido: false,
           mensagem: 'O CPF deve ter 11 dígitos.'
       };
   }
   
   // Verifica se todos os dígitos são iguais
   if (/^(\d)\1{10}$/.test(cpfLimpo)) {
       return {
           valido: false,
           mensagem: 'CPF inválido.'
       };
   }
   
   // Calcula primeiro dígito verificador
   let soma = 0;
   for (let i = 0; i < 9; i++) {
       soma += parseInt(cpfLimpo.charAt(i)) * (10 - i);
   }
   let resto = 11 - (soma % 11);
   const digito1 = resto > 9 ? 0 : resto;
   
   // Calcula segundo dígito verificador
   soma = 0;
   for (let i = 0; i < 10; i++) {
       soma += parseInt(cpfLimpo.charAt(i)) * (11 - i);
   }
   resto = 11 - (soma % 11);
   const digito2 = resto > 9 ? 0 : resto;
   
   // Verifica se os dígitos verificadores estão corretos
   if (parseInt(cpfLimpo.charAt(9)) !== digito1 || 
       parseInt(cpfLimpo.charAt(10)) !== digito2) {
       return {
           valido: false,
           mensagem: 'CPF inválido.'
       };
   }
   
   return {
       valido: true,
       mensagem: ''
   };
}


// Função para mostrar ou esconder mensagem de erro//
function mostrarErro(elemento, mensagem, mostrar) {
    elemento.textContent = mensagem;
    if (mostrar) {
        elemento.classList.remove('error-hidden');
        elemento.classList.add('error');
    } else {
        elemento.classList.add('error-hidden');
        elemento.classList.remove('error');
    }
}

// Eventos para o campo CPF
cpfInput.addEventListener('input', function() {
   const resultado = validarCPF(this.value);
   mostrarErro(cpfError, resultado.mensagem, !resultado.valido);
});

// Adiciona evento de input para validação em tempo real
nomeInput.addEventListener('input', function() {
   const resultado = validarNome(this.value);
   mostrarErro(nomeError, resultado.mensagem, !resultado.valido);
});

// Eventos para o campo email
emailInput.addEventListener('input', function() {
   const resultado = validarEmail(this.value);
   mostrarErro(emailError, resultado.mensagem, !resultado.valido);
});

// Validacao de sexo no formulário//
function validarSexo() {
   // Verifica se algum radio button está selecionado
   const selecionado = Array.from(sexoInputs).some(input => input.checked);
   
   if (!selecionado) {
       return {
           valido: false,
           mensagem: 'Por favor, selecione o sexo.'
       };
   }
   
   return {
       valido: true,
       mensagem: ''
   };
}

// Adicione os event listeners para os radio buttons
sexoInputs.forEach(input => {
   input.addEventListener('change', function() {
       const resultado = validarSexo();
       mostrarErro(sexoError, resultado.mensagem, !resultado.valido);
   });
});

// Adicione esta nova função de validação
function validarTelefone(telefone) {
   // Remove caracteres não numéricos
   const telefoneLimpo = telefone.replace(/\D/g, '');
   
   if (!telefoneLimpo) {
       return {
           valido: false,
           mensagem: 'O telefone é obrigatório.'
       };
   }
   
   if (telefoneLimpo.length !== 11) {
       return {
           valido: false,
           mensagem: 'O telefone deve ter 11 dígitos.'
       };
   }
   
   // Verifica se começa com um DDD válido (2 dígitos)
   if (!/^[1-9][0-9]/.test(telefoneLimpo)) {
       return {
           valido: false,
           mensagem: 'DDD inválido.'
       };
   }
   
   return {
       valido: true,
       mensagem: ''
   };
}

// Adicione o event listener para o telefone
telefoneInput.addEventListener('input', function() {
   const resultado = validarTelefone(this.value);
   mostrarErro(telefoneError, resultado.mensagem, !resultado.valido);
});


// Adiciona evento de submit ao formulário
form.addEventListener('submit', function(event) {
   // Previne o envio do formulário se houver erro//
   const nomeResultado = validarNome(nomeInput.value);
   const emailResultado = validarEmail(emailInput.value);
   const cpfResultado = validarCPF(cpfInput.value);
   const sexoResultado = validarSexo();
   const telefoneResultado = validarTelefone(telefoneInput.value);
   
   // Se houver algum erro, impede o envio do formulário
   if (!nomeResultado.valido || !emailResultado.valido || 
      !cpfResultado.valido || !sexoResultado.valido || 
      !telefoneResultado.valido) {
      event.preventDefault();
      
      mostrarErro(nomeError, nomeResultado.mensagem, !nomeResultado.valido);
      mostrarErro(emailError, emailResultado.mensagem, !emailResultado.valido);
      mostrarErro(cpfError, cpfResultado.mensagem, !cpfResultado.valido);
      mostrarErro(sexoError, sexoResultado.mensagem, !sexoResultado.valido);
      mostrarErro(telefoneError, telefoneResultado.mensagem, !telefoneResultado.valido);
      
      // Foca no primeiro campo com erro
      if (!nomeResultado.valido) {
          nomeInput.focus();
      } else if (!emailResultado.valido) {
          emailInput.focus();
      } else if (!cpfResultado.valido) {
          cpfInput.focus();
      } else if (!sexoResultado.valido) {
          sexoInputs[0].focus();
      } else if (!telefoneResultado.valido) {
          telefoneInput.focus();
      }
  }
});