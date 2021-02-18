class GitHub {
  constructor() {
    this.client_id = '163dd9fb55070c5e9303';
    this.client_secret = '6b269f7df739e3ad514127c814d444023bc30403';
  }

  async getUser(user) {
    const profileResponse = await fetch(`https://api.github.com/users/${user}?client_id=${this.client_id}&client_secret=${this.client_secret}`);

    const profileData = await profileResponse.json();

    return profileData;
  }
}
