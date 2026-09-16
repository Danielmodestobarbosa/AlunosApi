using AlunosApi.Domain.Entities;
using AlunosApi.Infraestructure.Context;
using Microsoft.EntityFrameworkCore;

namespace AlunosApi.Application.Services
{
    public class AlunoService : IAlunoService
    {

        private readonly AppDbContext _context;

        public AlunoService(AppDbContext context)
        {
            _context = context;
        }

        public async Task<IEnumerable<Aluno>> GetAlunos()
        {
            return await _context.Aluno.ToListAsync();
        }

        public async Task<IEnumerable<Aluno>> GetAlunosByName(string nome)
        {
            IEnumerable<Aluno> alunos;
            if(!string.IsNullOrWhiteSpace(nome))
            {
                alunos = await _context.Aluno.Where(n => n.Nome.Contains(nome)).ToListAsync();

            }
            else
            {
                alunos = await GetAlunos();
            }
            return alunos;
        }

        public async Task<Aluno> GetAluno(int id)
        {
            var aluno = await _context.Aluno.FindAsync(id);
            return aluno;
        }

        public async Task CreateAluno(Aluno aluno)
        {
            _context.Aluno.Add(aluno);
            await _context.SaveChangesAsync();
        }

        public async Task DeleteAluno(Aluno aluno)
        {
            _context.Aluno.Remove(aluno);
            await _context.SaveChangesAsync();
        }

        public async Task UpdateAluno(Aluno aluno)
        {
            _context.Entry(aluno).State = EntityState.Modified;
            await _context.SaveChangesAsync();
        }
    }
}
