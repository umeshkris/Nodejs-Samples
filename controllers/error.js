exports.error404=(req,res,next)=>{

    //res.status(404).send('<h1> page not found !! </h1>');
    //res.sendFile(path.join(__dirname, 'views', 'page-not-found.html'))
    res.render('page-not-found',{ pageTitle:'page not found',path:'404'});

}