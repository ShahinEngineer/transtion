export default{
    jwtSecret:{
        jwtSecret:process.env.JWT_SECURIT || 'somesecuritoken'
    },
    DB:{
        URI:process.env.MONGODB_RUL ||'mongodb://localhost/vidly',
        USER:process.env.MONGODB_USERS,
        PASSWORD:process.env.MONGODB_PASSWORD
        
    }
}