import { Contact } from "../Models/contact.js"
//create newcontact

export const newContact = async(req, res)=>{
    const { name, email,phone,type} = req.body

    const session = await mongoose.startSession();
    //const session = await sequelize.transaction()
    session.startTransaction();
    try{
        let saveContact = await Contact.create({
        name,
        email,
        phone,
        type,
        user : req.user
        });
        await session.commitTransaction()

        res.status(201).json({
        message : "Contact Saves Successfully",
        saveContact,
        success: true
        });
    }
    catch(err){
        await session.aborttransaction()
        //await session.rollback()
        res.status(500).json({message:err.message,success:false})
    }

};

// update contact 
export const updateContactById = async(req,res)=>{
    const id = req.params.id
    const {name,email,phone,type} = req.body

    let updatedContact = await Contact.findByIdAndUpdate(id,{
        name,
        email,
        phone,
        type
    },{new:true})

    res.json({
        message : "Contact updated Successfully",
        updatedContact,
        success: true,
    })
}
//Delete contact

export const deleteContactById = async(req,res)=>{
    const id = req.params.id
    

    await Contact.findByIdAndDelete(id)
       

    res.json({
        message : "Contact deleted Successfully",
        success: true,
    })
}

//get all contact 
export const getAllContact = async(req,res)=>
{
    const allContacts = await Contact.find()
    res.json({message: 'All Contact Fetched',allContacts })

}
 
// get all contact by userid
export const getContactByUserId = async(req,res) =>{
    const id = req.params.id
    const userContacts = await Contact.find({user:id})
     res.json({message: 'All Contact Fetched',userContacts })
}


// get specific contact by userid
export const getContactById = async(req,res) =>{
    const id = req.params.id
    

    const contact = await Contact.findById(id)
       

    res.json({
        message : "Contact fetched Successfully",
        contact,
        success: true,
    })
}
