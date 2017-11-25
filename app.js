const mysql = require('mysql');
const express = require('express');
const bodyParser = require('body-parser');

//ACCESS EXPRESS PROPERTY
let app = express();

//GESTOR DATABASE MYSQL
let conn = mysql.createConnection({
    host: "localhost", 
    user: "root", 
    password: "jm739721041307", 
    port: 3306, 
    database:"CrudBasico", 
    multipleStatements: true
});
//APERTURAMOS UNA CONEXION GLOBAL
conn.connect((err)=>{
    if(err) throw err;
    console.log('Conectado con base de datos');
});

//MODELO DE VISTAS
app.set('view engine', 'hbs');

//CARPETAS PUBLICAS
app.use(express.static('public'));

//PROCESAMIENTO DE DATOS
app.use(bodyParser.urlencoded({extended: false}));

//METODOS HTTP
app.get('/', (req, res)=>{
    conn.query('SELECT * FROM datosPersonales', (err, result)=>{
        if(err) throw err;
        res.render('index', {items: result});
    });
});
app.post('/createDoc', (req, res)=>{
    var items = {
        documento: req.body.ndoc,
        nombre: req.body.nom,
        apellido: req.body.ape,
        edad: req.body.edad,
        direccion: req.body.dir,
        telefono: req.body.tel,
        celular: req.body.cel,
        hobbie: req.body.hob
    };
    var sql = 'INSERT INTO datosPersonales(\
        documento, \
        nombre, \
        apellido, \
        edad, \
        direccion, \
        telefono, \
        celular, \
        hobbie\
    ) VALUES (\
        ' + items.documento + ',\
        "' + items.nombre + '",\
        "' + items.apellido + '",\
        ' + items.edad + ',\
        "' + items.direccion + '",\
        ' + items.telefono + ',\
        ' + items.celular + ',\
        "' + items.hobbie + '"\
    )';
    conn.query(sql, (err, result)=>{
        if(err) throw err;
        console.log('Datos insertados');
        conn.query('SELECT * FROM datosPersonales', (err, result)=>{
            if(err) throw err;
            res.render('index', {items: result});
        });
    });
});
app.post('/updateDoc', (req, res)=>{
    var items = {
        documento: req.body.ndoc,
        nombre: req.body.nom,
        apellido: req.body.ape,
        edad: req.body.edad,
        direccion: req.body.dir,
        telefono: req.body.tel,
        celular: req.body.cel,
        hobbie: req.body.hob
    };
    var sql = 'UPDATE datosPersonales SET \
        nombre = "' + items.nombre + '",\
        apellido = "' + items.apellido + '",\
        edad = ' + items.edad + ',\
        direccion = "' + items.direccion + '",\
        telefono = ' + items.telefono + ',\
        celular = ' + items.celular + ',\
        hobbie = "' + items.hobbie + '"\
        WHERE documento = ' + items.documento + '';
    conn.query(sql, (err, result)=>{
        if(err) throw err;
        console.log('Datos actualizado');
        conn.query('SELECT * FROM datosPersonales', (err, result)=>{
            if(err) throw err;
            res.render('index', {items: result});
        }); 
    });
});
app.post('/deleteDoc', (req, res)=>{
    var item = {documento: req.body.NDoc};
    conn.query('DELETE FROM datosPersonales WHERE documento = '+ item.documento +'', (err, result)=>{
        if(err) throw err;
        console.log('Datos eliminados');
        conn.query('SELECT * FROM datosPersonales', (err, result)=>{
            if(err) throw err;
            res.render('index', {items: result});
        }); 
    });
});
app.post('/DocToUpd', (req, res)=>{
    var item = {documento: req.body.NDoc};
    conn.query('SELECT * FROM datosPersonales WHERE documento = '+ item.documento +'', (err, result)=>{
        if(err) throw err;
        result = JSON.stringify(result[0]);
        res.send(result);
    });
});
app.post('/DocToDel', (req, res)=>{
    var item = {documento: req.body.NDoc};
    conn.query('SELECT * FROM datosPersonales WHERE documento = '+ item.documento +'', (err, result)=>{
        if(err) throw err;
        result = JSON.stringify(result[0]);
        res.send(result);
    });
});

//CORRER SERVIDOR
app.listen(3000, ()=>{
    console.log('Servidor Web Iniciado en el puerto 3000')
});