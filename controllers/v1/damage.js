import prisma from "../../prisma/client.js";

const createDamage = async (req,res) => {
    try{
        await prisma.damage.create({
            data: {
                streetNumber:req.body.streetNumber, 
                streetName:req.body.streetName,   
                City : req.body.City,           
                Region  : req.body.Region,       
                type  : req.body.type,       
                description : req.body.description,      
                     
            } 
        })
    }
}