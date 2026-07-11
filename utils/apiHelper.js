class ApiHelper {
  constructor(request) {
    this.request = request;
  }

  async createUser(payload) {
    const res = await this.request.post('/api/users', { data: payload });
    return res.json();
  }

  async deleteUser(id) {
    await this.request.delete(`/api/users/${id}`);
  }

  async getUser(id) {
    const res = await this.request.get(`/api/users/${id}`);
    return res.json();
  }
}

module.exports = { ApiHelper };
