using System.ComponentModel.DataAnnotations;

namespace AlunosApi.Domain.Entities
{
    public class Aluno
    {
        [Key]
        public int Id { get; set; }

        [Required]
        [StringLength(80, ErrorMessage = "O nome não pode exceder 80 caracteres.")]
        public string Nome { get; set; }

        [Required]
        [EmailAddress(ErrorMessage = "O email fornecido não é válido.")]
        [StringLength(100, ErrorMessage = "O email não pode exceder 100 caracteres.")]
        public string Email { get; set; }

        [Required]
        [Range(0, 150, ErrorMessage = "A idade deve ser um valor entre 0 e 150.")]
        public int Idade { get; set; }
    }
}
