import { connection } from './config/dbconfig'
import { Regiones } from './interfaces/regiones';
import { Profile, Usuario } from './interfaces/usuario'
import { Producto,ProductoPedido} from './interfaces/producto'
import { Pedido} from './interfaces/pedido'
import { nextTick } from 'process';

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
/* EXPRESS SESSIONS*/
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

app.post('/admin',async(req:any,res:any)=>{    
    const email = req.body._email
    const password = req.body._password
    console.log(email,password);
    const sql = 'SELECT email, contrasena FROM administrador WHERE email = ?'    

    if (email && password) {

        await connection.query(sql,email, function(error:any, results:any, fields:any) {            
			
            if (results.length > 0) {
                
                bcrypt.compare(password,results[0].contrasena,(err:any,match:any)=>{
                    
                    if(match){
                    
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
                            "error":"Contraseña erronea"            
                        })

                    }
                })
			} else {
				res.send({                 
                    "code":204,                 
                    "error":"Email no encontrado"            
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

app.post('/eliminarUsuario',async(req:any,res:any)=>{   
    const idUsuario= req.body.id
    const sql = 'DELETE FROM usuario WHERE idUsuario = ?'

    await connection.query(sql,idUsuario,(error:any,results:any)=>{
        if (error) throw error;
        res.send({
            "code":201,                 
            "message":"Usuario  eliminado correctamente"  
        })
    })

})

app.post('/eliminarProductoPedido',async(req:any,res:any)=>{
    const idProductoPedido = req.body.id
    
    const sql = 'DELETE FROM productopedido WHERE idProductoPedido = ?'

    await connection.query(sql,idProductoPedido,(error:any,results:any)=>{
        if (error) throw error;
        res.send({
            "code":201,                 
            "message":"Producto en pedido eliminado exitosamente"  
        })
    })

})

app.get('/obtenerPedidos',async(req:any,res:any)=>{
    const sql = 'SELECT * FROM pedido INNER JOIN productopedido ON pedido.idPedido = productopedido.idPedido'
    connection.query(sql,(error:any,results:any)=>{
        if (error) throw error;
        if (results.length > 0){          
            res.send(results)
        }else{
            res.send({
                "code":204,                 
                "error":"No hay resultados"  
            })
        }
    })
})

app.post('/verificarComentario',(req:any,res:any)=>{    
    const token = req.body.tokenValue
    const email = jwt.verify(token,'secretKey')

    const sql = 'SELECT COUNT(idComentario) as contador FROM comentario WHERE idUsuario = (SELECT idUsuario FROM usuario WHERE email = ?) AND idProducto = ?'

    connection.query(sql,[email._id,req.body.idProducto],(error:any,results:any)=>{
        if(error) throw error
        if(results.length>0){
            if(results[0].contador != 0){
                res.send({
                    "code":200,                 
                    "hasComment":"true"
                })
            }else{
                res.send({
                    "code":200,                 
                    "hasComment":"false"  
                })
            } 
        }
    })
})

app.post('/guardarPedido',async(req:any,res:any)=>{
    let dataToSave:Pedido = req.body;
    const email = jwt.verify(dataToSave.token,'secretKey');
    const sqlEmail = 'SELECT idUsuario FROM usuario WHERE email = ?';
    const sqlPedido = 'INSERT INTO pedido (nombre,apellido,rut,direccion,region,comuna,idUsuario) VALUES (?,?,?,?,?,?,?)';
    const sqlUltimoPedido= 'SELECT MAX(idPedido) as id FROM pedido'
    const sqlProductoPedido = 'INSERT INTO productopedido (idProducto,idPedido,cantidadProductos) VALUES(?,?,?)';
    const sqlUpdateStock = 'UPDATE producto SET stock = (SELECT stock from producto WHERE idProducto = ?)-? WHERE idProducto = ? AND idProducto > 0'
    let idUsuario ='';
    let idPedido = '';

    connection.query(sqlEmail,email._id, async(error:any,results:any)=>{
        if (error) throw error;
        if (results.length > 0){
            idUsuario=results[0].idUsuario
            await connection.query(sqlPedido,[dataToSave.nombreEntrega,dataToSave.apellidoEntrega,dataToSave.rutEntrega,dataToSave.direccionEntrega,dataToSave.regionEntrega,dataToSave.comunaEntrega,idUsuario],async(error:any,results:any)=>{
                if (error) throw error;
                await connection.query(sqlUltimoPedido,async(error:any,results:any)=>{
                    if (error) throw error;
                    if (results.length>0 || !null){
                        idPedido=results[0].id                            
                        dataToSave.listaProductos.forEach(async(item)=>{
                            connection.query(sqlUpdateStock,[item.producto.idProducto,item.cantidad,item.producto.idProducto],async(error:any,results:any)=>{
                                if(error){
                                    res.send({
                                        "code":204,                 
                                        "error":"No hay resultados"  
                                    })
                                }else{
                                    await connection.query(sqlProductoPedido,[item.producto.idProducto,idPedido,item.cantidad],(error:any,results:any)=>{
                                        if(error) throw error;
                                    })
                                }
                               
                            })
                            
                        })
                        res.send({
                            "code":200,
                            "result":'Datos insertados correctamente'
                        });
                    }else{
                        res.send({
                            "code":204,                 
                            "error":"No hay resultados"  
                        })
                    }  
                })          
            })
        }else{
            res.send({
                "code":204,                 
                "error":"No hay resultados"  
            })
        }
    })
})

app.post('/getUserId',async(req:any,res:any)=>{
    const token = req.body.token
    const sql = 'SELECT idUsuario FROM usuario WHERE email = ?'
    const email = jwt.verify(token,'secretKey')
    
    await connection.query(sql,email._id,(error:any,results:any)=>{
        if (error) throw error;
        if (results.length > 0){
            const id = results[0].idUsuario
            res.send({
                "code":200,
                "result":id
            });

        }else{
            res.send({
                "code":204,                 
                "error":"No hay resultados"  
            })
        }
    })
})

app.get ('/getUsers',async(req:any,res:any)=>{
    const adminToken = req.body.token
    const sql = 'SELECT idUsuario,nombres,apellidos,rut,email,direccion,region,comuna FROM usuario'
    
    let userData:Profile;
    await connection.query(sql,(error:any,results:any)=>{
        if (error) throw error;
        if (results.length > 0){
            res.send(results)
        }else{
            res.send({
                "code":204,
                "error":"No hay resultados"
            })
        }
    })
})

app.post('/getUserData' , async(req:any,res:any)=>{   
    const token = req.body.token
    const sqlEmail = 'SELECT nombres,apellidos,rut,direccion,region,comuna,email FROM usuario WHERE email = ?';
    const email = jwt.verify(token,'secretKey')
    let userData:Profile;
    await connection.query(sqlEmail,email._id,(error:any,results:any)=>{
        if (error) throw error;
        if (results.length > 0){
            userData=results[0];          
            res.send(userData)
        }else{
            res.send({                 
                "code":204,                 
                "error":"No hay resultados"            
            })
        }    
    })  
})

app.post('/loadComments', async(req:any,res:any)=>{
    console.log(req.body);
    
    const idProducto = req.body.id
    const sql = 'SELECT comentario,valoracion,nombres FROM comentario INNER JOIN usuario ON comentario.idUsuario = usuario.idUsuario WHERE comentario.idProducto = ?'
    
    connection.query(sql,idProducto,(error:any,results:any)=>{
        if (error) throw error;
        if (results.length > 0){           
            res.json(results);
        }else{
            res.send({                 
                "code":204,                 
                "error":"No hay resultados"            
            })
        } 
    });
});

app.post('/saveComment',async(req:any,res:any)=>{

    const { token , comment, valoration} = req.body;
    const productId= req.body.idProducto
   
    const sqlEmail = 'SELECT idUsuario FROM usuario WHERE email = ?';
    const email = jwt.verify(token,'secretKey');
    
    const sqlComment = 'INSERT INTO comentario (comentario, valoracion, idProducto, idUsuario) VALUES(?,?,?,?)';
    let userId;

    const sqlSelVal = 'SELECT valoracion FROM comentario WHERE idProducto = ?';
    const sqlUpdateVal = 'UPDATE producto SET valoracion = ? WHERE producto.idProducto = ?';
    let suma = 0;
    let promedio = 0;

    await connection.query(sqlEmail,email._id,async(error:any,results:any)=>{
        if (error) throw error;
        if (results.length > 0){
           userId = results[0].idUsuario
           
            await connection.query(sqlComment,[comment,valoration,productId,userId],async(error:any,results:any)=>{
                if (error) throw error;
                
                await connection.query(sqlSelVal,productId,async(error:any,results:any)=>{
                    let i = 0

                    for(i=0;i<results.length;i++){
                        suma = suma + results[i].valoracion
                        
                    }     

                    promedio = suma/results.length                    
                    await connection.query(sqlUpdateVal,[promedio,productId],async(error:any,results:any)=>{
                        if(error) throw error
                        res.send({                 
                            "code":201,                 
                            "response":"Comentario Guardado"            
                        })  
                    })
                })
            })
        }else{
            res.send({                 
                "code":204,                 
                "error":"fallo en  validar email"            
            })
        }    
    })
})

app.post('/passRecovery', async(req:any,res:any)=>{
    console.log(req.body);
    
    const token = req.body.recoveryToken
    const password = req.body.recoveryPassword
 
    const sql = ' UPDATE usuario SET contrasena= ? WHERE email = ? '
    const hashedPassword:string = bcrypt.hashSync(password, bcrypt.genSaltSync(10));
    const email = jwt.verify(token,'secretKey')

    if(token ==''){
        res.send({                 
            "code":204,                 
            "error":"token error"            
        })      
    }else{
        await connection.query(sql,[hashedPassword,email._id],(error:any,results:any)=>{
            if (error) throw error;  
            res.send({                 
                "code":201,                 
                "error":"Contraseña modificada con exito"            
            }) 
        })
    } 
})

app.post('/passReset/:email',async(req:any,res:any)=>{

    const sql = 'SELECT email FROM usuario WHERE email = ?'
    
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


app.post('/login', async (req:any,res:any)=>{

    const email = req.body._email
    const password = req.body._password
    
    const sql = 'SELECT email, contrasena FROM usuario WHERE email = ?'    

    if (email && password) {

        await connection.query(sql,email, function(error:any, results:any, fields:any) {            
			
            if (results.length > 0) {
                
                const comparison =  bcrypt.compare(password,results[0].contrasena,(err:any,match:any)=>{
                    
                    if(match){
                    
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
                            "error":"Contraseña erronea"            
                        })
                    }  

                })

			} else {
				res.send({                 
                    "code":204,                 
                    "error":"Email no encontrado"            
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
    
    
    let prodBusqueda = "%"+req.params.nombreProducto+"%";
    const sql = "SELECT idProducto, nombreProducto, descripcion, precio, stock,valoracion FROM producto WHERE nombreProducto LIKE ? "
    
    await connection.query(sql,prodBusqueda,(error:any,results:any)=>{
        if (error) throw error;
        if (results.length > 0){
            res.json(results)
            
        }else{
            res.send('No hay resultados')
        }
    })
})

app.post('/registrar', async(req:any,res:any)=>{
    const sql = 'SELECT COUNT(idUsuario) as contador FROM usuario WHERE email = ?'
    
    if(req.body===''){
        res.status(500).json({ message: 'ERROR AL REGISTRAR' });
    }else{        
        const newUser:Usuario= req.body;        
        if(validarDatos(newUser)){
            if(verificarRut(newUser.rut)){
                if(verificarContrasena(newUser.password)){
                    connection.query(sql,newUser.email,async(error:any,results:any)=>{
                        if (error) throw error;
                        if (results[0].contador == 0){
                            const hashedPassword:string = bcrypt.hashSync(newUser.password, bcrypt.genSaltSync(10));
                            const sql = 'INSERT INTO usuario (nombres, apellidos, rut, email, region, comuna, direccion, contrasena) VALUES(?,?,?,?,?,?,?,?)'   
                                    
                            await connection.query(sql,[newUser.nombres,newUser.apellidos,newUser.rut,newUser.email,newUser.region,newUser.comuna,newUser.direccion, hashedPassword],(error:any,results:any)=>{
                                if (error) if (error) throw error;
                                console.log("1 usuario registrado");
                                const token = jwt.sign({_id: newUser.password},'secretKey')
                                res.send({                 
                                    "code":201,                 
                                    "error":"Registrado con exito"            
                                })
                            })
                        }else{
                            res.send({                 
                                "code":204,                 
                                "error":"USUARIO YA REGISTRADO"            
                            })
                        }
                    })        
                }else{
                    res.send({                 
                        "code":204,                 
                        "error":"Contraseña invalida"            
                    })
                }  
                

            }else{
                res.send({                 
                    "code":204,                 
                    "error":"RUT INVALIDO"            
                })
            }
        }else{
            res.send({                 
                "code":204,                 
                "error":"error al registrar el usuario, verifique los campos"            
            })
        }
 
        
    }
    
})

app.get('/categoria/:categoria', async(req:any, res:any)=>{
    let categoria=req.params.categoria;
    const sql = 'SELECT idProducto, nombreProducto, descripcion, precio, stock,valoracion FROM producto INNER JOIN categoria ON categoria.nombreCategoria = ? WHERE producto.idCategoria = categoria.idCategoria'
    
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

function validarDatos(newUser:Usuario){  
    if(newUser.nombres === ''){
        return false
    }
    if(newUser.apellidos === ''){
        return false
    }
    if(newUser.direccion === ''){
        return false
    }
    if(newUser.comuna === ''){
        return false
    }
    if(newUser.region === ''){
        return false
    }

    return true
}

function verificarContrasena(password:string){
    if( password.length < 8 || password === ''){
        return false
    }else{
        return true
    }
}

function verificarRut(rut:string){
    if (rut === ''){
        return false
    }else{
        return digitoVerificador(rut)
    }
}

function  digitoVerificador(rut:string){
    const serie:number[]=[2,3,4,5,6,7,2,3];
    const [numRut,numVerificador] = rut.split("-");
    const numeros:string[] =numRut.split("")
    let suma:number= 0
    numeros.reverse().map(function (num, i) {
        suma += Number(num) * serie[i];
    });

    const module = suma % 11;
    const Verificador = 11 - module;

    const k = "k";
    const zero = "0";

    if (Verificador == Number(numVerificador)) {
        return true
    } else if (Verificador == 11) {
        if (numVerificador != zero) {
            
            return false
        } else {
            return true
        }
    } else if (Verificador == 10) {
        if (numVerificador != k) {
            
            return false
        } else {
            return true
        }
    } else {
        
        return false
    }
}
