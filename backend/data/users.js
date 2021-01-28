import bcrypt from 'bcryptjs'

const users = [
    {
        name: 'Admin User',
        email: 'admin@example.com',
        password: bcrypt.hashSync('123456', 10),
        isAdmin: true
    },
    {
        name: 'Joy Bordhen',
        email: 'Joy@example.com',
        password: bcrypt.hashSync('123456', 10)
    },
    {
        name: 'Tarikul Islam',
        email: 'Tarikul@example.com',
        password: bcrypt.hashSync('123456', 10)
    },
    {
        name: 'Tahmid Al Sakib',
        email: 'Tahmid@example.com',
        password: bcrypt.hashSync('123456', 10)
    }
]

export default users
