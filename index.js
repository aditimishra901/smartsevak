const express=require('express');
const mongoose=require('mongoose');
const User=require('./models/user')
const url=require('url');
const app=express();
// mongodb://localhost:27017/users

app.use(express.json());
mongoose.connect('mongodb+srv://aditi901:test123@cluster0.oda71gx.mongodb.net/test?retryWrites=true&w=majority',
  {
    useNewUrlParser: true,
    useUnifiedTopology: true
  }
);

const connection = mongoose.connection;

connection.once("open", function() {
  console.log("MongoDB database connection established successfully");
});


app.get('/',(req,res) =>{
  res.send('Hello')
})
app.get('/all',(req,res) =>{
  var mysort={age:1};
   User.find({}).sort(mysort).exec((err, ans,) => {
    if (!err) {
        res.send(ans);
    }
})
})

app.get('/filter',async(req,res)=>{

 try{
    
 
  const min = req.query.minAge;
  const max = req.query.maxAge;
  
 const result=await User.find({age:{$gte:min,$lte:max}});

 res.send(result);
 }
 catch(e)
 {
  res.send(e);
 }

})
app.post('/addCustomers',(req,res)=>{
  var myData = new User(req.body);
  myData.save()
  .then(item => {
  res.send("item saved to database");
  })
  .catch(err => {
  res.status(400).send("Record already present");
  });
 
})

app.patch('/customer/:id',async(req,res)=>{
  try{
        const id =req.params.id;
        const updatedUser=await User.findByIdAndUpdate(id,req.body,
          {
            new:true
          }
          );
          res.send(updatedUser);
  }
  catch(e)
  {
    res.status(400).send(updatedUser);
  }

})






app.listen(8080,()=>{
  console.log('Serving on port');
})