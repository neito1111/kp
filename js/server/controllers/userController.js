
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')
const uuid = require('uuid')
const path = require('path');
const {User, Basket} = require('../models/models')

const generateJwt = (id, email, role) => {
    return jwt.sign(
        {id, email, role},
        process.env.SECRET_KEY,
        {expiresIn: '24h'}
    )
}

class UserController {
    async registration(req, res, next) {
        const {email, password, name1,surname,role} = req.body
        if (!email || !password) {
            
            return res.status(400).json({ message: 'Некорректный email или password'});
        }
        const candidate = await User.findOne({where: {email}})
        if (candidate) {
            
            return res.status(400).json({ message: 'Пользователь с таким email уже существует'});
        }
        const hashPassword = await bcrypt.hash(password, 5)
        const user = await User.create({email, role,name1,surname, password: hashPassword})
        const token = generateJwt(user.id, user.email, user.role,user.name1,user.surname)
        return res.json({token})
    }

    async login(req, res, next) {
        const {email, password} = req.body
        const user = await User.findOne({where: {email}})
        if (!user) {
            
            return res.status(400).json({ message: 'Пользователь не найден'});
        }
        let comparePassword = bcrypt.compareSync(password, user.password)
        if (!comparePassword) {
            
            return res.status(400).json({ message:  'Указан неверный пароль'});
        }
        const token = generateJwt(user.id, user.email, user.role)
        return res.json({token})
        //return res.json({data: {id, email, role}});
    }
    async getInfoUser(req, res, next) {
        try {
            const users = await User.findAll(); // Получаем всех пользователей из базы данных
            if (!users || users.length === 0) {
                return res.status(404).json({ message: 'Пользователи не найдены' });
            }
            return res.json(users); // Отправляем данные в формате JSON
        } catch (err) {
            console.error('Ошибка при получении пользователей:', err);
            res.status(500).json({ message: 'Ошибка сервера' });
        }
    }
    

    async check(req, res, next) {
        const token = generateJwt(req.user.id, req.user.email, req.user.role)
        return res.json({token})
    }
    async me(req, res, next) {
        try {
            const {email, password} = req.query;
            const user = await User.findOne({where: {email}})
            if (!user) {
                return res.status(400).json({message: 'Пользователь не найден'});
            }
            let comparePassword = bcrypt.compareSync(password, user.password)
            if (!comparePassword) {
                return res.status(400).json({message: 'Указан неверный пароль'});
            }
            const {id, role,name1,surname,img} = user;
            return res.json({data: {id, email, role,name1,surname,img}});
        } catch (error) {
            return res.status(400).json({message: error.message});
        }
    }
    async logout(req, res, next) {
        try {
            return res.status(200).json({message: "Пользователь вышел из аккаунта."});
        } catch (error) {
            return res.status(400).json({message: error.message});
        }
    }
    async deleteUser(req ,res ,next){
        const {id}=req.body ;
        console.log(id);
        try{
            const user =await User.findOne({where:{id}});
            if (!user) {
                return res.status(404).json({ message: 'Пользователь не найден' });
            }
            await user.destroy();
            
             res.status(200).json({ message: 'Пользователь успешно удален' });
        }
        catch (err) {
            console.error(err);
            res.status(500).json({ message: 'Что-то пошло не так' });
        }
    }
    async userInfoById(req ,res ,next){
        const {id}=req.body ;
        console.log(req.body);
        try{
            const user =await User.findOne({where:{id}});
            if (!user) {
                return res.status(404).json({ message: 'Пользователь не найден' });
            }
           const { email,role,name1,surname,img} = user;
            return res.json({data: { email, role,name1,surname,img}});
        }
        catch (err) {
            console.error(err);
            res.status(500).json({ message: 'Что-то пошло не так' });
        }
    }

    async changePassword(req, res,) {
        const { email, oldPassword, newPassword } = req.body;

        try {
            const user = await User.findOne({where:{ email }});

            if (!user) {
                return res.status(404).json({ message: 'Пользователь не найден' });
            }

            const isPasswordValid = await bcrypt.compare(oldPassword, user.password);

            if (!isPasswordValid) {
                return res.status(401).json({ message: 'Неверный пароль' });
            }

            user.password = await bcrypt.hash(newPassword, 5)
            await user.save();

            res.status(200).json({ message: 'Пароль успешно изменен' });
        } catch (err) {
            console.error(err);
            res.status(500).json({ message: 'Что-то пошло не так' });
        }
    };
    async uploadAvatarIMG(req,res){
        console.log(1)
        try{
            
            const { email }=req.body;
            const {img} = req.files
            console.log(email)
            console.log(img)
        const user = await User.findOne({where:{ email }});
        console.log(2)
        let fileName = uuid.v4() + ".jpg"
        console.log(3);
        img.mv(path.resolve(__dirname, '..', 'static', fileName))
        console.log(4)
        user.img=fileName;
        console.log(5)
        await user.save();
        console.log(6)
        console.log(fileName)
        return res.status(200).json({ message: 'Аватар пользователя обновлен', fileName });
    }
    catch (e){
        return res.status(500).json({ message: e.message });
    }
        
    }
}


module.exports = new UserController()
