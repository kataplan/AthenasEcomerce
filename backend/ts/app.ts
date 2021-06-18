import { connection } from './config/dbconfig'
import { Regiones } from './interfaces/regiones';
import { Usuario } from './interfaces/usuario'

const bcrypt = require('bcryptjs');
const express = require('express');
const bodyParser = require('body-parser');
const app = express();
const fs = require('fs');
const cors = require('cors');
const hostname = 'localhost';
const port = '3000';
const jwt = require('jsonwebtoken')

/* NODEMAILER SERVICE*/
const nodemailer = require('nodemailer')


/* EXORESS SESSIONS*/
var session = require('express-session');

app.use(cors());

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

app.use(express.json());



app.use(session({
	secret: 'secret',
	resave: true,
	saveUninitialized: true
}));

/* Conexion con base de datos*/ 
connection.connect( (error:any)=>{
    if (error) throw error;
    console.log('Base de datos conectada')
})

app.post('/passRecovery',async(req:any,res:any)=>{
    console.log(req.body);
    
    //console.log(token,password);
    
})

app.post('/passReset/:email',async(req:any,res:any)=>{

    const sql = 'SELECT email FROM usuario WHERE email LIKE ?'
    
    if(req.params.email ==''){
        res.send({                 
            "code":204,                 
            "error":"Email inválido"            
        })      
    }else{
        await connection.query(sql,req.params.email,(error:any,results:any)=>{
            if (error) throw error;
            if (results.length > 0){
                mailer(req.params.email)
                res.status(201).json({ message: 'Email enviado con exito' });
            }else{
                res.send({                 
                    "code":404,                 
                    "error":"Email inválido"            
                })
            }
        
        })
    }
})

app.post('/api/:sessionToken', verificarToken, async(req:any,res:any)=>{
    
    res.send({                
        "code":200,                
        "success":"login successful", 
        "loginStatus":"true",
        "token": req.params.sessionToken                                  
    })
})


app.post('/login', async(req:any,res:any)=>{

    const email = req.body._email
    const sqlEmail = "%"+req.body._email+"%"
    const password = req.body._password

    const sql = 'SELECT email, contrasena FROM usuario WHERE email LIKE ?'    

    if (email && password) {

        await connection.query(sql,sqlEmail, function(error:any, results:any, fields:any) {            
			
            if (results.length > 0) {
                const comparison = bcrypt.compare(password,results[0].contrasena)
                if(comparison){
                    
                    req.session.loggedin = true;
				    req.session.username = email;
                    
                    const token = jwt.sign({_id: email},'secretKey')
                    
                    res.send({                
                        "code":200,                
                        "success":"login successful",                             
                        "userName": results[0].email,              
                        "token": token           
                    })
                    
                }else{
                    res.send({                 
                        "code":204,                 
                        "error":"Email and password does not match"            
                    })
                }
                
			} else {
				res.send({                 
                    "code":204,                 
                    "error":"Email and password does not match"            
                })
			}
			
		});
	} else {
		res.send({                 
            "code":204,                 
            "error":"Email and password does not match"            
        })
		
	}
})

app.get('/search/:nombreProducto', async(req:any, res:any)=>{
    console.log(req.body);
    
    let prodBusqueda = "%"+req.params.nombreProducto+"%";
    const sql = "SELECT idProducto, nombreProducto, descripcion, precio, stock, valoracion FROM producto WHERE nombreProducto LIKE ? "
    
    await connection.query(sql,prodBusqueda,(error:any,results:any)=>{
        if (error) throw error;
        if (results.length > 0){
            console.log(results)
            res.json(results)
            
        }else{
            res.send('No hay resultados')
        }
    
    })
})

