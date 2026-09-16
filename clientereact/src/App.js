// Importa o React para permitir a utilização de JSX no componente.
import React from 'react';

// Importa o arquivo CSS global da aplicação.
import './Global.css'

// Importa o componente responsável pelas rotas da aplicação.
import AppRoutes from './routes';


// Cria e exporta o componente principal da aplicação.
export default function App() {

  // Retorna o conteúdo que será exibido pela aplicação.
  return (

    // Renderiza o componente AppRoutes.
    // Ele é responsável por controlar as páginas e rotas da aplicação.
    <AppRoutes/>

  );

}