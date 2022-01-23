const indexCtrl = {};

indexCtrl.renderIndex = (req, res) => {    
    res.render('index' , {
        isIndex : true,
        footer: true,
    });
};

indexCtrl.renderContacto = (req,res) => {
    res.render('contactos', {
        isContactos : true,
        footer: true,
    });
}

indexCtrl.renderNosotros = (req,res) => {
    res.render('nosotros2', {
        isNosotros : true,
        footer: true,
    });
}

indexCtrl.renderServicios = (req,res) => {
    res.render('servicios', {
        isServicios : true,
        footer: true,
    });
}


module.exports = indexCtrl;