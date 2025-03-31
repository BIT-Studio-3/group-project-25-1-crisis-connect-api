import prisma from "../../prisma/client.js";

const recordDamage = async (req,res) => {
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
            message: "Damage successfully recorded",
            data: newDamage,
          });
        } catch (err) {
          return res.status(500).json({
            message: err.message,
          });
        }
      };

      const getDamages = async (req, res) => {
        try {
          const damage  = await prisma.damage.findMany();
      
          // Check if there are no institutions
          if (!damage) {
            return res.status(404).json({ message: "No damage record found" });
          }
      
          return res.status(200).json({
            data: damage,
          });
        } catch (err) {
          return res.status(500).json({
            message: err.message,
          });
        }
      };

      const getDamage = async (req, res) => {
        try {
          const damage  = await prisma.damage.findUnique({
            where: { id: req.params.id },
          });
      
          // Check if there is no institution
          if (!damage) {
            return res.status(404).json({
              message: `No damage record with the id: ${req.params.id} found`,
            });
          }
      
          return res.status(200).json({
            data: damage,
          });
        } catch (err) {
          return res.status(500).json({
            message: err.message,
          });
        }
      };

      