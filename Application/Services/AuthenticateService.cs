using Microsoft.AspNetCore.Identity;


namespace AlunosApi.Application.Services
{
    public class AuthenticateService : IAuthenticate
    {
        //Login do usuário
        private readonly SignInManager<IdentityUser> _signInManager;

        //Registro do usuário
        private readonly UserManager<IdentityUser> _userManager;

        public AuthenticateService(SignInManager<IdentityUser> signInManager,
                                   UserManager<IdentityUser> userManager)
        {
            _signInManager = signInManager;
            _userManager = userManager;
        }

        public async Task<bool> Authenticate(string email, string password)
        {
            //Aqui estou usando o SignInManager para autenticar o usuário com base no email e senha fornecidos.
            //O método PasswordSignInAsync retorna um resultado que indica se a autenticação foi bem-sucedida ou não.
            //O lockoutOnFailure: false significa que não queremos bloquear a conta do usuário após várias tentativas de login malsucedidas.
            var result = await _signInManager.PasswordSignInAsync(email, password,
                false, lockoutOnFailure: false);

            return result.Succeeded;
        }

        public async Task Logout()
        {
            await _signInManager.SignOutAsync();
        }

        public async Task<bool> RegisterUser(string email, string password)
        {
            var appUser = new IdentityUser
            {
                UserName = email,
                Email = email,
            };

            var result = await _userManager.CreateAsync(appUser, password);

            if (result.Succeeded)
            {
                await _signInManager.SignInAsync(appUser, isPersistent: false);
            }
            return result.Succeeded;
        }
    }
}
