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
        });

        // Get all damage from the damage table 
        const newDamage = await prisma.hazard.findMany();

        //send JSON response

        return res.status(201).json({
            message: "Institution successfully created",
            data: newInstitutions,
          });
        } catch (err) {
          return res.status(500).json({
            message: err.message,
          });
        }
      };