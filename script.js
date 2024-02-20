class User {
    constructor(username, avatarUrl) {
      this.username = username;
      this.avatarUrl = avatarUrl;
    }
  }
  
class GitHubAPI {
    constructor() {
      this.baseUrl = 'https://api.github.com/users/';
    }
  
    async fetchUser(username) {
      const response = await fetch(`${this.baseUrl}${username}`);
      const data = await response.json();
      return new User(data.login, data.avatar_url);
    }
}
  
class Spinner {
    constructor(targetElement) {
      this.targetElement = targetElement;
      this.spinnerElement = document.createElement('div');
      this.spinnerElement.className = 'spinner';
      this.targetElement.appendChild(this.spinnerElement);
    }
  
    show() {
      this.spinnerElement.style.display = 'block';
    }
  
    hide() {
      this.spinnerElement.style.display = 'none';
    }
}
  
class GitHubFinderApp {
    constructor() {
      this.inputElement = document.getElementById('username');
      this.searchForm = document.getElementById('search-form');
      this.resultContainer = document.getElementById('result-container');
      this.gitHubAPI = new GitHubAPI();
  
      this.searchForm.addEventListener('submit', this.searchUser.bind(this));
    }
  
    async searchUser(event) {
      event.preventDefault();
      const username = this.inputElement.value;
      if (!username) return;
      try {
        const user = await this.gitHubAPI.fetchUser(username);
        this.displayUser(user);
      } catch (error) {
        console.error('Error fetching user:', error);
        this.displayError('사용자를 찾을 수 없습니다.');
      }
    }
  
    displayUser(user) {
        this.resultContainer.innerHTML = `
          <a href="https://github.com/${user.username}" target="_blank">
            <img src="${user.avatarUrl}" alt="${user.username}" class="avatar">
            <p class="username">@${user.username}</p>
          </a>
        `;
      }
      
  
    displayError(message) {
      this.resultContainer.innerHTML = `<p class="error">${message}</p>`;
    }
  }
  
  const app = new GitHubFinderApp();
  