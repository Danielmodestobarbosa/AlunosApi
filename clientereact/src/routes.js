// Importa o React.
import React from "react";

// Importa os componentes responsáveis pelo sistema de rotas.
// BrowserRouter: habilita o roteamento no navegador.
// Route: representa uma rota individual.
// Routes: agrupa todas as rotas da aplicação.
import {BrowserRouter, Route, Routes} from 'react-router-dom';

// Importa a página de Login.
import Login from './pages/Login';

// Importa a página que lista os alunos.
import Alunos from './pages/Alunos';

// Importa a página utilizada para incluir ou atualizar um aluno.
import NovoAluno from './pages/NovoAluno';


// Cria e exporta o componente responsável pelas rotas da aplicação.
export default function AppRoutes(){

    return (

        // BrowserRouter permite que o React Router
        // controle a navegação através da URL.
        <BrowserRouter>

            // Routes é o componente que contém
            // todas as rotas disponíveis.
            <Routes>

                // Quando a URL for "/",
                // será exibida a página Login.
                <Route path="/" element={<Login/>}></Route>

                // Quando a URL for "/alunos",
                // será exibida a página Alunos.
                <Route path="/alunos" element={<Alunos/>}></Route>

                // Quando a URL for "/aluno/novo/algumId",
                // será exibida a página NovoAluno.
                //
                // ":alunoId" é um parâmetro da URL.
                // O valor dele pode ser acessado dentro
                // do componente NovoAluno através do useParams().
                <Route path="/aluno/novo/:alunoId" element={<NovoAluno/>}></Route>

            </Routes>

        </BrowserRouter>        

    )

}