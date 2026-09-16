using AlunosApi.Application.Services;
using AlunosApi.Domain.Entities;
using Microsoft.AspNetCore.Authentication.JwtBearer;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;

namespace AlunosApi.Api.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    [Authorize(AuthenticationSchemes = JwtBearerDefaults.AuthenticationScheme)]
    public class AlunosController : ControllerBase
    {

        private readonly IAlunoService _alunoService;

        public AlunosController(IAlunoService alunoService)
        {
            _alunoService = alunoService;
        }

        [HttpGet]
        [ProducesResponseType(StatusCodes.Status200OK)]
        [ProducesResponseType(StatusCodes.Status500InternalServerError)]
        public async Task<ActionResult<IAsyncEnumerable<Aluno>>> GetAlunos()
        {
            try
            {
                var alunos = await _alunoService.GetAlunos();
                return Ok(alunos);
            }
            catch 
            {
                return StatusCode(StatusCodes.Status500InternalServerError, 
                                 "Erro ao obter alunos");  
            }
        }

        [HttpGet("AlunoPorNome")]
        [ProducesResponseType(StatusCodes.Status200OK)]
        [ProducesResponseType(StatusCodes.Status404NotFound)]
        [ProducesResponseType(StatusCodes.Status400BadRequest)]
        public async Task<ActionResult<IAsyncEnumerable<Aluno>>> GetAlunosByNome([FromQuery] string nome)
        {
            try
            {
                var alunos = await _alunoService.GetAlunosByName(nome);

                if(alunos == null) 
                    return NotFound($"Nenhum aluno encontrado com o nome: {nome}");

                return Ok(alunos);
            }
            catch
            {
                return StatusCode(StatusCodes.Status400BadRequest,
                                 "Erro ao obter alunos");
            }
        }

        [HttpGet("{id:int}", Name="GetAluno")]
        [ProducesResponseType(StatusCodes.Status200OK)]
        [ProducesResponseType(StatusCodes.Status404NotFound)]
        [ProducesResponseType(StatusCodes.Status400BadRequest)]
        public async Task<ActionResult<Aluno>> GetAluno (int id)
        {
            try
            {
                var aluno = await _alunoService.GetAluno(id);

                if(aluno == null) 
                    return NotFound($"Não existe aluno com id= {id}");

                return Ok(aluno);
            }
            catch 
            {
                return StatusCode(StatusCodes.Status400BadRequest,
                                 "Erro ao obter aluno");
            }
        }

        [HttpPost]
        public async Task<ActionResult> CreateAluno(Aluno aluno)
        {
            try
            {
                await _alunoService.CreateAluno(aluno);
                return CreatedAtRoute(nameof(GetAluno), new { id = aluno.Id }, aluno);
            }
            catch
            {
                return StatusCode(StatusCodes.Status500InternalServerError,
                                 "Erro ao criar aluno");
            }
        }

        [HttpPut("{id:int}")]
        public async Task<ActionResult> UpdateAluno (int id, [FromBody] Aluno aluno)
        {
            try
            {
                if(aluno.Id == id)
                {
                    await _alunoService.UpdateAluno(aluno);
                    return Ok(aluno);
                }
                else
                {
                    return BadRequest("O id do aluno não corresponde ao id da rota");
                }
            }
            catch 
            {
                return BadRequest("Erro ao atualizar aluno");

            }
        }

        [HttpDelete("{id}")]
        public async Task<ActionResult> DeleteAluno(int id)
        {
            try
            {
                var aluno = await _alunoService.GetAluno(id);

                if(aluno != null)
                {
                    await _alunoService.DeleteAluno(aluno);
                    return Ok($"Aluno com id= {id} deletado com sucesso");
                }
                else
                {
                    return NotFound($"Não existe aluno com id= {id}");
                }
            }
            catch
            {
                return BadRequest("Erro ao atualizar aluno");

            }
        }
    }
}
