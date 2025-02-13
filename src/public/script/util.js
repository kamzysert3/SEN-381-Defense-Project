const profileUserName = document.getElementById('profileUserName');
const user = JSON.parse(sessionStorage.getItem('user'));
profileUserName.textContent = CapitalizeUsername(user.username);

function CapitalizeUsername(params) {
    const names = params.split(' ');
    const capitalizedNames = names.map(name => {
        return name.charAt(0).toUpperCase() + name.slice(1);
    });
    return capitalizedNames.join(' ');
}