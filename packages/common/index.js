const Yup = require('yup');

const formSchema = Yup.object({
    username: Yup.string().required('Username required').min(6, 'Username must be six characters or more.').max(28, 'Username too long.'),
    password: Yup.string().required('Password required').min(6, 'Password must be six characters or more.').max(28, 'Password too long.'),
})

module.exports = { formSchema };