app.post('/registrar', async(req:any,res:any)=>{
    if(req.body===''){
        res.status(500).json({ message: 'ERROR AL REGISTRAR' });
    }else{
        
        const newUser:Usuario= req.body;
        const hashedPassword:string = bcrypt.hashSync(newUser.password, bcrypt.genSaltSync(10));
        const sql = 'INSERT INTO usuario (nombres, apellidos, rut, email, region, comuna, direccion, contrasena) VALUES(?,?,?,?,?,?,?,?)'   
        await connection.query(sql,[newUser.nombres,newUser.apellidos,newUser.rut,newUser.email,newUser.region,newUser.comuna,newUser.direccion, hashedPassword],(error:any,results:any)=>{
            if (error) if (error) throw error;
            
            console.log("1 usuario registrado");
        })

        const token = jwt.sign({_id: newUser.password},'secretKey')
        res.status(201).json({ message: token }); 
        console.log(token);
    }
    
})

app.get('/categoria/:categoria', async(req:any, res:any)=>{
    let categoria=req.params.categoria;
    const sql = 'SELECT idProducto, nombreProducto, descripcion, precio, stock, valoracion FROM producto INNER JOIN categoria ON categoria.nombreCategoria = ? WHERE producto.idCategoria = categoria.idCategoria'
    
    await connection.query(sql,categoria,(error:any,results:any)=>{
        if (error) throw error;
        if (results.length > 0){
            res.json(results)
        }else{
            res.send('No hay resultados')
        }
    })
})

app.get('/regiones', async(req:any, res:any)=>{
    
    await fs.readFile('backend/database/regiones-comunas.json', 'utf8', (err: any, data: any) => {
        if (err) {
          console.log(`Error al leer el archivo:'${err}`);
        } else {
            const dataRegiones: Regiones = JSON.parse(data);
            res.send(dataRegiones)
        }
    });
})


app.get('/producto/:id', async(req: any, res: any) => {
    let id=req.params.id;
    const sql = 'SELECT * FROM producto WHERE idProducto = ?'
    await connection.query(sql,id,(error:any,results:any)=>{
        if (error) throw error;
        if (results.length > 0){
            res.json(results)
        }else{
            res.send('No hay resultados')
        }
    })
});
app.get('/producto/categoria/:id', async (req: any, res: any) => {
    let id=req.params.id;
    const sql = 'SELECT * FROM categoria WHERE idCategoria = ?'
    await connection.query(sql,id,(error:any,results:any)=>{
        if (error) throw error;
        if (results.length > 0){
            res.json(results)
        }else{
            res.send('No hay resultados')
        }
    })
});

app.listen(port, hostname, () => {
    console.log('SERVIDOR EJECUTÁNDOSE EN http://localhost:' + port);
});

function verificarToken(req:any,res:any,next:any){
    
    if(!req.params.sessionToken){
        return res.status(401).send('USTED NO TIENE AUTORIZACION PARA ESTAR AQUI');
    }

    const token = req.params.sessionToken
    
    if(token === 'null'){
        return res.status(401).send('USTED NO TIENE AUTORIZACION PARA ESTAR AQUI');
    }

    const payload = jwt.verify(token,'secretKey')
    req.userEmail = payload.email
    next()
}

async function mailer(email:string){
    console.log(email);
    const recovery_token = jwt.sign({_id: email},'secretKey')

    const mailOptions ={
        from:'athenasecommerce@gmail.com',
        to:`${email}`,
        subject:'Recuperar tu contraseña',
        html: '<h2>Click en el siguiente link para recuperar tu contraseña:</h2><button style="background-color: #008CBA;border: none;color: white;padding: 15px 32px;text-align: center;text-decoration: none;display: inline-block;font-size: 16px;margin: 4px 2px;cursor: pointer; " type="button"><a style="color: #ffffff; text-decoration: none;" href="http://localhost:4200/passwordRecovery/' + recovery_token + '">REINICIAR CONTRASEÑA</a></button>'
    };

    const transporter = nodemailer.createTransport({
        service: 'gmail',
        auth:{
            user: 'athenasecommerce@gmail.com',
            pass: '4th3n4s3c0mm3rc3*'
        }
    })

    transporter.sendMail(mailOptions,(err:any,info:any)=>{
        if(err){
            console.log(err);
        }else{
            console.log('Email enviado: ' + info.response);
        };
    });
    
}