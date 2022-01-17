const indexCtrl = {};



indexCtrl.renderIndex = (req, res) => {
    var logueado = Boolean(req.session.email)
    
    res.render('index' , {
        isIndex : true,
        footer: true,
        logueado : logueado,
        email: req.session.email
    });
    console.log(logueado)

};

indexCtrl.renderContacto = (req,res) => {
    var logueado = Boolean(req.session.email)
    res.render('contactos', {
        isContactos : true,
        footer: true,
        logueado : logueado,
        email: req.session.email
    });
}

indexCtrl.renderNosotros = (req,res) => {
    var logueado = Boolean(req.session.email)
    res.render('nosotros', {
        isNosotros : true,
        footer: true,
        logueado : logueado,
        email: req.session.email
    });
}

indexCtrl.renderServicios = (req,res) => {
    var logueado = Boolean(req.session.email)
    res.render('servicios', {
        isServicios : true,
        footer: true,
        logueado : logueado,
        email: req.session.email
    });
}


module.exports = indexCtrl;