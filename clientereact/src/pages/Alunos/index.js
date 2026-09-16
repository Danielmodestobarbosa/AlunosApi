// Importa o React e os hooks useState e useEffect
import React, {useState, useEffect} from 'react';

// Importa o Link para criar links entre páginas
// e o useNavigate para realizar navegação pelo código
import {Link, useNavigate} from 'react-router-dom';

// Importa os estilos CSS da página
import './styles.css';

// Importa a configuração da API
import api from '../../services/api'

// Importa a imagem utilizada na página
import LogoCadastro from '..//../assets/Cadastro.png'

// Importa os ícones utilizados na página
import {FiEdit, FiUserX, FiXCircle} from 'react-icons/fi';


export default function Alunos(){

    // Cria o estado que armazenará a lista de alunos
    const [alunos, setAlunos] = useState([]);

    // Recupera o email que foi armazenado no localStorage durante o login
    const email = localStorage.getItem('email');

    // Recupera o token JWT armazenado no localStorage
    const token = localStorage.getItem('token');

    // Cria o estado que armazenará o texto digitado no campo de pesquisa
    const[searchInput, setSearchInput] = useState('');

    // Cria o estado que armazenará os alunos filtrados
    const [filtro, setFiltro] = useState([]);

    // Cria a função utilizada para navegar entre as páginas
    const navigate = useNavigate();

    // Cria o objeto de autorização que será enviado para a API
    const authorization = {

    headers: {

        // Envia o token JWT no cabeçalho da requisição
        Authorization: `Bearer ${token}`

    }

    };


    // Executa o código quando o componente é carregado
    // e quando o token for alterado
    useEffect(() => {

    // Faz uma requisição GET para buscar os alunos na API
    api.get('api/alunos', authorization)

        // Executa quando a API retorna os dados com sucesso
        .then(response => {

            // Mostra no console os dados recebidos
            console.log("Dados recebidos:", response.data);

            // Armazena os alunos recebidos no estado principal
            setAlunos(response.data);

            // Armazena os mesmos alunos no estado utilizado pelo filtro
            setFiltro(response.data);

        })

        // Executa caso aconteça algum erro na requisição
        .catch(error => {

            // Mostra o erro no console
            console.log("Erro:", error);

            // Mostra o status HTTP retornado pela API
            console.log("Status:", error.response?.status);

        });

        // Define token como dependência do useEffect
        }, [token]);


    // Função responsável por realizar o logout
    async function logout(){

        try{

            // Remove os dados armazenados no localStorage
            localStorage.clear();

            // Volta para a página inicial
            navigate('/');

        }catch(err){

            // Mostra uma mensagem caso aconteça algum erro
            alert("Não foi possível realizar o logout" + err)    

        }

    }    


    // Função responsável por abrir a página de edição do aluno
    // Recebe o ID do aluno como parâmetro
    async function editAluno(id) {

        try{

            // Navega para a página de edição
            // O ID é enviado através da URL
            navigate(`/aluno/novo/${id}`)

        }catch(err){

            // Mostra uma mensagem caso aconteça algum erro
            alert("Não foi possível editar o aluno")

        }

    }


    // Função responsável por realizar a pesquisa dos alunos
    // searchValue recebe o texto digitado pelo usuário
    const searchAlunos = (searchValue) => {

        // Atualiza o estado com o texto pesquisado
        setSearchInput(searchValue);

        // Verifica se o campo de pesquisa não está vazio
        if(searchValue !== ''){

            // Filtra os alunos de acordo com o texto pesquisado
            const dadosFiltrados = alunos.filter((item) => {

                // Pega os valores do objeto aluno,
                // transforma em texto e verifica se contém
                // o valor digitado pelo usuário
                return Object.values(item).join('').toLowerCase().includes(searchValue.toLowerCase())

            });

            // Atualiza o estado com os alunos encontrados
            setFiltro(dadosFiltrados);

        }else{

            // Caso o campo esteja vazio,
            // mostra novamente todos os alunos
            setFiltro(alunos);

        }

    }

    // Função responsável por excluir um aluno
    // Recebe o ID do aluno que será excluído
    async function deleteAluno(id) {

    try {

        // Abre uma confirmação antes de excluir o aluno
        if (window.confirm('Deseja deletar o aluno de id = ' + id + '?')) {

            // Envia uma requisição DELETE para a API
            // passando o ID do aluno na URL e o token de autorização
            await api.delete(`api/alunos/${id}`, authorization);

            // Cria uma nova lista sem o aluno que foi excluído
            const alunosAtualizados = alunos.filter(

                // Mantém somente os alunos cujo ID seja diferente do ID excluído
                aluno => aluno.id !== id

            );

            // Atualiza a lista principal de alunos
            setAlunos(alunosAtualizados);

            // Atualiza também a lista utilizada pelo filtro
            setFiltro(alunosAtualizados);

        }

    } catch (err) {

        // Mostra o erro no console
        console.log(err);

        // Mostra uma mensagem informando que a exclusão falhou
        alert('Não foi possível excluir o aluno');

    }

    }

    // Retorna a estrutura visual da página
    return (

        <div className="aluno-container">

            {/* Cabeçalho da página */}
            <header>

                {/* Exibe a imagem/logo da página */}
                <img src={LogoCadastro} alt="Cadastro"/>

                {/* Exibe a mensagem de boas-vindas e o email do usuário */}
                <span>
                    Bem-Vindo, <strong>{email}</strong>
                </span>

                {/* Link utilizado para cadastrar um novo aluno
                    O ID 0 representa um novo cadastro */}
                <Link className="button" to="/aluno/novo/0">
                    Novo Aluno
                </Link>

                {/* Botão responsável por realizar o logout */}
                <button type="button" onClick={logout}>

                    {/* Ícone utilizado no botão de logout */}
                    <FiXCircle size={35} color="#17202a"/>

                </button>

            </header>


            {/* Formulário utilizado para realizar o filtro */}
            <form>

                {/* Campo onde o usuário digita o texto da pesquisa */}
                <input
                    type='text'
                    placeholder='Filtrar por nome...'
                    className='input-filtro'
                    onChange={(e) => searchAlunos(e.target.value)}
                />

            </form>


            {/* Título da lista de alunos */}
            <h1>Relação de Alunos</h1>


            {/* Verifica se o texto pesquisado possui mais de um caractere */}
            {searchInput.length > 1 ? (

            <ul>

                {/* Percorre a lista de alunos filtrados */}
                {filtro.map(aluno=>(

                    // Cada aluno recebe um elemento li
                    // e o key utiliza o ID para identificar o elemento
                    <li key={aluno.id}>

                    {/* Exibe o nome do aluno */}
                    <b>Nome:</b>{aluno.nome}<br></br>      

                    {/* Exibe o email do aluno */}
                    <b>Email:</b>{aluno.email}<br></br> 

                    {/* Exibe a idade do aluno */}
                    <b>Idade:</b>{aluno.idade}<br></br>   

                    {/* Botão responsável por editar o aluno */}
                    <button onClick={()=>editAluno(aluno.id)} type="button">

                        {/* Ícone utilizado para edição */}
                        <FiEdit size={25} color="#17202a"/>

                    </button>

                    {/* Botão responsável por excluir o aluno */}
                    <button onClick={()=>deleteAluno(aluno.id)} type="button">

                        {/* Ícone utilizado para exclusão */}
                        <FiUserX size={25} color="#17202a"/>

                    </button>

                    </li>

                ))}

            </ul>

            ) : (

            <ul>

                {/* Percorre a lista de alunos filtrados */}
                {filtro.map(aluno=>(

                    // Cada aluno recebe um elemento li
                    <li key={aluno.id}>

                    {/* Exibe o nome do aluno */}
                    <b>Nome:</b>{aluno.nome}<br></br>      

                    {/* Exibe o email do aluno */}
                    <b>Email:</b>{aluno.email}<br></br> 

                    {/* Exibe a idade do aluno */}
                    <b>Idade:</b>{aluno.idade}<br></br>   

                    {/* Botão responsável por editar o aluno */}
                    <button onClick={()=>editAluno(aluno.id)} type="button">

                        {/* Ícone utilizado para edição */}
                        <FiEdit size={25} color="#17202a"/>

                    </button>

                    {/* Botão responsável por excluir o aluno */}
                    <button onClick={()=>deleteAluno(aluno.id)} type="button">

                        {/* Ícone utilizado para exclusão */}
                        <FiUserX size={25} color="#17202a"/>

                    </button>

                    </li>

                ))}

            </ul>    

            )}

        </div>

    )

}