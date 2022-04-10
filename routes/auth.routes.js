const {Router} = require('express')
const bcrypt = require('bcryptjs')
const {check, validationResult} = require('express-validator')
const User = require('../models/User')
const router =Router()

// /api/auth/register
router.post('/register',
    [
        check('email','incorect email').isEmail(),
        check('password','minimal size of a password must at least 6 simbols').isLength({min:6})
    ],
    async (req, res) =>{
    try{
        const errors = validationResult(req)
        if(!errors.isEmpty()){
            return res.status(400).json({
                errors:errors.array(),
                message:'Wrong inputs'})
        }

        const {email,password} = req.body
        const candidate = await User.findOne({email:email})
        if (candidate){
            return res.status(400).json({message:'This user already exist'})
        }
        const hashedPassword= await bcrypt.hash(password, 12)
        const user =new User({email:email,password:hashedPassword})
        await user.save()
        res.status(201).json({message:'user was created'})
    } catch(e){
        res.status(500).json({message:'something went wrong please try again'})
    }
})

// /api/auth/login
router.post('/login', async (req, res) =>{

})


module.exports =router