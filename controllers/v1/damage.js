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

const updateDamage = async (req, res) => {
    try {
      // Find the institution by id
      let damage= await prisma.damage.findUnique({
        where: { id: req.params.id },
      });
  
      // Check if there is no institution
      if (!damage) {
        return res.status(404).json({
          message: `No institution with the id: ${req.params.id} found`,
        });
      }
  
      // Update the institution
      damage = await prisma.damage.update({
        where: { id: req.params.id },
        data: {
          // Data to be updated     
                type  : req.body.type,       
                description : req.body.description, 
        },
      });
  
      return res.status(200).json({
        message: `Damage record with the id: ${req.params.id} successfully updated`,
        data: institution,
      });
    } catch (err) {
      return res.status(500).json({
        message: err.message,
      });
    }
  };

  const deleteDamage = async (req, res) => {
    try {
      const damage = await prisma.damage.findUnique({
        where: { id: req.params.id },
      });
  
      if (!damage) {
        return res.status(404).json({
          message: `No damage with the id: ${req.params.id} found`,
        });
      }
  
      await prisma.damage.delete({
        where: { id: req.params.id },
      });
  
      return res.json({
        message: `Damage record with the id: ${req.params.id} successfully deleted`,
      });
    } catch (err) {
      return res.status(500).json({
        message: err.message,
      });
    }
  };

  export {
    createInstitution,
    getInstitutions,
    getInstitution,
    updateInstitution,
    deleteInstitution,
  };
  