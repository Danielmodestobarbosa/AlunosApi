// Importa o React e o hook useState.
// useState é utilizado para criar e controlar estados no componente.
import React, {useState} from "react";

// Importa o arquivo CSS responsável pela estilização da página.
import './styles.css';

// Importa a imagem utilizada na tela de Login.
import logoImage from '../../assets/Login.png';

// Importa a configuração da API utilizada para fazer requisições.
import api from '../../services/api';

// Importa o hook useNavigate.
// Ele permite navegar para outras páginas através do código.
import {useNavigate} from 'react-router-dom';


// Cria e exporta o componente Login.
export default function Login(){

    // Cria o estado email.
    // email armazena o valor digitado pelo usuário.
    // setEmail altera o valor armazenado em email.
    const [email, setEmail] = useState('');

    // Cria o estado password.
    // password armazena a senha digitada pelo usuário.
    // setPassword altera o valor armazenado em password.
    const [password, setPassword] = useState('');

    // Cria a função de navegação entre as páginas.
    const history = useNavigate();


    // Função responsável por realizar o login.
    // event representa o evento de envio do formulário.
    async function login(event){

        // Impede o comportamento padrão do formulário,
        // evitando que a página seja recarregada.
        event.preventDefault();

        // Cria o objeto que será enviado para a API.
        const data = {

            // Envia o email digitado pelo usuário.
            email,

            // Envia a senha digitada pelo usuário.
            password

        }


        try{

            // Faz uma requisição POST para o endpoint de login da API.
            // data contém o email e a senha do usuário.
            const response = await api.post('api/account/loginuser', data);  

            // Armazena o email do usuário no localStorage.
            localStorage.setItem('email', email);

            // Armazena o token JWT retornado pela API.
            localStorage.setItem('token', response.data.token);

            // Armazena a data de expiração do token.
            localStorage.setItem('expiration', response.data.expiration);

            // Após o login realizado com sucesso,
            // navega para a página de alunos.
            history('/alunos');

        }catch{

            // Caso aconteça algum erro durante o login,
            // mostra uma mensagem informando que o login falhou.
            alert('O login falhou ' + console.error());

        }

    }


    // Retorna a estrutura visual da página de Login.
    return (

        <div className="login-container">

            {/* Seção que contém o formulário de Login. */}
            <section className="form">

                {/* Exibe a imagem utilizada na tela de Login. */}
                <img src={logoImage} alt="Login" id="img1"></img>

                {/* Formulário responsável por receber os dados do usuário.
                    Quando enviado, chama a função login. */}
                <form onSubmit={login}>

                    {/* Título exibido acima dos campos. */}
                    <h1>Cadastro de Alunos</h1>

                    {/* Campo utilizado para informar o email.
                        value recebe o estado email.
                        onChange atualiza o estado quando o usuário digita. */}
                    <input placeholder="Email"
                        value={email}
                        onChange={e=>setEmail(e.target.value)}
                    />

                    {/* Campo utilizado para informar a senha.
                        type="password" oculta os caracteres digitados.
                        value recebe o estado password.
                        onChange atualiza o estado quando o usuário digita. */}
                    <input type="password" placeholder="Password"
                        value={password}
                        onChange={e=>setPassword(e.target.value)}
                    />

                    {/* Botão responsável por enviar o formulário. */}
                    <button className="button" type="submit">Login</button>

                </form>

            </section>

        </div>

    )

}