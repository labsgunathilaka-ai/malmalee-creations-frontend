
const admins = [
  {
    id: 1,
    email: 'admin@gmail.com',
    password: 'admin123',
    name: 'Super Admin'
  }
];

class Admin {
  static async findByEmail(email) {
    
    return admins.find(admin => admin.email === email);
  }
}

module.exports = Admin;