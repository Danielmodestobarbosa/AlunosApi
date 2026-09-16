// Importa o React e os hooks useEffect e useState.
// useState cria e controla estados.
// useEffect executa uma ação quando determinadas informações mudam.
import React, { useEffect, useState } from "react";

// Importa o arquivo CSS responsável pela aparência da página.
import './styles.css';

// Importa os ícones utilizados na tela.
import { FiCornerDownLeft, FiUserPlus } from "react-icons/fi";

// Importa:
// Link -> cria links entre páginas sem recarregar a aplicação.
// useNavigate -> permite navegar através do código.
// useParams -> permite pegar parâmetros presentes na URL.
import { Link, useNavigate, useParams } from "react-router-dom";

// Importa a configuração do Axios utilizada para fazer requisições para a API.
import api from '../../services/api'


export default function NovoAluno(){

    // Pega o parâmetro "alunoId" que foi definido na rota.
    // Exemplo: /aluno/novo/5 -> alunoId será 5.
    // Quando for /aluno/novo/0, significa que será cadastrado um novo aluno.
    const {alunoId} = useParams();

    // Cria o estado que armazenará o ID do aluno.
    // O valor inicial é null.
    const [id, setId] = useState(null);

    // Cria o estado que armazenará o nome do aluno.
    // O valor inicial é uma string vazia.
    const [nome, setNome] = useState('');

    // Cria o estado que armazenará o email do aluno.
    // O valor inicial é uma string vazia.
    const [email, setEmail] = useState('');

    // Cria o estado que armazenará a idade do aluno.
    // O valor inicial é 0.
    const [idade, setIdade] = useState(0);

    // Cria a função responsável por realizar a navegação entre as páginas.
    const navigate = useNavigate();

    // Recupera o token JWT que foi armazenado no navegador durante o login.
    const token = localStorage.getItem('token');

    // Cria o objeto de autorização que será enviado nas requisições.
    // O token é enviado no cabeçalho Authorization da requisição.
    const authorization = {

        headers : {

            // O Bearer informa que estamos utilizando um token do tipo Bearer.
            Authorization : `Bearer ${token}`

        }

    }


    // useEffect executa o código quando o componente é carregado
    // ou quando o alunoId sofre alteração.
    useEffect(()=>{

        // Se o alunoId for 0, significa que estamos cadastrando
        // um novo aluno, então não precisamos buscar dados na API.
        if(alunoId == 0)

            return

        // Caso o alunoId não seja 0, significa que estamos editando
        // um aluno existente, então chamamos loadAluno().
        else

            loadAluno();

    }, alunoId)


    // Função responsável por buscar os dados de um aluno na API.
    async function loadAluno(){

        try{

            // Faz uma requisição GET para buscar o aluno pelo ID.
            const response = await api.get(`api/alunos/${alunoId}`, authorization);

            // Guarda o ID retornado pela API no estado id.
            setId(response.data.id);

            // Guarda o nome retornado pela API no estado nome.
            setNome(response.data.nome);

            // Guarda o email retornado pela API no estado email.
            setEmail(response.data.email);

            // Guarda a idade retornada pela API no estado idade.
            setIdade(response.data.idade);

        }catch(erro){

            // Caso aconteça algum erro ao buscar o aluno,
            // exibe uma mensagem para o usuário.
            alert("Erro ao recuperar o aluno' = erro");

            // Depois do erro, volta para a página de alunos.
            navigate('/alunos');
        }
    }

    // Função responsável por cadastrar um novo aluno
    // ou atualizar um aluno existente.
    async function saveOrUpdate(event){

        // Impede que o formulário recarregue a página.
        event.preventDefault();

        // Cria o objeto que será enviado para a API.
        const data ={
            nome, 
            email,
            idade

        }

        try{

            // Verifica se o alunoId é 0.
            // Se for 0, significa que é um novo aluno.
            if(alunoId == 0){

                // Envia os dados através de uma requisição POST.
                // POST é utilizado para criar um novo registro.
                await api.post('api/alunos', data, authorization);

            }else

            {
                // Adiciona o ID do aluno ao objeto que será enviado.
                data.id = id;

                // Envia os dados através de uma requisição PUT.
                // PUT é utilizado para atualizar um registro existente.
                await api.put(`api/alunos/${id}`, data, authorization);

            }

        }catch(err){

            // Caso aconteça algum erro durante o cadastro
            // ou atualização, mostra uma mensagem.
            alert('Erro ao gravar aluno' + err);

        }

        // Depois de salvar ou atualizar,
        // retorna para a página de alunos.
        navigate('/alunos')

    }

    // Retorna a estrutura visual da página.
    return(

        <div className="novo-aluno-container">

            {/* Container que organiza o conteúdo da página. */}
            <div className="content">

                {/* Seção que contém o título e o link para retornar. */}
                <section className="form">

                    {/* Ícone exibido no topo da página. */}
                    <FiUserPlus size="105" color="#1720a"/>

                    {/* 
                        Se alunoId for 0, mostra "Incluir Novo Aluno".
                        Caso contrário, mostra "Atualizar Aluno".
                    */}
                    <h1>
                        {alunoId === '0'
                            ? 'Incluir Novo Aluno'
                            : 'Atualizar Aluno'}
                    </h1>

                    {/* Link que leva o usuário de volta para a lista de alunos. */}
                    <Link className="back-link" to="/alunos">

                        {/* Ícone utilizado no botão/link de retorno. */}
                        <FiCornerDownLeft size="25" color="#17202a"/>

                        {/* Texto exibido no link. */}
                        Retornar
                    </Link>
                </section>

                {/* 
                    Formulário utilizado para incluir ou atualizar um aluno.
                    Quando enviado, chama a função saveOrUpdate.
                */}
                <form onSubmit={saveOrUpdate}>

                    {/* Campo utilizado para informar o nome do aluno. */}
                    <input
                        placeholder="Nome"
                        className="input-filtro"
                        value={nome}
                        onChange={e=> setNome(e.target.value)}
                    />

                    {/* Campo utilizado para informar o email do aluno. */}
                    <input
                        placeholder="Email"
                        className="input-filtro"
                        value={email}
                        onChange={e=> setEmail(e.target.value)}
                    />

                    {/* Campo utilizado para informar a idade do aluno. */}
                    <input
                        placeholder="Idade"
                        className="input-filtro"
                        value={idade}
                        onChange={e=> setIdade(e.target.value)}
                    />

                    {/* 
                        Botão que envia o formulário.
                        Se alunoId for 0, mostra "Incluir".
                        Caso contrário, mostra "Atualizar".
                    */}
                    <button className="button" type="submit">
                        {alunoId === '0'
                            ? 'Incluir'
                            : 'Atualizar'}
                    </button>
                </form>
            </div>
        </div>
    )

}